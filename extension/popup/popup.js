layui.config({base: '/statics/modules/'});
layui.use(['chromeTool'], function(){
    var tool = layui.chromeTool;
    tool.popup.init();
});