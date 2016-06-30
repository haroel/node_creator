'use strict';

var trace = console.log
trace("hello");
trace("test work!");

var re = /^(\d+?)/
trace(re.exec("102300"));



trace(/[，]+/.test('hello，world'));
// false
trace(/^\uD83D/.test('\uD83D\uDC2A'));
// true
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        // var fn = (y) => y - this.birth; // this.birth仍是1990

        var fn = function (year) {
            return year - this.birth; // this指向window或undefined
        };

        return fn.call(this, year);
    }
};
trace(obj.getAge(2015)); // 25

let testStr = "yasdaabcefghjuuuujhgfecba09123321123321_p"
let _testStr = testStr.split("").reverse().join("") // abccbay
// akol12332112332190abcefgfecbaadsayyasdaabcefgfecba09123321123321loka
let num = testStr.length
trace(testStr)
trace(_testStr)
trace("方法一：")
let repeatString = "";
for (let i = 0;i < num;++i)
{
    for (let j= num;j>i;--j)
    {
        let str = testStr.substring(i, j)
        if (_testStr.indexOf(str) >= 0 && str.length >= 3 && str.length > repeatString.length)
        {
            repeatString = str;
        }
    }
}
trace("搜索到的最长复文：" + repeatString);
trace("方法二：")
repeatString = "";
let fullstr = _testStr + testStr
let reg = /(.{3,}).*\1/g;
// let mmm = fullstr.match(reg);
// trace(mmm);
// return;
let match = reg.exec(fullstr);
while(match)
{
    // trace("搜索到的复文：" +reg.lastIndex );
    // trace(match);
    if (match[1].length > repeatString.length)
    {
        repeatString = match[1];
    }
    // break;
    reg.lastIndex = match.index + match[1].length;
    match = reg.exec(fullstr);

}
trace("搜索到的最长复文：" + repeatString);
trace(process.execPath); // 返回执行当前脚本的 Node 二进制文件的绝对路径。
trace(process.argv);
trace(process.env);



function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
trace(g.next()); // { value: 3, done: false }
trace(g.next()); // { value: undefined, done: true }

// var path = require("path");
// trace(path.exists( __dirname + "mysql_test.js"));


192.168.2.3:7456
0
访问项目文件夹

层级管理器

搜索...
BarItem
Label

资源管理器

搜索...
assets
Prefab
BarItem
ToggleButton
Scene
helloworld
Script
BarItem
DataModel
HelloWorld
BarListController
SelectViewController
ToggleButton
ToggleGroup
VoteView
Texture
db://assets/Script/BarItem.js

    场景编辑器






    -150-100-50050100150200250300350400050100150200250300350
BarItem
Label
使用鼠标右键平移视窗焦点，使用滚轮缩放视图
保存
关闭
BarItem

控制台

动画编辑器

filter
All
Regex
Collapse
Compiled successfully
Compiled successfully
2
TypeError: node._string.split is not a function
2
at proto._calculateLabelFont (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/bin/modular-cocos2d.js:11870:47)
at proto._bakeLabel (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/bin/modular-cocos2d.js:12052:31)
at _Class._ccsg.Label._ccsg.Node.extend._updateLabel (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/bin/modular-cocos2d.js:10940:29)
at _Class._ccsg.Label._ccsg.Node.extend._notifyLabelSkinDirty (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/bin/modular-cocos2d.js:10947:18)
at _Class._ccsg.Label._ccsg.Node.extend.setFontFileOrFamily (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/bin/modular-cocos2d.js:10842:18)
at _Class._ccsg.Label._ccsg.Node.extend.ctor (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/bin/modular-cocos2d.js:10654:14)
at new _Class (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/platform/_CCClass.js:86:17)
at cc_Label.cc.Class._initSgNode (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/components/CCLabel.js:316:24)
at cc_Label.cc.Class.onLoad (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/components/CCRendererUnderSG.js:55:14)
at cc_Label.cc.Class.onLoad (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/components/CCLabel.js:294:14)
at Object.cc._throw (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/CCDebugger.js:499:12)
at callonLoadInTryCatch (eval at <anonymous> (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/components/CCComponent.js:1:0), <anonymous>:1:62)
at cc_Label.__onNodeActivated (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/components/CCComponent.js:674:17)
at cc_Node.cc.Class._onActivatedInHierarchy (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/CCNode.js:872:27)
at cc_Node.cc.Class._onActivatedInHierarchy (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/CCNode.js:879:23)
at cc_Scene.cc.Scene.cc.Class._activate (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/CCScene.js:100:23)
at _Class.cc.Director.Class.extend.runSceneImmediate (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/CCDirector.js:532:19)
at /Applications/CocosCreator.app/Contents/Resources/app.asar/editor/page/scene-utils/prefab-edit-mode.js:1:950
at null.<anonymous> (/Applications/CocosCreator.app/Contents/Resources/app.asar/engine/cocos2d/core/platform/CCAssetLibrary.js:208:17)
at EventEmitter.<anonymous> (/Applications/CocosCreator.app/Contents/Resources/app.asar/editor-framework/lib/main/editor-init.js:1:10026)
at emitTwo (events.js:87:13)
at EventEmitter.emit (events.js:172:7)
at EventEmitter.<anonymous> (/Applications/CocosCreator.app/Contents/Resources/atom.asar/browser/api/web-contents.js:134:25)
at emitTwo (events.js:87:13)
at EventEmitter.emit (events.js:172:7)