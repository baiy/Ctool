/**
 * 代码格式化
 */
layui.define(['chromeTool', 'jquery', 'chromeToolBase'], function (exports) {
    var $ = layui.$;
    var chrome_tool_code = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            if (key == 'type_lists') {
                return ['json', 'xml', 'sql', 'css'];
            }
            return tool.pageData().get(key, function () {
                return {"input_content": layui.chromeTool.clipboardPaste()};
            });
        };
        tool.loadComplete = function () {
            var block = $("#" + this.getBlockId());
            block.find(".submit_button").on('click', function () {
                var data = {
                    "input_content": block.find('.input_content').val(),
                    "type": $(this).data('value'),
                    "is_compress": block.find(".is_compress").prop('checked')
                };
                $(this).addClass('layui-btn-normal').siblings().removeClass('layui-btn-normal');


                layui.use(['chrome_tool_library_code'], function () {
                    data.input_content = layui.chrome_tool_library_code[data.type](data.input_content,data.is_compress);

                    block.find(".input_content").val(data.input_content);
                    tool.pageData().set(data);
                });

            });
        };
        return tool;
    };
    exports('chrome_tool_code', chrome_tool_code);
});