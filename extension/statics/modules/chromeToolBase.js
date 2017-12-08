// 工具基类
layui.define(['jquery', 'chromeTool'], function (exports) {
    var $ = layui.$;
    var chromeToolBase = function (tool_id) {
        this.tool_id = tool_id;
        this._this  = this;
        this.block_id = (new Date()).getTime();
    };

    // 获取页面区块
    chromeToolBase.prototype.getBlockId = function () {
        return 'tool_key_' + this.block_id;
    };

    // 获取当前工具
    chromeToolBase.prototype.getTool = function () {
        return layui.chromeTool.getTool(this.tool_id);
    };
    // 工具加载方法
    chromeToolBase.prototype.loadComplete = function () {
        console.log("未定义工具加载方法");
    };

    // 页面数据操作
    chromeToolBase.prototype.pageDataExpires = 600;
    chromeToolBase.prototype.pageData = function (flag) {
        var tool_id = this.tool_id;
        var localstorage_key = 'tool_use_data';
        var page_data_expires = this.pageDataExpires;
        flag = !flag ? 'default' : flag;
        flag = 'tool_' + tool_id + '_' + flag;
        return {
            set: function (data) {
                if (page_data_expires > 0) {
                    var timestamp = Date.parse(new Date()) / 1000;
                    page_data_expires = parseInt(page_data_expires, 10);
                    data = {"data": data, "__expires": (timestamp + page_data_expires)};
                }
                layui.data(localstorage_key, {
                    key: flag
                    , value: data
                });
            },
            get: function (key,default_value) {
                var data = this.getFlagData(default_value);
                return data === null || !data[key] ? '' : data[key];
            },
            getFlagData:function(default_value){
                var data = layui.data(localstorage_key);
                if (data[flag] !== undefined) {
                    if (data[flag]["__expires"] === undefined) {
                        return data[flag];
                    }
                    if((Date.parse(new Date()) / 1000) <= data[flag]["__expires"]){
                        return data[flag]["data"];
                    }
                }
                return default_value ? default_value() : null;
            }
        };
    };
    chromeToolBase.prototype.getPageData = function (key,flag) {
        // 此方法子类覆盖 用于设置默认值
        return this.pageData(flag).get(key);
    };
    exports('chromeToolBase', chromeToolBase);
});