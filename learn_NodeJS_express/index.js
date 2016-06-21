
var server = require("./server.js");
var routes = require("./routes.js");

server.start(routes);

console.log("index 初始化");
// 测试protobuf
//var protoBufHelper = require("./protobufHelper.js");
//let userModel = new protoBufHelper.UserProto["UserModel"]();
//userModel.uuid = "1eadasd";
//
//let buffer = userModel.encode().toBuffer();
//console.log( buffer );
//let message = protoBufHelper.UserProto["UserModel"].decode(buffer);
//console.log( message );

