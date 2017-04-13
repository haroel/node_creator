/**
 * ihowe@outlook.com
 * author by haroel
 * Created by howe on 2017/3/21.
 */

let HActionComponent = require("HActionComponent");

let NodePrototype = cc.Node.prototype;

NodePrototype.$runAction = function ( HAction )
{
    let component = this.getComponent(HActionComponent);
    if (!component)
    {
        this.addComponent(HActionComponent);
        component = this.getComponent(HActionComponent);
        component.__$init( this );
    }
    component.addActionToTickQueue( HAction );
};

NodePrototype.$removeAction = function ( HAction )
{
    let component = this.getComponent(HActionComponent);
    if (component)
    {
        component.removeAction(HAction);
    }
};


NodePrototype.$removeAllActions = function () {
    let component = this.getComponent(HActionComponent);
    if (component)
    {
        component.removeAllActions();
    }
};

NodePrototype.$pauseActions = function () {
    let component = this.getComponent(HActionComponent);
    if (component)
    {
        component.pause();
    }
};

NodePrototype.$resumeActions = function () {
    let component = this.getComponent(HActionComponent);
    if (component)
    {
        component.resume();
    }
};
NodePrototype.$getActionByTag = function ( tag )
{
    let component = this.getComponent(HActionComponent);
    if (component)
    {
        return component.getActionByTag(tag);
    }
    return null;
};