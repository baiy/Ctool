// IP地址查询
layui.define(['chromeTool', 'jquery','chromeToolBase','code'], function (exports) {
    var $ = layui.$;
    var chrome_tool_ip = function(tool_id){
        var tool = new layui.chromeToolBase(tool_id);
        tool.getPageData = function (key) {
            var string = $.trim(layui.chromeTool.clipboardPaste());
            if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(string)) {
                string = '';
            }
            return tool.pageData().get(key,function(){
                return {"tool_input_content":string};
            });
        };
        tool.loadComplete = function () {
            $("#tool_submit").on('click', function () {
                var data = {
                    "tool_input_content":$("#tool_input_content").val(),
                };
                $.getJSON("http://whois.pconline.com.cn/ipJson.jsp",
                    {"json":"true","ip":data.tool_input_content == '本机IP' ? '' : data.tool_input_content},
                    function(result){
                        data.tool_result = '<pre class="layui-code" lay-title="查询结果">'+JSON.stringify(result,null, 4)+'</pre>';
                        tool.pageData().set(data);
                        $("#tool_result").html(data.tool_result);
                        layui.code();
                    }
                );
            });
            $("#tool_local_ip").on('click', function () {
                $("#tool_input_content").val('本机IP');
                $("#tool_submit").click();
            });
            layui.code();
        };
        return tool;
    };
    exports('chrome_tool_ip', chrome_tool_ip);
});