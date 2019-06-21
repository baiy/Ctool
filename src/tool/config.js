import {env, inArray} from "../helper";

// 工具缓存数据过期时间(秒)
export const TOOL_DATA_EXPIRY = 1800;
// 徽章过期时间(天)
export const BADGE_EXPIRY = 10;
// 分类徽章
export const BADGE_CATEGORY = ["other"];
// 工具徽章
export const BADGE_TOOL = ["crontab"];

const category = [
    {"name": "common", "title": "常用工具"},
    {"name": "encryption", "title": "加密解密"},
    {"name": "conversion", "title": "编码转换"},
    {"name": "other", "title": "其他工具"},
];

const tool = [
    {"name": "hash", "title": "哈希(hash)", cat: ["common", "encryption"]},
    {"name": "encrypt", "title": "加密/解密", cat: ["common", "encryption"]},
    {"name": "base64", "title": "BASE64编码", cat: ["common", "encryption"]},
    {"name": "url", "title": "URL编码", cat: ["common", "conversion"]},
    {"name": "timestamp", "title": "时间戳", cat: ["common", "conversion"]},
    {"name": "qrCode", "title": "二维码", cat: ["common", "conversion"]},
    {"name": "pinyin", "title": "汉字转拼音", cat: ["common", "other"]},
    {"name": "ip", "title": "IP地址查询", cat: ["common", "other"]},
    {"name": "code", "title": "代码格式化", cat: ["common", "other"]},
    {"name": "unicode", "title": "Unicode", cat: ["common", "conversion"]},
    {"name": "decimalConvert", "title": "进制转换", cat: ["common", "other"]},
    {"name": "regex", "title": "正则表达式", cat: ["common", "other"]},
    {"name": "randomString", "title": "随机字符生成", cat: ["common", "other"]},
    {"name": "phpArraySerialize", "title": "PHP数组/序列化", cat: ["common", "conversion"]},
    {"name": "diffs", "title": "文本差异化对比", cat: ["common", "other"]},
    {"name": "crontab", "title": "Crontab校验工具", cat: ["other"]},
];

// 徽章是否显示
const badgeIsShow = function () {
    return (Date.parse((new Date()).toString()) / 1000) - env('updateTime') < BADGE_EXPIRY * 86400
};

export default {
    tool,
    category,
    getToolByCategory(cat) {
        let list = [];
        if (cat) {
            tool.forEach((t) => {
                if (inArray(cat, t.cat)) {
                    list.push(t)
                }
            });
        }
        return list;
    },
    badgeToolIsShow(tool) {
        return badgeIsShow() && inArray(tool, BADGE_TOOL);
    },
    badgeCategoryIsShow(cat) {
        return badgeIsShow() && inArray(cat, BADGE_CATEGORY);
    }
}