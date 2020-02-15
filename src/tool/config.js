import { env, inArray } from '../helper'
import cache from './cache'

// 工具缓存数据过期时间(秒)
export const TOOL_DATA_EXPIRY = 1800
// 徽章过期时间(天)
export const BADGE_EXPIRY = 10
// 分类徽章
export const BADGE_CATEGORY = ['other']
// 工具徽章
export const BADGE_TOOL = ['time']
// 默认常用工具
export const DEFAULT_COMMON_TOOL = [
    'hash', 'encrypt', 'base64', 'url', 'timestamp',
    'qrCode', 'pinyin', 'ip', 'code', 'unicode',
    'decimalConvert', 'regex', 'randomString', 'phpArraySerialize',
    'diffs'
]

const category = [
    { 'name': 'common', 'title': '常用工具' },
    { 'name': 'encryption', 'title': '加密解密' },
    { 'name': 'conversion', 'title': '编码转换' },
    { 'name': 'other', 'title': '其他工具' },
]

const tool = [
    { 'name': 'hash', 'title': '哈希(hash)', cat: ['encryption'] },
    { 'name': 'encrypt', 'title': '加密/解密', cat: ['encryption'] },
    { 'name': 'base64', 'title': 'BASE64编码', cat: ['encryption'] },
    { 'name': 'url', 'title': 'URL编码', cat: ['conversion'] },
    { 'name': 'timestamp', 'title': '时间戳', cat: ['conversion'] },
    { 'name': 'qrCode', 'title': '二维码', cat: ['other'] },
    { 'name': 'pinyin', 'title': '汉字转拼音', cat: ['conversion'] },
    { 'name': 'ip', 'title': 'IP地址查询', cat: ['other'] },
    { 'name': 'code', 'title': '代码格式化', cat: ['other'] },
    { 'name': 'unicode', 'title': 'Unicode', cat: ['conversion'] },
    { 'name': 'decimalConvert', 'title': '进制转换', cat: ['conversion'] },
    { 'name': 'regex', 'title': '正则表达式', cat: ['other'] },
    { 'name': 'randomString', 'title': '随机字符生成', cat: ['other'] },
    { 'name': 'phpArraySerialize', 'title': 'PHP数组/序列化', cat: ['conversion'] },
    { 'name': 'diffs', 'title': '文本差异化对比', cat: ['other'] },
    { 'name': 'crontab', 'title': 'crontab校验', cat: ['other'] },
    { 'name': 'websocket', 'title': 'websocket调试', cat: ['other'] },
    { 'name': 'unit', 'title': '单位换算', cat: ['other'] },
    { 'name': 'time', 'title': '时间计算器', cat: ['other'] },
]

// 徽章是否显示
const badgeIsShow = function () {
    return (Date.parse((new Date()).toString()) / 1000) - env('updateTime') < BADGE_EXPIRY * 86400
}

const getUserCommon = function () {
    let tools = cache.getNoVersion('user_common')
    return tools ? tools : DEFAULT_COMMON_TOOL
}

const setUserCommon = function (tools) {
    cache.setnNoVersion('user_common', tools)
}

export default {
    tool,
    category,
    setUserCommon,
    getUserCommon,
    getToolByCategory (cat) {
        return tool.filter((t) => {
            if (cat === 'common') {
                return inArray(t.name, getUserCommon())
            }
            return inArray(cat, t.cat)
        })
    },
    badgeToolIsShow (tool) {
        return badgeIsShow() && inArray(tool, BADGE_TOOL)
    },
    badgeCategoryIsShow (cat) {
        return badgeIsShow() && inArray(cat, BADGE_CATEGORY)
    }
}