import {env} from '../helper'
import cache from './cache'

const toolConfig = require('../config')

// 工具缓存数据过期时间(秒)
export const TOOL_DATA_EXPIRY = toolConfig.toolDataExpiry
// 徽章过期时间(天)
export const BADGE_EXPIRY = toolConfig.badgeExpiry
// 分类徽章
export const BADGE_CATEGORY = toolConfig.badgeCategory
// 工具徽章
export const BADGE_TOOL = toolConfig.badgeTool
// 默认常用工具
export const DEFAULT_COMMON_TOOL = toolConfig.defaultCommonTool

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

const getToolDefaultCategory = function (name) {
    for (let i = 0; i < tool.length; i++) {
        if (tool[i].name === name) {
            return tool[i].cat[0]
        }
    }
    return ''
}

const getToolByName = (name) => {
    for (let item of tool) {
        if (name === item.name) {
            return item
        }
    }
    return null
}

/**
 * @param name
 * @param defaultValue
 * @return {any}
 */
const getSetting = function (name, defaultValue = null) {
    let setting = cache.getNoVersion('setting', {})
    return !setting.hasOwnProperty(name) ? defaultValue : setting[name]
}

/**
 * @param name
 * @param value
 * @return {boolean}
 */
const saveSetting = function (name, value) {
    let setting = cache.getNoVersion('setting', {})
    setting[name] = value
    cache.setNoVersion('setting', setting);
    return true
}

export default {
    tool: tool,
    saveSetting,
    getSetting,
    category,
    setUserCommon,
    getUserCommon,
    getToolByCategory(cat) {
        if (cat === 'common') {
            return getUserCommon().map((name) => {
                return getToolByName(name)
            }).filter((item) => {
                return item !== null
            });
        }
        return tool.filter((t) => {
            return t.cat.includes(cat);
        })
    },
    getToolDefaultCategory,
    badgeToolIsShow(tool) {
        return badgeIsShow() && BADGE_TOOL.includes(tool)
    },
    badgeCategoryIsShow(cat) {
        return badgeIsShow() && BADGE_CATEGORY.includes(cat)
    },
}
