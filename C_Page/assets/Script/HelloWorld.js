
var Model = require('DataModel');

var UUID  = Model.getUUID();

var protobufHelper = require('protobufHelper');

cc.Class({
    extends: cc.Component,

    properties: {
        
        titleLabel:
        {
            default:null,
            type:cc.Label
        }
        
    },
    
    // use this for initialization
    onLoad: function () {
        
        this.node.on("event_vote_success",function (event) {
            this.showBarList( event.getUserData() );
        }.bind(this))
        
        this.titleLabel.string="正在加载界面";

        this.node.getChildByName("BarLayout").active = false; 
        this.node.getChildByName("VoteView").active = false;

        let that = this
        let xhr = new XMLHttpRequest();

         xhr.onreadystatechange = function () {
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 
                let arrayBuffer = xhr.response;
                 if (arrayBuffer)
                 {
                    let message = protobufHelper.decodeBuffer("UserResponse",arrayBuffer);
                    console.log("返回的protobuf解码数据",message);
                    if (message.userModel && message.userModel.showVote)
                    {
                        that.showVoteView()
                    }else
                    {
                        that.showBarList(message.userList);
                    }
                 }
             }
         };
        //  var url = Model.ServerURL +  "/?uuid=" + UUID;
        let url = Model.ServerURL;
        //  console.log("url ",url);
        xhr.responseType = "arraybuffer";
        xhr.open("POST", url, true);   
        let buffer = protobufHelper.encodeBuffer("UserModel",{uuid:UUID});
        let message = protobufHelper.decodeBuffer("UserModel",buffer);
        console.log("发送的protobuf参数",message);
        xhr.send( buffer ); 
    },

    
    showVoteView:function () 
    {        
        this.titleLabel.string="请选择一个喜欢的饮料";
        
        this.node.getChildByName("BarLayout").active = false; 
        this.node.getChildByName("BarLayout").removeAllChildren();

        let view = this.node.getChildByName("VoteView");
        view.active = true;
        view.getComponent("VoteView").selectViewComponent.showList();
    },
    
    showBarList(responseData)
    {

        this.node.getChildByName("VoteView").active = false;
        this.node.getChildByName("VoteView").removeAllChildren();

        let map = new Map();
        let count = 0;
        for (let data of responseData.list)
        {
            if (!map.get(data["coco_id"]))
            {
                map.set(data["coco_id"],1);
            }else
            {
                map.set(data["coco_id"], map.get(data["coco_id"]) + 1);
            }
            ++count;
        }
        let myChoose = responseData.clientChoose;
        
        this.titleLabel.string="选择结果(共有"+count+"人已选)";

        let view = this.node.getChildByName("BarLayout");
        view.active = true;
        let barController = view.getComponent("BarListController")
        barController.showBarList(map,myChoose)
    },
    
    tipClickHandler()
    {
       let tips = this.node.getChildByName("TipLayout")
       tips.active = !tips.active;
    },
    // called every frame
    update: function (dt) {

    },
});
