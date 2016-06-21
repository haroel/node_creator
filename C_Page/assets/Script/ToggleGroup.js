var ToggleButton = require("ToggleButton");

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
        
        controlls :{
            default:[],
            type:[ToggleButton]
        },
        
        selectedIndex:{
            set:function (value)
            {
                this.selectedItem = this.controlls[value];
            },
            get :function()
            {
                for (let i = 0;i < this.controlls.length;i++)
                {
                    let item = this.controlls[i];
                    if (item.__tgIndex === this._selectedItem.__tgIndex )
                    {
                        return i;
                    }
                } 
            }
        },
    
        selectedItem :{
            set : function ( controll )
            {
                if (this._selectedItem && this._selectedItem.__tgIndex == controll.__tgIndex)
                {
                    return;
                }
                if (this._selectedItem)
                {
                    this._selectedItem.selected = false;
                }
                this._selectedItem = controll;
                controll.selected = true;
                
                var gEvent = new cc.Event.EventCustom('ToggleGroupChange', true);
                gEvent.setUserData({target:this})
                this.node.dispatchEvent( gEvent );
            },
            get :function ()
            {
                return this._selectedItem;
            }
        }
    },

    // use this for initialization
    onLoad: function () {
        this._kId = 0;
        this._selectedItem = null;
        
        this.node.on("ToggleButtonChange",function(event)
        {            
            this.selectedItem = event.getUserData() 
            event.stopPropagation();
        }.bind(this) );
    },
    
    addControlls:function (params) 
    {
        for (let i = 0;i < arguments.length;i++)
        {
            var item = arguments[i];
            item.__tgIndex = this._kId;
            this._kId++;
            this.controlls.push(item);
        }
    },
    removeControll:function (controll)
    {
         if (this._selectedItem && this._selectedItem.__tgIndex === controll.__tgIndex )
         {
             this._selectedItem = null;
             for (let i = 0;i < this.controlls.length;i++)
             {
                 let item = this.controlls[i];
                 if (item.__tgIndex === controll.__tgIndex )
                 {
                     this.controlls.splice(i,1);
                     break;
                 }
             }
         }
    },   
    
    onDestroy ()
    {
        this.controlls = null;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
