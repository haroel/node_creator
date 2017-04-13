/**
 *
 * Tell me what the fuck do!
 *
 * Author      : hhe
 * Create Time :2017/4/11
 */
let HActionTweenBy = cc.Class({
    extends : require("HActionInterval"),
    ctor:function () {
        this._intialAttrList = null;
    },
    startWithTarget:function ( component  )
    {
        this._super(component);
        this._intialAttrList = {};
        let _node = this.getNode();
        for (var key in this._vars)
        {
            if ( _node[key] )
            {
                let _o = typeof _node[key];
                if ( _o === 'number')
                {
                    this._intialAttrList[key] = _node[key];
                }
            }
        }
    },
    update:function (rate)
    {
        this._super(rate);
        let vars = this._vars;
        let node = this.getNode();
        let progress = this.getProgress();
        let pList = this._intialAttrList;
        for (let key in pList)
        {
            let _o = pList[key];
            node[key] = _o + vars[key] * progress;
        }
    },
    /* cloneSelf 不复制方法 */
    cloneSelf:function ()
    {
        let act = new HActionTweenBy();
        act.init( this.getDuration(), this.getVars() );
        act.easing(this.easingFunc);
        return act;
    },
    $destroy:function ()
    {
        this._intialAttrList = null;
        this._super();
    }
});

HActionTweenBy.create = function ( duration,vars)
{
    let tween = new HActionTweenBy();
    tween.init(duration,vars);
    return tween;
};

module.exports = HActionTweenBy;