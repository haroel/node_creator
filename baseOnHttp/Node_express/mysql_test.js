var mysql = require('mysql')

var dbHost = 'localhost';
var dbPort = "8889";

var dbUser = 'haroel';
var dbPassword = '123123';
  
var DATABASE_NAME = 'cc';  
var DATABASE_TABLE = 'coco_tab';  

var trace = console.log;
  
//创建连接  
// var connection = mysql.createConnection({  
//   host:dbHost,
//   port:dbPort,
  
//   user: dbUser,  
//   password: dbPassword,  
  
//   database:DATABASE_NAME
// }); 
// connection.connect();
// 执行sql语句
// connection.query('SELECT * from ' + DATABASE_TABLE , 
// function(err, rows, fields) 
// {
//     if (err) 
//     {
//         console.log(err);
//         return;
//     }
//     // console.log(rows);
    
//     for (var info of rows)
//     {
//         trace(info.coco);
//     }
    
//     // console.log(fields)
// });
// connection.end();


var http = require('http');

http.createServer(function (request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  
  var connection = mysql.createConnection({  
    host:dbHost,
    port:dbPort,
    
    user: dbUser,  
    password: dbPassword,  
    
    database:DATABASE_NAME
    }); 
    connection.connect();

  connection.query('SELECT * from ' + DATABASE_TABLE + ' WHERE ip = ?' ,['192.168.1.11'],
    function(err, rows, fields) 
    {
        if (err) 
        {
            console.log(err);
            response.end( 'sql error \n');
            return;
        }
        // console.log(rows);
        var result = "";

        for (var info of rows)
        {
            // trace(info.coco);
            result += info.coco + "\n";
        }
        var res = response;
        res.writeHead(200, {'Content-Type': 'text/html'});  
        res.write('<head><meta charset="utf-8"/></head>');  
        res.write('<h1>Node.js</h1>');  
        res.write('<b>亲爱的，你慢慢飞，小心前面带刺的玫瑰...</b>');
        res.end(result + '\n');
        console.log(result)
    });
    connection.end();
  
}).listen(8080, "127.0.0.1");

 