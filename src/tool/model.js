import config from './config'
import clipboard from './clipboard'
import setting from './setting'
import cache from './cache'
import history from './history.js'
import _ from "lodash";

let fixeInputData;
let toolCurrentFeature = "";
const model = {
    getCategoryHistory() {
        return cache.get('page_category_history', 'common')
    },
    setCategoryHistory(cat) {
        return cache.set('page_category_history', cat)
    },
    getToolHistory(cat) {
        let all = cache.get('category_tool_history', {})
        if (all[cat]) {
            return all[cat]
        }
        return config.getToolByCategory(cat)[0]['name']
    },
    setToolHistory(cat, name) {
        let all = cache.get('category_tool_history', {})
        all[cat] = name
        return cache.set('category_tool_history', all)
    },
    getCurrentTool() {
        return cache.get('current_tool', '')
    },
    setCurrentTool(name) {
        return cache.set('current_tool', name)
    },
    setFixeInputData: (value) => {
        fixeInputData = value;
    },
    setToolCurrentFeature: (value) => {
        toolCurrentFeature = value;
    },
    getToolCurrentFeature: (def = "") => {
        let temp = toolCurrentFeature
        toolCurrentFeature = "";
        return temp ? temp : def
    }
}

// 保存历史记录防抖
let debounceSaveToolData = {};
const debounceSaveToolDataMethod = _.debounce(function () {
    return history(debounceSaveToolData['tool']).push(debounceSaveToolData['data'])
}, 1000)


const appendData = async function (field = "", check = "") {
    const result = (data = "") => {
        if (data){
            if (
                !check
                || (_.isFunction(check) && check(data)) // 函数校验
            ){
                return field ? {[field]: data} : data
            }
        }
        return field ? {} : ""
    }
    return new Promise(async (resolve) => {
        try {
            // 使用固定输入数据
            if (fixeInputData) {
                return resolve(result(fixeInputData))
            }
            if (setting.autoReadCopy()) {
                let paste = (await clipboard.paste()).trim()
                if (paste) {
                    resolve(result(paste))
                }
            }
            resolve(result())
        } catch {
            resolve(result())
        }
    });
}

export const plugin = {
    install: function (Vue) {
        Vue.prototype.$initToolData = function (input = "", inputCheck = "", field = "current", isLoadHistory = true) {
            let current = _.cloneDeep(this[field])
            if (isLoadHistory) {
                Object.assign(current, this.$getToolData())
            }
            if (!input) {
                this[field] = current
                return;
            }

            // 初始化默认值
            if (!(input in current)){
                current[input] = "";
            }

            // 保存默认值
            let inputDefault = current[input]
            current[input] = "";

            appendData(input, inputCheck).then((append) => {
                for (let key of Object.keys(append)) {
                    if ((key in current) && !current[key]) {
                        current[key] = append[key]
                    }
                }
                if (!current[input]){
                    // 使用默认值
                    current[input] = inputDefault
                }
                this[field] = current
            })
        }
        Vue.prototype.$getToolData = function () {
            return _.cloneDeep(history(model.getCurrentTool()).current())
        }
        Vue.prototype.$saveToolData = function (data, ignoreDebounce = false) {
            if (ignoreDebounce) {
                return history(model.getCurrentTool()).push(_.cloneDeep(data))
            }
            debounceSaveToolData = {tool: model.getCurrentTool(), data: _.cloneDeep(data)}
            debounceSaveToolDataMethod()
        }
        Vue.prototype.$clipboardCopy = function (data, force = false) {
            if ((setting.autoSaveCopy() || force) && data) {
                clipboard.copy(data, () => {
                    this.$Message.success(this.$t('main_ui_copy_text_ok').toString())
                })
            }
        }
        Vue.prototype.$clipboardCopyImages = function (data, force = false) {
            if ((setting.autoSaveCopy() || force) && data) {
                clipboard.copyImage(data, () => {
                    this.$Message.success(this.$t('main_ui_copy_image_ok').toString())
                })
            }
        }
    },
}

export default model
