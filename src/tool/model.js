import config from './config'
import clipboard from './clipboard'
import setting from './setting'
import cache from './cache'
import history from './history.js'

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

export const plugin = {
    install: function (Vue) {
        Vue.prototype.$getToolData = function (clipboardField = '') {
            let data = history(model.getCurrentTool()).current()
            if (clipboardField) {
                if (fixeInputData) { // 使用固定输入数据
                    data[clipboardField] = fixeInputData
                    fixeInputData = ""
                } else if (setting.autoReadCopy()) {
                    let paste = clipboard.paste()
                    if (!data[clipboardField] && paste) {
                        if (setting.autoReadCopyFilter()) {
                            paste = paste.trim()
                        }
                        data[clipboardField] = paste
                    }
                }
            }
            return data
        }
        Vue.prototype.$saveToolData = function (data) {
            return history(model.getCurrentTool()).push(data)
        }
        Vue.prototype.$clipboardCopy = function (data, force = false) {
            if ((setting.autoSaveCopy() || force) && data){
                clipboard.copy(data, () => {
                    this.$Message.success('结果已复制 ^o^')
                })
            }
        }
        Vue.prototype.$clipboardCopyImages = function (data, force = false) {
            if ((setting.autoSaveCopy() || force) && data){
                clipboard.copyImage(data, () => {
                    this.$Message.success('图片已复制 ^o^')
                })
            }
        }
    },
}

export default model
