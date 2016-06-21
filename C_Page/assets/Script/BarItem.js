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
        label:
        {
            default:null,
            type:cc.Label
        },
        nameLabel:
        {
            default:null,
            type:cc.Label
        },        
        value :{
            
            set :function (num) {
                this._value = num;
                
                this.changeView(num);
            },
            
            get :function ()
            {
                this._value = ( this._value === undefined )?0:this._value;
                return this._value;
            }
        }
        
    },
    
    setMaxValue(num)
    {
        this._maxValue = num;
        this.tick = function()
        {
            let currentValue = this.value;
            if (this._maxValue > currentValue)
            {
                this.value = ++currentValue;
            }else
            {
                this.unschedule(this.tick);
            }
        }  
        this.schedule(this.tick,0.1);
    },
    changeView(num)
    {           
        // var _colorV =  Math.floor( parseInt("00ff00",16) + num * 125 );
        console.log(num);
        
        this.node.height = num * 5;
        // this.node.color = cc.color(255,0,0)
        // this.node.color = cc.hexToColor( _colorV.toString(16));
        // console.log(_c.toString(16))
        this.label.string = num.toString();
        this.label.node.y = this.node.height + 5;
    },
    
    // use this for initialization
    onLoad: function () {
        this.value = 1;

    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) 
    {
      
    },
});
