/**
 * 正在表达式
 */
layui.define(['chromeTool', 'jquery', 'chromeToolBase','form'], function (exports) {
    var $ = layui.$;
    var regexTest = function(regex,content,is_ignore_case)
    {
        if (regex == "" || content == '') return '';
        var ignoreCase = is_ignore_case ? 'i' : '';
        var reg = new RegExp(regex, "g" + ignoreCase);
        var arr = reg.exec(content);
        var string = '';
        if (arr) {
            string+= "共 " + arr.length + " 个匹配项\n";
            for (var i = 0; i < arr.length; i++) {
                string += ("$" + i + " -> " + arr[i]) + "\r\n";
            }
        }
        else {
            string = "没有匹配结果，请检查正则";
        }
        return string;
    };
    var chrome_tool_regex = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            return tool.pageData().get(key, function () {
                return {
                    "input_regex": "\\w+?(\\d+)\\w+?([\\u4e00-\\u9fa5]+)",
                    "input_content": "hello 1949world你好世界",
                    "is_ignore_case": true,
                };
            });
        };
        tool.loadComplete = function () {
            var block = $("#" + this.getBlockId());
            block.find(".submit_button").on('click', function () {
                var data = {
                    "input_regex": block.find('.input_regex').val(),
                    "input_content": block.find('.input_content').val(),
                    "is_ignore_case": block.find('.is_ignore_case').prop('checked')
                };
                data.output_content = regexTest(data.input_regex,data.input_content,data.is_ignore_case);
                block.find(".output_content").val(data.output_content);
                tool.pageData().set(data);
            });
            layui.form.on('select(common_regex)', function(data){
                block.find('.input_regex').val(data.value);
            });
        };
        return tool;
    };
    exports('chrome_tool_regex', chrome_tool_regex);
});