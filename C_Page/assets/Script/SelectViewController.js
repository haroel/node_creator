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
        checkBoxPrefab:cc.Prefab
    },
    
    // use this for initialization
    onLoad: function () {
        // this._changeCallBack = null;
    },
    
    showList()
    {
        var menus = require("DataModel").Menus;        
        var groupComponent = this.getComponent("ToggleGroup");
        
        for (var ID in menus)
        {
            var menuInfo = menus[ID];
            var checkBox = cc.instantiate(this.checkBoxPrefab);
            this.node.addChild(checkBox);
            var toggleComponent = checkBox.getComponent("ToggleButton")
            toggleComponent.label = menuInfo.label;
            toggleComponent.tag = ID
            groupComponent.addControlls(toggleComponent);
            // console.log("sd",toggleComponent.label)
        }
        
        this.node.on("ToggleGroupChange", function (event) {
            
            console.log("选择的是", groupComponent.selectedItem.label);
                this._changeCallBack(groupComponent.selectedItem);

        }.bind(this))
        
        groupComponent.selectedIndex = 0;

    },
    
    setChangeCallBack( callListener,target )
    {
        this._changeCallBack = callListener.bind(target);
    },
    
    onDestroy ()
    {
        this._changeCallBack = null;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
