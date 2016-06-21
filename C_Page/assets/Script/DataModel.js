// 数据

module.exports.ServerURL = "http://192.168.2.3:3000";

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

module.exports.Menus = Menus;


function generateUUID()
 {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

module.exports.getUUID = function () {
        var uuid = cc.sys.localStorage.getItem("uuid");
        console.log("localStorage ",uuid);
        if (uuid == null)
        {
            uuid = generateUUID();
            console.log("生成UUID",uuid);
            cc.sys.localStorage.setItem("uuid",uuid);
        }
        return uuid;
};
