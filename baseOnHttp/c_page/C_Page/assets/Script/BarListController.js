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
        barItemPrefab:{
            default:null,
            type:cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.barItemList = [];
    },
    
    showBarList(datamap,myChoose)
    {
        var Model = require('DataModel');

        this.node.removeAllChildren();
        
        let i = 0;
        for (let barInfo of datamap)
        {
            console.log("barInfo",barInfo);
            
            var coco_id = barInfo[0]
            var num = barInfo[1];
            
            var barItem = cc.instantiate(this.barItemPrefab);
            this.node.addChild(barItem);
            var component = barItem.getComponent("BarItem");
            component.nameLabel.string = Model.Menus[coco_id].label;
            component.setMaxValue(num)         
            barItem.x = 20 + i * 100;
            barItem.y = 10;
            i++;
            
            if (myChoose === coco_id)
            {
                component.node.color = cc.color(106,90,205);
            }
        }
        
    },  

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
