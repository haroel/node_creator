
var config = require('./config.js');

var db = require('./dbhelp.js');

var DATABASE_NAME = 'cc';
var DATABASE_TABLE = 'vote_tab';

function getAllList( res )
{
    db.query( 'SELECT * from ' + DATABASE_TABLE , function(err, rows, fields)
    {
        var result = {};
        result.length = rows.length;
        result.datas = [];
        for (var info of rows) {
            result.datas.push(info);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify(result));
    });
}

module.exports = function (app)
{
    app.get('/', function (req, res)
    {
        var __uuid = req.query["uuid"];
        var ip = req.ip;
        var uuid = ip + "-" + __uuid;
        console.log("收到get请求",uuid);

        var sqlString = " SELECT * from `"+ DATABASE_TABLE +"`  WHERE `uuid` = ? ";

        db.query(sqlString, [uuid], function(err, rows, fields)
        {
            if (err)
            {
                console.log(err);
                res.end( 'sql error \n');
                return;
            }
            //console.log("rows",rows);

            if (rows.length < 1)
            {
                // 可以选票
                var obj = {
                    showVote:true
                };
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(JSON.stringify(obj));
                return;
            }
            db.query( 'SELECT * FROM `'+ DATABASE_TABLE +'`', function(err, _rows, fields)
            {
                if (err)
                {
                    console.log(err);
                }
                console.log("get all list",_rows.length);
                var result = {};
                result.length = _rows.length;
                result.datas = [];
                for (var info of _rows) {
                    result.datas.push(info);
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(JSON.stringify(result));
            });
        } );

    });

    app.post('/vote', function (req, res)
    {
        // client发送了选票
        var __uuid = req.query["uuid"];
        var ip = req.ip;
        var uuid = ip + "-" + __uuid;

        var selectedTag = req.query["item"];
        console.log("收到post请求",uuid,selectedTag);

        var sqlString = 'SELECT * from ' + DATABASE_TABLE + " WHERE uuid = ?";

        db.query(sqlString,[uuid], function(err, rows, fields)
        {
            if (err)
            {
                console.log(err);
                res.end( 'sql error \n');
                return;
            }
            console.log("sql查询结果",rows);
            if (rows.length < 1)
            {
                // 没有则插入数据
                var _date = new Date();

                var values = [uuid, selectedTag,ip,  _date.getTime()/1000 ];

                var inertString = 'INSERT INTO '+ DATABASE_TABLE +' SET uuid = ?, coco_id = ? , ip = ? , time = ? ';
                db.query(inertString,values, function(err, rows, fields)
                {
                    getAllList(res);
                });

            }else
            {
                getAllList(res);
            }
        } );
    });

};