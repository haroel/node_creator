var mysql = require('mysql');

var config = require('./config.js');

var DATABASE_TABLE = config.dbTable;

var DATABASE_NAME = config.dbName;

var component = {};
//方式1： 查询语句
component.query = function (sqlstring, values,callback)
{
    var connection = mysql.createConnection({
        host:config.dbHost,
        port:config.dbPort,

        user: config.dbUser,
        password: config.dbPassword,

        database:DATABASE_NAME
    });
    connection.connect();
    connection.query(sqlstring,values,
                    function(err, rows, fields)
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                        callback(err,rows,fields);
                    });
    connection.end();

};

// 方式2，采用es6的promise写法
// 执行sql查询，params是sql参数，
// 返回一个promise对象
component.executeSQL = function (sqlstring,params)
{
    //console.log(sqlstring,params);
    var promise = new Promise(function (resolve, reject) {

            var connection = mysql.createConnection({
                host:config.dbHost,
                port:config.dbPort,

                user: config.dbUser,
                password: config.dbPassword,

                database:DATABASE_NAME
            });
            connection.connect();
            connection.query(sqlstring,params,
                function(err, rows, fields)
                {
                    //console.log("查询结果",rows);
                    if (err)
                    {
                        reject(err);
                    }else
                    {
                        resolve(rows,fields);
                    }
                });
            connection.end();
        }
    );
    return promise;
};


module.exports = component;
