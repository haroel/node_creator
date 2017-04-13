/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/23.
 */

let hh = hh || {};
module.exports = hh;

let HActionInstant= require("HActionInstant");
let HActionInterval = require("HActionInterval");
let HActionTween = require("HActionTween");
let HActionTweenBy = require("HActionTweenBy");
let HActionSpawn = require("HActionSpawn");
let HActionSequence = require("HActionSequence");

hh.calllFunc = function (func , params/* null */, vars/* null */)
{
    vars = vars || {};
    vars["onComplete"] = function()
    {
        func(params);
    };
    return HActionInstant.create(vars);
};

hh.delay = function (duration,vars/* null */)
{
    return HActionInterval.create(duration,vars);
};

hh.sequence = function ( actions, vars/* null */)
{
    let action = HActionSequence.create(actions,vars);
    return action;
};

hh.spawn = function (actions, vars/* null */) {
    return HActionSpawn.create( actions );
};

hh.show = function ( vars/* null */ ) {
    vars = vars || {};
    let m = new HActionInstant();
    vars.onComplete = function ( action )
    {
        action.getNode()._sgNode.setVisible(true);
    };
    m.init(vars);
    return m;
};

hh.hide = function ( vars/* null */ ) {
    vars = vars || {};
    let m = new HActionInstant();
    vars.onComplete = function ( action )
    {
        action.getNode()._sgNode.setVisible(false);
    };
    m.init(vars);
    return m;
};

hh.moveTo = function ( duration, pos, vars/* null */  )
{
    vars = vars || {};
    vars.x = pos.x;
    vars.y = pos.y;
    let tween = HActionTween.create(duration,vars);
    return tween;
};

hh.moveBy = function ( duration, pos, vars/* null */  )
{
    vars = vars || {};
    vars.x = pos.x;
    vars.y = pos.y;
    let tween = HActionTweenBy.create(duration,vars);
    return tween;
};
hh.scaleTo = function ( duration, pos, vars/* null */  )
{
    vars = vars || {};
    vars.scaleX = pos.scaleX;
    vars.scaleY = pos.scaleY;
    let tween = HActionTween.create(duration,vars);
    return tween;
};

hh.scaleBy = function ( duration, pos, vars/* null */  )
{
    vars = vars || {};
    vars.scaleX = pos.scaleX;
    vars.scaleY = pos.scaleY;
    let tween = HActionTweenBy.create(duration,vars);
    return tween;
};

hh.skewTo = function ( duration, pos, vars/* null */  )
{

};

hh.skewBy = function ( duration, pos, vars/* null */  )
{

};

hh.rotateTo = function ( duration, pos, vars/* null */  )
{

};

hh.rotateBy = function ( duration, pos, vars/* null */  )
{

};

hh.fadeIn = function ( duration, vars/* null */  )
{

};

hh.fadeOut = function ( duration, vars/* null */  )
{

};
hh.fadeTo = function ( duration, opacity, vars/* null */  )
{

};