/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/22.
 *
 * 同步执行
 */
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

    update:function (rate)
    {
        this._super(rate);
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
            if (!act.getNode())
            {
                let _i = i;
                act.startWithTarget(this._actionComponent);
                act.$setFinishCallback( function ( action,nextAction)
                    {
                        if (nextAction)
                        {
                            that._actions[_i] = nextAction;
                        }else
                        {
                            that._actions.splice(_i,1);
                        }
                        action.destroy();
                    });
            }
            act["_$update"](dt);
        }
    },
    cloneSelf:function ()
    {
        let spawn = new HActionSpawn();
        spawn.init(this.getVars());
        let list = [];
        let len = this._actions.length;
        for (let i= 0;i<len;i++) {
            let act = this._actions[i];
            list.push( act.clone() );
        }
        spawn.pushAction(list,false);
        return spawn;
    },
    destroy:function () {
        for (let i=0;i<this._actions.length;i++)
        {
            utils.destroyAction(this._actions[i]);
        }
        this._actions = null;
        this._super();
    }
});

HActionSpawn.create = function ( actions ) {
    let act = new HActionSpawn();
    act.pushAction( actions );
    return act;
};
module.exports = HActionSpawn;