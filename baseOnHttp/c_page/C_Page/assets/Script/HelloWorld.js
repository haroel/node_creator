
var Model = require('DataModel');

var UUID  = Model.getUUID();

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

        var that = this
        var xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function () {
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 var responseData = JSON.parse(xhr.responseText)
                 console.log(xhr.responseText);
                 
                 if ( responseData.showVote == true  )
                 {
                     that.showVoteView()
                 }else
                 {
                     that.showBarList(responseData);
                 }
             }
         };
         var url = Model.ServerURL +  "/?uuid=" + UUID;
         console.log("url ",url);
         xhr.open("GET", url, true);
         xhr.send(); 
    },

    
    showVoteView:function () 
    {        
        this.titleLabel.string="请选择一个喜欢的饮料";
        
        this.node.getChildByName("BarLayout").active = false; 
        this.node.getChildByName("BarLayout").removeAllChildren();

        var view = this.node.getChildByName("VoteView");
        view.active = true;
        view.getComponent("VoteView").selectViewComponent.showList();
    },
    
    showBarList(responseData)
    {
        this.titleLabel.string="当前的选择情况分布，只会选择前三的饮料";

        this.node.getChildByName("VoteView").active = false;
        this.node.getChildByName("VoteView").removeAllChildren();

        var myChoose = "";
        var map = new Map();
        for (var data of responseData.datas)
        {
            if (!map.get(data["coco_id"]))
            {
                map.set(data["coco_id"],1);
            }else
            {
                map.set(data["coco_id"], map.get(data["coco_id"]) + 1);
            }
            if (data["uuid"].indexOf(UUID) > 0)
            {
                myChoose = data["coco_id"];
            }
        }
        var view = this.node.getChildByName("BarLayout");
        view.active = true;
        var barController = view.getComponent("BarListController")
        barController.showBarList(map,myChoose)
    },
    
    // called every frame
    update: function (dt) {

    },
});
