// hash工具
layui.define(['chromeTool', 'jquery','chromeToolBase'], function (exports) {
    var $ = layui.$;
    var chrome_tool_hash = function(tool_id){
        var type_lists = ['md5', 'sha1', 'sha256', 'sha512'];
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key,function(){
                return {"tool_input_content":layui.chromeTool.clipboardPaste(),"type_lists":type_lists}
            });
        };
        tool.loadComplete = function () {
            $("#" + this.getBlockId() + ' .tool_input_type').on('click', function () {
                var t = $(this);
                var type = $(this).data('value');
                var content = $("#tool_input_content").val();
                if ($.inArray(type, type_lists) !== -1) {
                    layui.use(['chrome_tool_library_cryptojs'], function () {
                        var result = layui.chrome_tool_library_cryptojs[type](content);
                        $("#tool_result").val(result);
                        // 复制结果
                        layui.chromeTool.resultAutoCopy(result);
                        // 保存页面数据
                        tool.pageData().set({"tool_input_content": content,"tool_result": result,"type": type,"type_lists":type_lists});
                        t.addClass('layui-btn-normal').siblings().removeClass('layui-btn-normal');
                    });
                }
            });
        };

        return tool;
    };
    exports('chrome_tool_hash', chrome_tool_hash);
});