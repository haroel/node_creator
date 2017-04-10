/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/17.
 * HAction核心基类,请不要直接实例化使用
 */
require("HNodeEx");
let utils = require("HUtil");
let HVars = require("HVars");

// 生成唯一ID
let UUID_GENERATOR = (function ()
{
    var i = 0;
    return function ()
    {
        return "__HAction_uuid_" + i++;
    }
})();

let HAction = cc.Class({
    ctor:function () {
        this.$uuid = UUID_GENERATOR();
        this._delay = 0;

        this._finishCallback = null;
        this._actionComponent = null;

        this._vars = new HVars();
    },

    getVars:function ()
    {
        return this._vars;
    },
    getNextAction :function () {
        return this["__nextAction"];
    },
    setNextAction:function (action, index /* null**/)
    {
        let _i = 9999999;
        if ( typeof index === "number" && index > -1 )
        {
            _i = index;
        }
        let i = 0;
        let preAction = this;
        let nextAct = this["__nextAction"];
        while(nextAct)
        {
            if (i === _i)
            {break;}
            preAction = nextAct;
            nextAct = nextAct["__nextAction"];
            if (!nextAct)
            {
                break;
            }
            ++i;
        }
        utils.destroyAction(nextAct);
        preAction["__nextAction"] = action;
        return action;
    },
    removeNextAction:function () {
        utils.destroyAction( this["__nextAction"] );
        this["__nextAction"] = null;
    },
    /*
     *  获取HAction作用的cc.Node对象
     * */
    getNode:function ()
    {
        if (this._actionComponent)
        {
            return this._actionComponent.getTargetNode();
        }
        return null;
    },
    /*
     * 初始化 (可重写改方法)
     * */
    init:function( vars )
    {
        this._vars.patchParams(vars);
    },
    /*
     * 开始绑定动作 (请继承以实现更多方法)
     * @ component: HAactionComponent组件
     * @ vars 额外参数 (克隆出需要保留的参数) :
     * 系统支持:delay,onUpdate,onComplete,repeat,actionComponent
     * */
    startWithTarget:function ( component  )
    {
        if (this._actionComponent)
        {
            throw new Error("Error, HAction Had been setted! ");
        }
        this._actionComponent = component;
        this.playAction();
    },

    /* 具体实现请继承 */
    playAction:function ()
    {
        this._delay = this._vars["delay"];
    },
    /*
     * 执行调度函数,由actionComponent来执行,
     * 此处需要区分三种update调用
     * _$update:由actionComponent来执行
     *  $update:二级调度方法, ActionInterval来继承调用
     *  update: 外部可继承的update方法
     * */
    _$update:function (dt)
    {
        // 处理延时调用
        if (this._delay > 0)
        {
            this._delay -= dt;
            return;
        }
        this.$update(dt);
    },
    $update:function(dt)
    {
        this.update(0);
    },
    /*
     * 请重写改方法以实现更多行为
     * update Action状态
     * @ rate : action进度值 0~1
     * */
    update:function (rate)
    {
        //TODO What you want to do;
    },
    /*
    * 子类动作结束时请调用该方法
    * */
    $actionComplete:function ()
    {
        let vars = this._vars;
        if ( vars["onComplete"] )
        {
            vars["onComplete"](this);
        }
        let count = vars["repeat"];
        if ( count > 0 )
        {
            this.playAction();  // 重置状态
            this.repeat( count - 1 );
            return;
        }else {

            if ( vars["onStoped"] )
            {
                vars["onStoped"](this);
            }
        }
        if (this._finishCallback)
        {
            this._finishCallback(this,this.getNextAction());
        }
        // 注意:playComplete不一定会调用成功,因为某些action是由spawn来维护
        this._actionComponent.playComplete(this);
    },
    /*
    * then式调用链,可以用链式方法来处理,
    * 建议用then方式来取代Sequence
    * */
    then:function ()
    {
        if (arguments.length === 1)
        {
            return this.setNextAction( arguments[0]);
        }else if (arguments.length > 1)
        {
            return this._actionComponent.parallelAction(this,arguments);
        }
        return null;
    },
    /*
     * 完备克隆action
     * 如果有鏈式结构,会一并克隆下去
     * */
    clone :function ()
    {
        let target = this.cloneSelf();
        let nextAct = this.getNextAction();
        while(nextAct)
        {
            target.setNextAction( nextAct.cloneSelf() );
            nextAct = nextAct.getNextAction();
        }
        return target;
    },
    /**
     * 克隆自身
     * 每个子类独立去实现克隆方法
     */
    cloneSelf:function ()
    {
        return null;
    },

    getSpeed:function () {
        return this._vars["speed"];
    },
    /* 是否把加速出啊满地给next */
    setSpeed:function ( speedValue )
    {
        this._vars["speed"] = speedValue;
        return this;
    },
    repeatForever:function ()
    {
        this._vars["repeat"] = Number.MAX_VALUE;
        return this;
    },
    /*
     * 重新repeat播放 value 重复次数
     * */
    repeat:function ( value )
    {
        this._vars["repeat"] = value;
        return this;
    },
    onUpdate:function (func) {
        this._vars["onUpdate"] = func;
        return this;
    },
    onComplete:function ( func ) {
        this._vars["onComplete"] = func;
        return this;
    },
    onStoped:function (func)
    {
        this._vars["onStoped"] = func;
        return this;
    },
    $setFinishCallback:function (callback) {
        this._finishCallback = callback;
        return this;
    },
    /*
     * 仅继承重写,不可外部调用!!!!!
     * */
    destroy:function ()
    {
        this._vars = null;
        this["__nextAction"] = null;
        this._finishCallback = null;
        this._actionComponent = null;
    }
});
module.exports = HAction;