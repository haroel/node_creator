var config = require('./config.js');
var mysql = require('mysql');


var DATABASE_NAME = 'cc';
var DATABASE_TABLE = 'vote_tab';

var component = {};
// 查询语句
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

component.connectSql = function ()
{
    var connection = mysql.createConnection({
        host:config.dbHost,
        port:config.dbPort,

        user: config.dbUser,
        password: config.dbPassword,

        database:DATABASE_NAME
    });
    connection.connect();
    return connection;
};

module.exports = component;
