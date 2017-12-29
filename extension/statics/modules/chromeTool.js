layui.define(['laytpl', 'layer', 'jquery', 'element', 'form', 'chromeToolConfig'], function (exports) {
    var $ = layui.$;
    var config = layui.chromeToolConfig;
    var form = layui.form;
    var element = layui.element;
    var chromeTool = {
        getAllCategory: function () {
            return config.category;
        },
        getCategory: function (id) {
            var key = "c_" + id;
            var data = {};
            if (this.getAllCategory()[key]) {
                data = this.getAllCategory()[key];
            }
            return data;
        },
        getAllTool: function () {
            return config.tool;
        },
        getTool: function (id) {
            var key = "t_" + id;
            var data = null;
            var tools = this.getAllTool();
            if (tools[key]) {
                data = tools[key];
                data["category"] = this.getCategory(data.catid);
            }
            return data;
        },
        getToolModule: function (id) {
            return 'chrome_tool_' + this.getTool(id).module;
        },
        getToolTpl: function (tool_id, callback) {
            var tpl_path = '/statics/modules/tool_tpl/' + this.getTool(tool_id).module + '.html';
            $.get(tpl_path, function (result) {
                callback(result);
            });
        },
        getToolIdsByCatid: function (catid) {
            // 用户自定义
            if (catid == 1 && this.UserToolIds()) {
                return this.UserToolIds()
            }
            var ids = [];
            $.each(this.getAllTool(), function (k, t) {
                if ($.inArray(catid, t.catid) !== -1) {
                    ids.push(t.id);
                }
            });
            return ids;
        },
        getToolByIds: function (ids) {
            var tools = [];
            $.each(ids, function (k, id) {
                var t = chromeTool.getTool(id);
                if (t) {
                    tools.push(t);
                }

            });
            return tools;
        },
        /**
         * localstorage 操作 expires 过期时间(秒)
         */
        cahce: function (name, value, default_value, expires) {
            name = name.split('.');
            var key = name[1] === undefined ? 'data' : name[1];
            name = name[0];
            var timestamp = Date.parse(new Date()) / 1000;
            if (value) {
                if (expires) {
                    expires = parseInt(expires, 10);
                    value = {"data": value, "__expires": (timestamp + expires)};
                }
                layui.data(name, {
                    key: key
                    , value: value
                });
                return value;
            }
            else {
                value = layui.data(name);
                if (value[key] !== undefined) {
                    if (value[key]["__expires"] === undefined) {
                        return value[key];
                    }
                    if (timestamp <= value[key]["__expires"]) {
                        return value[key]["data"];
                    }
                }
                return default_value ? default_value() : null;
            }
        },
        // 设置获取用户工具数据 todo
        UserToolIds: function (user_tool_ids) {
            return this.cahce('user_tool_ids', user_tool_ids);
        },
        clipboardCopy: function (string) {
            var textarea = $('<textarea></textarea>')[0];
            textarea.value = string;
            $("#clipboard_text").html(textarea);
            textarea.select();
            if (document.execCommand('copy')) {
                this.msg('结果已复制 ^o^');
            }
            textarea.remove();
        },
        clipboardPaste: function (callback) {
            var textarea = $('<textarea></textarea>');
            $("#clipboard_text").html(textarea);
            textarea[0].select();
            document.execCommand('paste');
            var string = $.trim(textarea.val());
            textarea.remove();
            if (string) {
                callback && callback(string);
            }
            return string;
        },
        resultAutoCopy: function (string, callback) {
            if (string) {
                chromeTool.clipboardCopy(string)
                callback && callback();
            }
        },
        msg: function (string) {
            layui.layer.msg(string);
        }
    };

    chromeTool.popup = {
        init: function () {
            // 分类导航渲染
            this.showCategoryNav();

            // 根据页面历史显示工具块
            this.showToolBlock(this.pageCategoryHistory());

            // 页面选项链接
            this.option();

            element.render();
            form.render();
        },
        option:function(){
            // 新窗口打开
            $("#blank").on('click',function(){
                chrome.tabs.create({url:window.location.href,selected:true});
            });
        },
        // 分类导航渲染
        showCategoryNav: function () {
            var category = chromeTool.getAllCategory();
            // 渲染导航
            layui.laytpl($("#tpl_page").html()).render({
                "category": category
            }, function (html) {
                var t = chromeTool.popup;
                $("#page_category").html(html);
                // 点击分类
                $('.tool_category').on('click', function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault()
                    }
                    t.showToolBlock($(this).data('id'));
                });
            });
        },
        // 显示工具
        showToolBlock: function (catid) {
            catid = !catid ? 1 : catid;
            $("#page").data('catid', catid);

            // 获取当前页面工具集合
            var tool_ids = chromeTool.getToolIdsByCatid(catid);

            // 获取分类当前工具
            var tool_id = this.categoryToolHistory(catid)

            // 设置当前导航
            $(".tool_category_" + catid).addClass('layui-this').siblings(".tool_category").removeClass("layui-this");

            // 渲染工具块
            layui.laytpl($("#tpl_tool_block").html()).render({
                "tools": chromeTool.getToolByIds(tool_ids),
                "default_tool_id": tool_id
            }, function (html) {
                $("#page_content").html(html);
                // 工具导航点击
                form.on('radio(tool_nav)', function (data) {
                    chromeTool.popup.showToolContentBlock(catid, data.value);
                });
                // 记录页面分类历史
                chromeTool.popup.pageCategoryHistory(catid);
                // 渲染工具块详细内容
                chromeTool.popup.showToolContentBlock(catid, tool_id)

            });
        },
        showToolContentBlock: function (catid, tool_id) {
            $("#page").data('toolid', tool_id);
            chromeTool.getToolTpl(tool_id, function (tpl) {
                // 加载完成执行 工具加载完成访问
                var module = chromeTool.getToolModule(tool_id);
                layui.use([module], function () {
                    var tool_module = layui[module](tool_id);
                    layui.laytpl(tpl).render({
                        "getPageData": function(){
                            return tool_module.getPageData.apply(tool_module,arguments);
                        }
                    }, function (html) {
                        $("#tpl_tool_content_block").html('<div id="' + tool_module.getBlockId() + '">' + html + '</div>');
                        // 记录分类工具历史
                        chromeTool.popup.categoryToolHistory(catid, tool_id);
                        tool_module.loadComplete();
                        element.render();
                        form.render();
                    });
                });
            });

        },
        // 记录页面当前分类
        pageCategoryHistory: function (catid) {
            return chromeTool.cahce('page_category_history', catid, function () {
                return 1;
            });
        },
        // 记录分类当前工具
        categoryToolHistory: function (catid, current_tool_id) {
            return chromeTool.cahce(
                'category_tool_history.catid_' + catid,
                current_tool_id, function () {
                    return chromeTool.getToolIdsByCatid(catid)[0];
                }
            );
        }
    };
    exports('chromeTool', chromeTool);
});