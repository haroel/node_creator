/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/21.
 *
 * hActionComponent是管理父Node节点的组件。
 * 不允许外部对其直接访问和修改!
 */
let utils = require("HUtil");
module.exports = cc.Class({
    extends: cc.Component,
    properties: {

    },
    getTargetNode:function () {
        return this._targetNode;
    },

    __$init:function ( targetNode )
    {
        this._targetNode = targetNode;
        this.__hActions = [];
    },

    // use this for initialization
    onLoad: function ()
    {
        this._targetNode = this.node;
    },
    addActionToTickQueue:function ( hAction )
    {
        if (!utils.isHAction(hAction))
        {
            // 必须是HAction的类或子类才可进一步操作
            throw new Error("Error, action 必须是HAction类或其子类");
        }
        this.__hActions.push( hAction );
        hAction.startWithTarget( this );
    },
    removeAction:function (action)
    {
        if (!utils.isHAction(action))
        {
            throw new Error("Error, action 必须是HAction类或其子类");
        }
        let uuid = action["$uuid"];
        let len = this.__hActions.length;
        for (let i= 0;i < len;i++)
        {
            let _action = this.__hActions[i];
            if (_action["$uuid"] === uuid)
            {
                utils.destroyAction(_action);
                this.__hActions.splice(i,1);
                return true;
            }else
            {
                let preAction = _action;
                let nextAction = _action.getNextAction();
                while(nextAction)
                {
                    if (nextAction["$uuid"] === uuid )
                    {
                        preAction.removeNextAction();
                        return true;
                    }
                    preAction = nextAction;
                    nextAction = nextAction.getNextAction();
                }
            }
        }
        return false;
    },

    linkAction:function ( target, nextAction )
    {
        if (!utils.isHAction(nextAction))
        {
            throw new Error("Error, action 必须是HAction类或其子类");
        }
        target.setNextAction(nextAction);
    },

    parallelAction:function (target , actions)
    {
        let Spawn = require("HActionSpawn");
        let act = Spawn.create( actions );
        this.linkAction( target , act);
        return act;
    },

    /*翻转*/
    reverseActionFromTarget:function ( target  )
    {
        if (!utils.isHAction(target))
        {
            // 必须是HAction的类或子类才可进一步操作
            throw new Error("Error, action 必须是HAction类或其子类");
        }
        let arr = [];
        arr.push( target.clone() );
        let nextAct = target.getNextAction();
        while(nextAct)
        {
            arr.push(nextAct.clone());
            nextAct = nextAct.getNextAction();
        }
        let _target = arr.pop();
        while(arr.length > 0)
        {
            _target.setNextAction(arr.pop());
        }
        return _target;
    },

    playComplete:function ( hAction )
    {
        let len = this.__hActions.length;
        for (let i= 0;i < len;i++)
        {
            if (this.__hActions[i]["$uuid"] === hAction["$uuid"])
            {
                let nexthAction = hAction.getNextAction();
                if (nexthAction)
                {
                    // 启动单链表下个节点的Action
                    nexthAction.startWithTarget( this );
                    this.__hActions[i] = nexthAction;
                }else
                {
                    this.__hActions.splice(i,1);
                }
                hAction.destroy();
                break;
            }
        }
    },

    // called every frame
    update: function (dt)
    {
        let len = this.__hActions.length;
        for (let i= 0;i < len;i++)
        {
            this.__hActions[i]["_$update"](dt);
        }
    },

    onDestroy:function ()
    {
        // 销毁所有的action节点
        let len = this.__hActions.length;
        for (let i= 0;i < len;i++)
        {
            utils.destroyAction( this.__hActions[i] );
        }
        this._targetNode = null;
        this.__hActions = null;
    }
});
