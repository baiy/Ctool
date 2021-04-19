import {env, inArray} from '../helper'
import cache from './cache'

// 工具缓存数据过期时间(秒)
export const TOOL_DATA_EXPIRY = 3600 * 24
// 徽章过期时间(天)
export const BADGE_EXPIRY = 10
// 分类徽章
export const BADGE_CATEGORY = []
// 工具徽章
export const BADGE_TOOL = []
// 默认常用工具
export const DEFAULT_COMMON_TOOL = [
    'hash', 'encrypt', 'json', 'base64', 'url', 'timestamp',
    'qrCode', 'pinyin', 'ip', 'code', 'unicode',
    'decimalConvert', 'randomString', 'diffs',
]

const toolConfig = require('../config')

const category = toolConfig.category

const tool = toolConfig.tool

// 徽章是否显示
const badgeIsShow = function () {
    return (Date.parse((new Date()).toString()) / 1000) - env('updateTime') <
        BADGE_EXPIRY * 86400
}

const getUserCommon = function () {
    let tools = cache.getNoVersion('user_common')
    return tools ? tools : DEFAULT_COMMON_TOOL
}

const setUserCommon = function (tools) {
    cache.setNoVersion('user_common', tools)
}

const getToolTitle = function (name) {
    for (let i = 0; i < tool.length; i++) {
        if (tool[i].name === name) {
            return tool[i].title
        }
    }
    return ''
}

const getToolDefaultCategory = function (name) {
    for (let i = 0; i < tool.length; i++) {
        if (tool[i].name === name) {
            return tool[i].cat[0]
        }
    }
    return ''
}

const getSetting = function (name, defaultValue = null) {
    let setting = cache.getNoVersion('setting', {})
    return !setting.hasOwnProperty(name) ? defaultValue : setting[name]
}

const saveSetting = function (name, value) {
    let setting = cache.getNoVersion('setting', {})
    setting[name] = value
    cache.setNoVersion('setting', setting);
}

export default {
    tool,
    saveSetting,
    getSetting,
    category,
    setUserCommon,
    getToolTitle,
    getUserCommon,
    getToolByCategory(cat) {
        return tool.filter((t) => {
            if (cat === 'common') {
                return inArray(t.name, getUserCommon())
            }
            return inArray(cat, t.cat)
        })
    },
    getToolDefaultCategory,
    badgeToolIsShow(tool) {
        return badgeIsShow() && inArray(tool, BADGE_TOOL)
    },
    badgeCategoryIsShow(cat) {
        return badgeIsShow() && inArray(cat, BADGE_CATEGORY)
    },
}