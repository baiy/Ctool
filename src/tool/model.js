import config from './config'
import clipboard from './clipboard'
import setting from './setting'
import cache from './cache'
import history,{getForceLoadHistory} from './history.js'
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


const appendData = async function (check = "",all) {
    const result = (data = "") => {
        if (data) {
            if (
                !check
                || (_.isFunction(check) && check(data,all)) // 函数校验
            ) {
                return data
            }
        }
        return ""
    }
    return new Promise(async (resolve) => {
        try {
            // 使用固定输入数据
            if (fixeInputData) {
                let temp = fixeInputData
                fixeInputData = ""
                return resolve(result(temp))
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
            //强制使用历史数据
            let forceHistory = getForceLoadHistory(model.getCurrentTool())
            if (forceHistory){
                Object.assign(current, forceHistory)
                this[field] = current
                return;
            }

            let inputHistory = ""
            let inputDefault = ""
            let inputAppend = ""
            // 默认数据
            if (input && (input in current) && current[input]) {
                inputDefault = current[input];
            }
            // 历史数据
            if (isLoadHistory) {
                let history = this.$getToolData()
                Object.assign(current, history)
                if (input && (input in history)) {
                    inputHistory = history[input]
                    delete history[input]
                }
            }

            if (!input) {
                this[field] = current
                return;
            }

            // 追加剪贴板等数据
            appendData(inputCheck,current).then((append) => {
                inputAppend = append
                this[field] = Object.assign(
                    current,
                    {
                        // 追加数据 > 历史数据 > 默认数据
                        [input]: inputAppend ? inputAppend : (inputHistory ? inputHistory : inputDefault)
                    }
                )
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
            if ((setting.autoSaveCopy() || force)) {
                this.$copy(data)
            }
        }
        Vue.prototype.$copy = function (data) {
            if (data) {
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
