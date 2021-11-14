// 编译语言包
const path = require('path');
const fs = require('fs');
const JSON5 = require('json5')
const _ = require('lodash')

const LOCAL_LISTS = [
    {code: '_default', name: "默认(default)"},
    {code: "en", name: "English"},
    {code: 'zh_CN', name: "简体中文"}
]

// 默认地区
const DEFAULT_LOCALE = 'zh_CN'
// 为空展示地区
const DEFAULT_SHOW_LOCALE = 'en'

const codeToLocale = (code) => {
    return code === "_default" ? DEFAULT_LOCALE : code;
}

const placeholder = (message) => {
    let placeholders = [];
    const result = message.match(new RegExp('{.+?}', 'g'));
    if (result !== null) {
        result.forEach((item) => {
            item = item.replace('{', '').replace('}', '')
            if (!placeholders.includes(item)) {
                placeholders.push(item)
            }
        })
    }
    return placeholders
}

const getLocale = (code) => {
    const localeDir = path.join(__dirname, "locales/" + code)
    if (!(fs.existsSync(localeDir) && fs.statSync(localeDir).isDirectory())) {
        return null;
    }
    let locale = {}
    fs.readdirSync(path.resolve(localeDir)).forEach((file) => {
        if (file.indexOf('.i18n.json5') !== -1) {
            let type = file.replace('.i18n.json5', '');
            let config = JSON5.parse(fs.readFileSync(path.join(__dirname, `locales/${code}/${file}`), 'utf-8'));
            // 写入区域
            if (type === "main") {
                locale[`${type}_locale`] = {message: code}
            }
            Object.keys(config).forEach(function (key) {
                let placeholders = placeholder(config[key])
                locale[`${type}_${key}`] = {
                    message: config[key],
                }
                if (placeholders.length > 0) {
                    locale[`${type}_${key}`]["placeholders"] = placeholders
                }
            });
        }
    })
    return locale;
}

const getAllLocale = () => {
    // 所有语言包
    let locales = {
        lists: LOCAL_LISTS,
        default_locale: DEFAULT_LOCALE,
        default_show_locale: DEFAULT_SHOW_LOCALE,
        detail: {}
    }
    fs.readdirSync(path.resolve(path.join(__dirname, "locales"))).forEach((code) => {
        let locale = getLocale(code)
        if (locale !== null) {
            locales['detail'][code] = locale;
        }
    })
    checkAllLocale(locales)
    return locales
}


const checkAllLocale = (locales) => {
    /**
     * 检查语言包是否完备
     * 确保中文/英文语言包是否一致
     */
    const zhKeys = Object.keys(locales['detail']['zh_CN'])
    const enKeys = Object.keys(locales['detail']['en'])

    const zhDiff = _.difference(zhKeys, enKeys);
    if (zhDiff.length > 0) {
        throw new Error(`中/英文语言包存在差异[key](英文缺失):${zhDiff.join(',')}`)
    }
    const enDiff = _.difference(enKeys, zhKeys);
    if (enDiff.length > 0) {
        throw new Error(`中/英文语言包存在差异[key](中文缺失):${enDiff.join(',')}`)
    }
}


const ALL_LOCALE = getAllLocale()

module.exports = {
    getLocales() {
        return ALL_LOCALE;
    },
    // 生成运行时语言包
    generate() {
        fs.writeFileSync(path.join(__dirname, 'locales/build.js'), `export default ${JSON.stringify(ALL_LOCALE, null, 4)}`);
    },
    getMessage(code, key) {
        let locales = ALL_LOCALE['detail']
        let locale = codeToLocale(code)
        let text = key;
        if ((locale in locales) && (key in locales[locale])) {
            text = locales[locale][key]['message']
        } else if (locale !== DEFAULT_SHOW_LOCALE) {
            // 获取默认语言
            text = this.getMessage(DEFAULT_SHOW_LOCALE, key)
        }
        return text;
    },
    translate(key, values = {}, code = DEFAULT_LOCALE) {
        if (!key) return '';
        const text = this.getMessage(code, key)

        const matchRge = new RegExp('{.+?}', 'g')
        const matchString = text.match(matchRge);
        const replaceHash = {};
        // 获取语言包对应翻译内容
        let result = text;

        if (matchString) {
            matchString.forEach((wildcard) => {
                let key = wildcard.replace("{", "").replace("}", '')
                if ((key in values) && !(wildcard in replaceHash)) {
                    replaceHash[wildcard] = values[key]
                }
            });
        }

        result = result.replace(matchRge, (replacer) => {
            return replacer in replaceHash ? replaceHash[replacer] : replacer;
        });
        return result;
    }
}
