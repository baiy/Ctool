// 汉字转拼音
layui.define(['chromeTool', 'jquery','chromeToolBase'], function (exports) {
    var $ = layui.$;
    var chrome_tool_pinyin = function(tool_id){
        var type_lists = {"normal":"无声调", "tone":"有声调", "abbr":"首字母"};
        var delimiter_lists = [
            {"n":"无分隔符","v":""},
            {"n":"空格分隔","v":" "},
            {"n":"'-'中划线分隔","v":"-"},
            {"n":"'_'下划线分隔","v":"_"},
            {"n":"'.'点分隔","v":"."}
            ];
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            var fixed = {
                "type_lists":type_lists,
                "delimiter_lists":delimiter_lists
            };
            return fixed[key] !== undefined ? fixed[key] : tool.pageData().get(key,function(){
                return {"tool_input_content":layui.chromeTool.clipboardPaste()};
            });
        };
        tool.loadComplete = function () {
            $("#" + this.getBlockId() + ' .tool_input_type').on('click', function () {
                var t = $(this);
                var data = {
                    "type":$(this).data('value'),
                    "tool_input_content":$("#tool_input_content").val(),
                    "delimiter":$("#input_delimiter").val()
                };
                if (type_lists[data.type] !== undefined) {
                    layui.use(['chrome_tool_library_pinyin'], function () {
                        var result = layui.chrome_tool_library_pinyin(data.type,data.tool_input_content,data.delimiter);
                        if(result){
                            data.tool_result = result;
                            tool.pageData().set(data);
                            layui.chromeTool.resultAutoCopy(data.tool_result);
                            $("#tool_result").val(data.tool_result);
                            t.addClass('layui-btn-normal').siblings().removeClass('layui-btn-normal');
                        }

                    });
                }
            });
        };

        return tool;
    };
    exports('chrome_tool_pinyin', chrome_tool_pinyin);
});