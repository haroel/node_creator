/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/23.
 */

let hh = hh || {};
if (!window.hh)
{
    window.hh = hh;
}
let Tween = require("HActionTween");
let Spawn = require("HActionSpawn");
let Instant= require("HActionInstant");
let Interval = require("HActionInterval");

hh.calllFunc = function (func,vars/* null */)
{
    vars["onComplete"] = func;
    return Instant.create(vars);
};

hh.delay = function (duration,vars/* null */)
{
    return Interval.create(duration,vars);
};

hh.sequence = function (action)
{
    for (let i= 1;i < arguments.length;i++)
    {
        action.setNextAction(arguments[i]);
    }
    return action;
};

hh.spawn = function () {
    return Spawn.create( arguments );
};

hh.show = function () {
    return Instant.show();
};

hh.hide = function () {
    return Instant.hide();
};

hh.moveTo = function ( duration, pos, vars/* null */  )
{
    
};

hh.moveBy = function ( duration, pos, vars/* null */  )
{

};
hh.scaleTo = function ( duration, pos, vars/* null */  )
{

};

hh.scaleBy = function ( duration, pos, vars/* null */  )
{

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