var ProtoBuf = require("protobufjs");
var path = require("path");

var builder = ProtoBuf.loadProtoFile(path.join(__dirname,"__.proto"));

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