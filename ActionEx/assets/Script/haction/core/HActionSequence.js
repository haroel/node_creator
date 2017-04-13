/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/22.
 *
 * 顺序执行
 */
let utils = require("HUtil");
let HActionSequence =  cc.Class({
    extends : require("HAction"),
    ctor:function ()
    {
        this._actions = [];
    },
    setSpeed:function (value)
    {
        value = Math.abs(value);
        this._actions.forEach(function (action) {
            action.setSpeed(value);
        });
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
        if (!this._actions)
        {
            return;
        }
        let len = this._actions.length;
        if (len < 1)
        {
            this.$actionComplete();
            return;
        }
        let that = this;
        let act = this._actions[0];
        if (act)
        {
            if (!act.getNode())
            {
                act.startWithTarget(this._actionComponent);
                act.$setFinishCallback( function ( action,nextAction)
                {
                    if (nextAction)
                    {
                        that._actions[0] = nextAction;
                    }else
                    {
                        that._actions.shift();
                    }
                    action.$invalid();
                });
            }
            act["_$update"](dt);
        }
    },
    cloneSelf:function ()
    {
        let sequence = new HActionSequence();
        sequence.init(this.getVars());
        let list = [];
        this._actions.forEach(function (action)
        {
            list.push( action.clone() );
        });
        sequence.pushAction(list,false);
        list = null;
        return sequence;
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

HActionSequence.create = function ( actions ,vars ) {
    let act = new HActionSequence();
    act.init(vars);
    act.pushAction( actions );
    return act;
};
module.exports = HActionSequence;