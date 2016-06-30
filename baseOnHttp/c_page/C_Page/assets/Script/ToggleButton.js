cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        tag : "",
        
        selectedNormalSprite:{
            default: null,
            type: cc.SpriteFrame
        },
        selectedPressedSprite:{
            default: null,
            type: cc.SpriteFrame
        },
        selectedHoverSprite:{
            default: null,
            type: cc.SpriteFrame
        },
        selectedDisabledSprite:{
            default: null,
            type: cc.SpriteFrame
        },
        // selected:false,
        
        selected:{
            
            get: function () {
                if (this._selected === undefined )
                {
                    this._selected = false;
                }
                return this._selected;
            },
            set: function (value) 
            {
                if (this._selected === value)
                {
                    return
                }
                this._selected = value;
                this._setSelected(value);
            }
            
        },
        label :{
        
            set :function (str)
            {
                var _label = this.node.getChildByName("Label");
                _label.getComponent("cc.Label").string = str;
            },
            get :function()
            {
                var _label = this.node.getChildByName("Label");
                return _label.getComponent("cc.Label").string;
            }
        
        },
    },
    _setSelected :function(value)
    {
        // console.log("_setSelected",value);
        var button = this.getComponent(cc.Button);
        if (this._normalSprite === undefined)
        {
                    // 保存正常状态下的按钮纹理对象
            this._normalSprite = button.normalSprite;
            this._pressedSprite = button.pressedSprite;
            this._hoverSprite = button.hoverSprite;
            this._disabledSprite = button.disabledSprite;
        }
        if (value) 
        {
            button.normalSprite = this.selectedNormalSprite;
            button.pressedSprite = this.selectedPressedSprite ;
            button.hoverSprite = this.selectedHoverSprite;
            button.disabledSprite = this.selectedDisabledSprite;
        }else
        {
            button.normalSprite = this._normalSprite;
            button.pressedSprite = this._pressedSprite;
            button.hoverSprite = this._hoverSprite;
            button.disabledSprite = this._disabledSprite;
        }
    },
        
    // use this for initialization
    onLoad: function () {

    },
    
    clickHandler:function( target )
    {
        // console.log("click")
        this.selected = !this.selected;
        var event = new cc.Event.EventCustom('ToggleButtonChange', true);
        event.setUserData(this)
        this.node.dispatchEvent( event );
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
