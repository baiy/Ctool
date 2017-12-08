// 加密解密工具
layui.define(['jquery','chromeToolBase','chromeTool'], function (exports) {
    var $ = layui.$;
    var type_lists = {aes: "AES", des: "DES", rc4: "RC4", rabbit: "Rabbit", tripledes: "TripleDes"};

    var chrome_tool_encrypt = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key, function () {
                return {"tool_input_content": layui.chromeTool.clipboardPaste(), "type_lists": type_lists}
            });
        };
        tool.loadComplete = function () {
            var id = this.getBlockId();
            $("#" + id + ' .encrypt_button button').on('click', function () {
                var t = $(this);
                var data = {
                    "operation": $(this).data('value'),
                    "tool_input_content": $("#tool_input_content").val(),
                    "encrypt_password": $("#" + id + "  .encrypt_password").val(),
                    "encrypt_type": $("#" + id + "  .encrypt_type").val(),
                    "type_lists": type_lists
                };
                if ($.inArray(data.encrypt_type, ['aes', 'des', 'rc4', 'rabbit', 'tripledes']) !== -1) {
                    layui.use(['chrome_tool_library_cryptojs'], function () {
                        var operation = data.operation === "encrypt" ? "encrypt" : "decrypt";
                        var result = layui.chrome_tool_library_cryptojs[data.encrypt_type][operation](data.tool_input_content, data.encrypt_password);
                        $("#tool_result").val(result);
                        // 复制结果
                        layui.chromeTool.resultAutoCopy(result);
                        data.tool_result = result;
                        tool.pageData().set(data);
                        t.addClass('layui-btn-normal').siblings().removeClass('layui-btn-normal');
                    });
                }
            });
        };
        return tool;
    };

    exports('chrome_tool_encrypt', chrome_tool_encrypt);
});