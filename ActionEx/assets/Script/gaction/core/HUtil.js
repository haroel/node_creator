/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/26.
 */

let moduleObj = {};

moduleObj.destroyAction = function (action)
{
    if (!action)
    {return;}
    let nextAct = action.getNextAction();
    while(nextAct)
    {
        let act = nextAct;
        nextAct = act.getNextAction();
        act.destroy();
    }
    action.destroy();
};

moduleObj.isHAction = function ( action )
{
    if(!action)
    {
        return false;
    }
    return action instanceof require("HAction");
};


module.exports = moduleObj;
