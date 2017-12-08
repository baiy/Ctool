/**
 * URL编码编码转换
 */
layui.define(['chromeTool', 'jquery', 'chromeToolBase'], function (exports) {
    var $ = layui.$;
    var url = function (string, operation) {
        return operation === "encode" ? encodeURIComponent(string) : decodeURIComponent(string);
    };
    var chrome_tool_url = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key, function () {
                return {"tool_input_content": layui.chromeTool.clipboardPaste()}
            });
        };
        tool.loadComplete = function () {
            var id = this.getBlockId();
            $("#" + id + ' .submit_button').on('click', function () {
                var t = $(this);
                var data = {
                    "operation": $(this).data('value'),
                    "tool_input_content": $("#tool_input_content").val()
                };
                var result = url(data.tool_input_content, data.operation);
                $("#tool_result").val(result);
                // 复制结果
                layui.chromeTool.resultAutoCopy(result);
                data.tool_result = result;
                // 保存历史记录
                tool.pageData().set(data);
                t.addClass('layui-btn-normal').siblings().removeClass('layui-btn-normal');
            });
        };
        return tool;
    };

    exports('chrome_tool_url', chrome_tool_url);
});