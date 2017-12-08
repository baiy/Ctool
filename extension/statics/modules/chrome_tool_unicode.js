// unicode 转换
layui.define(['chromeTool', 'jquery', 'chromeToolBase'], function (exports) {
    var $ = layui.$;
    function string2unicode(string) {
        var character = string.split("");
        var ascii = "";
        for (var i = 0; i < character.length; i++) {
            var code = Number(character[i].charCodeAt(0));
            if (code > 127) {
                var charAscii = code.toString(16);
                charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                ascii += "\\u" + charAscii;
            }
            else {
                ascii += character[i];
            }
        }
        return ascii;
    }

    function unicode2string(unicode) {
        var character = unicode.split("\\u");
        var native = character[0];
        for (var i = 1; i < character.length; i++) {
            var code = character[i];
            native += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
            if (code.length > 4) {
                native += code.substring(4, code.length);
            }
        }
        return native;
    }


    var chrome_tool_unicode = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key, function () {
                return {"input_content": $.trim(layui.chromeTool.clipboardPaste())};
            });
        };
        tool.loadComplete = function () {
            var block = $("#" + this.getBlockId());
            block.find(".submit_button").on('click', function () {
                var data = {
                    "input_content": block.find(".input_content").val(),
                    "type": $(this).data('value'),
                };

                data.output_content = data.type == '1' ? string2unicode(data.input_content) : unicode2string(data.input_content);
                block.find(".output_content").val(data.output_content);
                layui.chromeTool.resultAutoCopy(data.output_content);
                tool.pageData().set(data);
                $(this).addClass('layui-btn-normal').siblings().removeClass('layui-btn-normal');
            });
        };
        return tool;
    };
    exports('chrome_tool_unicode', chrome_tool_unicode);
});