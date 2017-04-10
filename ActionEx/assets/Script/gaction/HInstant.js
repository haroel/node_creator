/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/30.
 */
let mod = {};
let Instant = require("HActionInstant");

mod.show = function (vars) {
    let m = new Instant();
    vars.onComplete = function ( action )
    {
        action.getNode()._sgNode.setVisible(true);
    };
    m.init(vars);
    return m;
};

mod.hide = function (vars) {
    let m = new Instant();
    vars.onComplete = function ( action )
    {
        action.getNode()._sgNode.setVisible(false);
    };
    m.init(vars);
    return m;
};



module.exports = mod;