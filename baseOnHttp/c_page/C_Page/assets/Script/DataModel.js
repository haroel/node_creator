// 数据

var Menus = {};
Menus["1001"] = {
        label:"橙汁",
        price : 15
    };
Menus["1002"] = {
        label:"红豆奶茶",
        price : 15
    };
Menus["1003"] = {
        label:"绿茶",
        price : 15
    };
    
Menus["1004"] = {
        label:"咖啡",
        price : 15
    };
    
Menus["1005"] = {
        label:"可乐",
        price : 15
    };   

module.exports.ServerURL = "http://127.0.0.1:3000";
module.exports.Menus = Menus;

module.exports.getUUID = function () {
        var uuid = cc.sys.localStorage.getItem("uuid");
        console.log("localStorage ",uuid);
        if (uuid == null)
        {
            uuid = "no._" + Math.random();
            cc.sys.localStorage.setItem("uuid",uuid);
        }
        return uuid;
};
