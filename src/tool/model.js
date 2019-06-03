import config from "./config"
import {TOOL_DATA_EXPIRY} from "./config"
import cache from "./cache"

const model = {
    getCategoryHistory() {
        return cache.get("page_category_history", "common")
    },
    setCategoryHistory(cat) {
        return cache.set("page_category_history", cat)
    },
    getToolHistory(cat) {
        let all = cache.get("category_tool_history", {});
        if (all[cat]) {
            return all[cat];
        }
        return config.getToolByCategory(cat)[0]["name"]
    },
    setToolHistory(cat, name) {
        let all = cache.get("category_tool_history", {});
        all[cat] = name;
        return cache.set("category_tool_history", all)
    },
    getCurrentTool() {
        return cache.get("current_tool", "")
    },
    setCurrentTool(name) {
        return cache.set("current_tool", name)
    },
    getToolData(name) {
        return !name ? {} : cache.get("tool_data_" + name, {})
    },
    setToolData(name, data) {
        return cache.set("tool_data_" + name, data, TOOL_DATA_EXPIRY)
    }
};

const clipboardPaste = function () {
    document.querySelector('#clipboard').innerHTML = '<textarea id="clipboard-text"></textarea>';
    document.querySelector('#clipboard-text').select();
    document.execCommand('paste');
    let r = document.querySelector('#clipboard-text').value || document.querySelector('#clipboard-text').innerHTML;
    document.querySelector('#clipboard').innerHTML = "";
    return r ? r : ""
};

export const plugin = {
    install: function (Vue) {
        Vue.prototype.$getToolData = function (clipboardField = "") {
            let data = model.getToolData(model.getCurrentTool());
            let paste =  clipboardPaste();
            if (clipboardField && !data[clipboardField] && paste){
                data[clipboardField] = paste;
            }
            return data;
        };
        Vue.prototype.$saveToolData = function (data) {
            return model.setToolData(model.getCurrentTool(), data)
        };
        Vue.prototype.$clipboardCopy = function (data) {
            if (!data) return;
            document.querySelector('#clipboard').innerHTML = '<textarea id="clipboard-text"></textarea>';
            document.querySelector('#clipboard-text').value = data;
            document.querySelector('#clipboard-text').select();
            if (document.execCommand('copy')) {
                this.$Message.success("结果已复制 ^o^")
            }
            document.querySelector('#clipboard').innerHTML = "";
        };
    }
};

export default model