var SelectViewController = require("SelectViewController")
var UUID  = require('DataModel').getUUID();
var Model = require('DataModel');

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
        selectViewComponent:
        {
            default:null,
            type:SelectViewController
        }
    },

    // use this for initialization
    onLoad: function () {
        this.selectViewComponent.setChangeCallBack( function(item)
        {
            console.log("itemChangeHandler ",item.tag);
            this._coco_id = item.tag;     
        } ,this);
    },
   

    sendClickHandler(sender)
    {
        if (!this._coco_id)
        {
            console.log("coco_id is null");
            return;
        }
        var that = this
        var xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function () {
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 var responseData = JSON.parse(xhr.responseText)
                 
                var gEvent = new cc.Event.EventCustom('event_vote_success', true);
                gEvent.setUserData(responseData)
                that.node.dispatchEvent( gEvent );
                that = null;
              }
         };
         var url = Model.ServerURL + "/vote?uuid=" + UUID + "&item=" + this._coco_id;
         console.log("发送选择 ",url);
         xhr.open("POST", url, true);
         xhr.send();
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
