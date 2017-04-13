/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/22.
 *
 * 同步执行
 */
let utils = require("HUtil");
let HActionSpawn =  cc.Class({
    extends : require("HAction"),
    ctor:function ()
    {
        this._actions = [];
    },
    setSpeed:function (value)
    {
        value = Math.abs(value);
        for (let i= 0;i<this._actions.length;i++)
        {
            this._actions[i].setSpeed(value);
        }
        return this._super(value);
    },
    pushAction:function ( actions ,isInhertSpeed )
    {
        for(let i=0;i< actions.length;i++)
        {
            let act = actions[i];
            if (isInhertSpeed)
            {
                act.setSpeed( this.getSpeed() );
            }
            this._actions.push( act );
        }
    },
    $update:function (dt)
    {
        this._super(dt);
        let len = this._actions.length;
        if (len < 1)
        {
            this.$actionComplete();
            return;
        }
        let that = this;
        for (let i= 0;i<len;i++)
        {
            let act = this._actions[i];
            if (act)
            {
                if (!act.getNode())
                {
                    act.startWithTarget(this._actionComponent);
                    act.$setFinishCallback( function ( action,nextAction)
                    {
                        for (let j=0;j< that._actions.length;j++)
                        {
                            let _action_ = that._actions[j];
                            if (_action_["$uuid"] === action["$uuid"])
                            {
                                if (nextAction)
                                {
                                    that._actions[j] = nextAction;
                                }else
                                {
                                    that._actions.splice(j,1);
                                }
                                break;
                            }
                        }
                        action.$invalid();
                    });
                }
                act["_$update"](dt);
            }
        }
    },
    cloneSelf:function ()
    {
        let spawn = new HActionSpawn();
        spawn.init(this.getVars());
        let list = [];
        this._actions.forEach(function (action)
        {
            list.push(action);
        });
        spawn.pushAction(list,false);
        list = null;
        return spawn;
    },
    $invalid:function()
    {
        this._actions.forEach(function (action)
        {
            utils.invalidActionAndNext(action);
        });
        this._actions = null;
        this._super();
    },
    $destroy:function () {
        this._actions = null;
        this._super();
    }
});

HActionSpawn.create = function ( actions ,vars /* null */) {
    let act = new HActionSpawn();
    act.init(vars);
    act.pushAction( actions );
    return act;
};
module.exports = HActionSpawn;