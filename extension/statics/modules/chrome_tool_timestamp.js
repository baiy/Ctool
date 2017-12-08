// 时间戳工具
layui.define(['chromeTool', 'jquery', 'chromeToolBase'], function (exports) {
    var $ = layui.$;

    function formatDate(date, fmt) {
        fmt = fmt ? fmt : "yyyy-MM-dd hh:mm:ss";
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var chrome_tool_timestamp = function (tool_id) {
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            var string = layui.chromeTool.clipboardPaste();
            if (!/^[0-9\s:\-]*$/.test(string)) {
                string = formatDate(new Date());
            }
            return tool.pageData().get(key, function () {
                return {"tool_input_content": string}
            });
        };
        tool.getResult = function (data, callback) {
            data.tool_input_content = $.trim(data.tool_input_content);
            if (isNaN(data.tool_input_content)) {
                var time = (Date.parse(new Date(data.tool_input_content))) / 1000;
                callback(isNaN(time) ? '' : time);
            }
            else {
                var newDate = new Date();
                newDate.setTime(data.tool_input_content * 1000);
                callback(formatDate(newDate));
            }
        };
        tool.loadComplete = function(){
            $("#" + this.getBlockId() + ' .submit_button').on('click', function () {
                var data = {
                    "tool_input_content": $("#tool_input_content").val(),
                };
                tool.getResult(data, function (result) {
                    $("#tool_result").val(result);
                    // 复制结果
                    layui.chromeTool.resultAutoCopy(result);
                    data.tool_result = result;
                    tool.pageData().set(data);
                })
            });
            $("#" + this.getBlockId() + ' .current_time').on('click', function () {
                $("#tool_input_content").val(formatDate(new Date()));
            });
        };

        return tool;
    };

    exports('chrome_tool_timestamp', chrome_tool_timestamp);
});