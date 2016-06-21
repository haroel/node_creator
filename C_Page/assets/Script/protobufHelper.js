let protoString = `
package UserProto;

message UserModel
{
    optional string uuid = 1;
    optional bool showVote = 2;
}

message UserInfo
{
    optional string coco_id=1;
    optional string ip = 2;
    optional uint32 time=3;
    optional string uuid=4;
}

message UserInfoList
{
    repeated UserInfo list=1;
    optional string clientChoose=2;
}
// 协议返回数据
message UserResponse
{
    optional UserModel userModel = 1;
    optional UserInfoList userList = 2;
}
`;


var ProtoBuf = require("protobufjs");
var builder = ProtoBuf.loadProto( protoString );

var exports = {};
exports.builder =builder;
exports.UserProto = builder.build("UserProto");

// 转成protobuf的二进制数据
exports.encodeBuffer = function (msgName, object ) {
   try 
   {
        let pbObj = new exports.UserProto[msgName](object);
        let buffer = pbObj.encode().toBuffer();
        return buffer;
    
    } catch (error) {
        console.log("encodeBuffer error",error);
    }
    return new ArrayBuffer();
};

// 反转成js对象
exports.decodeBuffer = function (msgName, buffer ) {

   try 
   {
        let message = exports.UserProto[msgName].decode(buffer);
        return message;
    } catch (error) {
        console.log("encodeBuffer error",error);
    }
    return {};
};
module.exports = exports;