// 随机字符生成器
layui.define(['chromeTool', 'jquery', 'chromeToolBase'], function (exports) {
    var $ = layui.$;
    var chrome_tool_random_string = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key, function () {
                return {
                    "option_length": 8,
                    "option_number": 2,
                    "option_delimiter": "\\n",
                    "option_is_num": true,
                    "option_is_lowercase": true,
                    "option_is_uppercase": true,
                    "option_is_punctuation": false,
                    "option_is_unique": false,
                    "option_is_add_quote": false
                };
            });
        };
        tool.loadComplete = function () {
            $("#tool_submit").on('click', function () {
                var data = {
                    "option_length": $("#option_length").val(),
                    "option_number": $("#option_number").val(),
                    "option_delimiter": $("#option_delimiter").val(),
                    "option_is_num": $("#option_is_num").prop('checked'),
                    "option_is_lowercase": $("#option_is_lowercase").prop('checked'),
                    "option_is_uppercase": $("#option_is_uppercase").prop('checked'),
                    "option_is_punctuation": $("#option_is_punctuation").prop('checked'),
                    "option_is_unique": $("#option_is_unique").prop('checked'),
                    "option_is_add_quote": $("#option_is_add_quote").prop('checked')
                };

                var chars = "";
                if (data.option_is_num) chars += "0123456789";
                if (data.option_is_lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
                if (data.option_is_lowercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if (data.option_is_punctuation) chars += "`~!@#$%^&*()-_=+[{]}\|;:',<.>/?";

                var random_string_lists = [];
                for (var i = 0, l = data.option_number; i < l; i++) {
                    var _chars = chars.split(""),
                        random_string = "";
                    for (var j = 0, k = data.option_length; j < k; j++) {
                        if (_chars.length < 1) break;
                        var index = Math.floor(Math.random() * _chars.length);
                        random_string += _chars[index];
                        if (data.option_is_unique) _chars.splice(index, 1);
                    }
                    random_string_lists.push(data.option_is_add_quote ? '"'+random_string+'"' : random_string);
                }

                data.tool_result = random_string_lists.join(data.option_delimiter.replace(/\\n/, "\n"));
                tool.pageData().set(data);
                $("#tool_result").html(data.tool_result);
                layui.chromeTool.resultAutoCopy(data.tool_result);
            });
        };
        return tool;
    };
    exports('chrome_tool_random_string', chrome_tool_random_string);
});