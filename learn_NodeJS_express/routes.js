
var config = require('./config.js');

var db = require('./dbhelp.js');
var protobufHelper = require("./protobufHelper.js");

var DATABASE_TABLE = config.dbTable;

// 执行sql查询，params是sql参数，
// 返回一个promise对象
var executeSQL = db.executeSQL;

function sendAllListToClient(response,rows,fields,ip,uuid)
{
    let result = {};
    result.list = [];
    for (let info of rows) {

        let data = {};
        data.coco_id = info.coco_id;
        data.ip = info.ip;
        data.time = info.time;
        data.uuid = info.uuid;

        result.list.push(data);
        if (info.ip === ip || info.uuid === uuid )
        {
            result.clientChoose = info.coco_id;
        }
    }
    let buffer = protobufHelper.encodeBuffer("UserResponse",{ userList:result });
    response.write(buffer);
    response.end();
}

module.exports = function (app)
{
    app.post('/', function (req, res)
    {
        console.log("http post client ip",req.ip);
        let body = [];
        req.on('data',  (chunk) =>
        {
            body.push(chunk);
        });
        req.on('error', (err) =>{
            console.error(err.stack);
        });
        req.on('end',  () => {
            body = Buffer.concat(body);

            let message = protobufHelper.decodeBuffer( "UserModel", new Buffer(body) );
            //console.log("server获取到的数据解码得到：",message);

            let uuid = message.uuid;
            let ip = req.ip;
            let sqlString = " SELECT * from "+ DATABASE_TABLE +" WHERE uuid = ? OR ip = ? ";
            executeSQL(sqlString,[uuid,ip]).then(function(rows,fields)
            {
                //console.log("rows",rows.length);
                if (rows.length < 1)
                {
                    let buffer = protobufHelper.encodeBuffer("UserResponse",{ userModel:{showVote:true} });
                    res.write(buffer);
                    //res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end();
                }
                else
                {
                    return executeSQL('SELECT * from ' + DATABASE_TABLE,null);
                }
            }).then( ( rows, fields)=>
            {
                if (!rows)
                {
                    return;
                }
                sendAllListToClient(res,rows,fields,ip,uuid);

            }).catch(function (error)
            {
                console.log(error);
                res.end( 'sql error \n');
            });


        });
    });

    app.post('/vote', function (req, res)
    {

        console.log("http post vote client ip",req.ip);
        let body = [];
        req.on('data',  (chunk) =>
        {
            body.push(chunk);
        });
        req.on('error', (err) =>{
            console.error(err.stack);
        });
        req.on('end',  () => {

            body = Buffer.concat(body);

            let message = protobufHelper.decodeBuffer( "UserInfo", new Buffer(body) );
            //console.log("server获取到的数据解码得到：",message);
            // client发送了选票
            let uuid = message.uuid;
            let coco_id = message.coco_id;
            let ip = req.ip;

            //console.log("clientIP",ip);

            let sqlString = " SELECT * from "+ DATABASE_TABLE +" WHERE uuid = ? OR ip = ? ";
            executeSQL(sqlString,[uuid,ip]).then( function(rows,fields)
            {
                if (rows.length < 1)
                {
                    // mysql插入数据
                    let values = [uuid, coco_id,ip,  Date.now()];
                    let inertString = 'INSERT INTO '+ DATABASE_TABLE +' SET uuid = ?, coco_id = ? , ip = ? , time = ? ';
                    return executeSQL(inertString,values);
                }else
                {
                    return executeSQL('SELECT * from ' + DATABASE_TABLE,null);
                }
            })
            .then( ( rows, fields)=>
            {
                if (rows["length"])
                {
                    sendAllListToClient(res,rows,fields,ip,uuid);
                }else
                {
                    return executeSQL('SELECT * from ' + DATABASE_TABLE,null);
                }
            })
            .then( ( rows, fields) =>
            {
                sendAllListToClient(res,rows,fields,ip,uuid);
            })
            .catch(function (error)
            {
                console.log(error);
                res.end( 'sql error \n');
            });
        });
    });

};