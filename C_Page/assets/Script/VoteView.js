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
            alert("请选择一个饮品!");
            return;
        }
        let protobufHelper = require('protobufHelper');

        let xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function () {
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) 
             {
                 let arrayBuffer = xhr.response;
                 if (arrayBuffer)
                 {
                    let message = protobufHelper.decodeBuffer("UserResponse",arrayBuffer);
                    console.log("返回的protobuf解码数据",message);
                    if (message.userList)
                    {
                        let gEvent = new cc.Event.EventCustom('event_vote_success', true);
                        gEvent.setUserData(message.userList)
                        this.node.dispatchEvent( gEvent );
                    }
                 }            
              }
         }.bind(this);
         xhr.responseType = "arraybuffer";

         //   var url = Model.ServerURL + "/vote?uuid=" + UUID + "&item=" + this._coco_id;         
         let url = Model.ServerURL + "/vote";
         let buffer = protobufHelper.encodeBuffer("UserInfo",{uuid:UUID,coco_id:this._coco_id});
         xhr.open("POST", url, true);
         xhr.send( buffer );
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
