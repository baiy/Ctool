import VueI18n from 'vue-i18n'
import Vue from 'vue'
import {getMessage as chromiumGetMessage} from "../adapter/chromium/helper"
import {isChromium} from "../helper";

Vue.use(VueI18n)

const locales = require('./locales/build.json')

// 区域列表
export const LOCALE_LISTS = locales.lists
export const LOCALE_DETAIL = locales.detail
export const DEFAULT_LOCALE = locales.default_locale

let currentLocale = "";

// 设置当前地区
export const setCurrentLocale = (locale) => {
    currentLocale = locale;
}

const getMessage = (code, key) => {
    let locale = code === "_default" ? DEFAULT_LOCALE : code;
    let text = key;
    if ((locale in LOCALE_DETAIL) && (key in LOCALE_DETAIL[locale])) {
        text = LOCALE_DETAIL[locale][key]['message']
    }
    else if(locale !== DEFAULT_LOCALE){
        // 获取默认语言
        text = getMessage(DEFAULT_LOCALE,key)
    }
    return text;
}

const translate = (code, key, values = {}) => {
    if (!key) return '';

    let locale = code === "_default" ? DEFAULT_LOCALE : code;
    if (isChromium && code === "_default") {
        let placeholders = []
        if (
            (locale in LOCALE_DETAIL)
            && (key in LOCALE_DETAIL[locale])
            && ('placeholders' in LOCALE_DETAIL[locale][key])
        ) {
            placeholders = LOCALE_DETAIL[locale][key]['placeholders']
        }
        return chromiumGetMessage(key, values, placeholders)
    }

    let text = getMessage(code,key);

    const matchRge = new RegExp('{.+?}', 'g')
    const matchString = text.match(matchRge);
    const replaceHash = {};
    // 获取语言包对应翻译内容
    let result = text;

    if (matchString) {
        matchString.forEach((wildcard) => {
            if ((wildcard in values) && !(wildcard in replaceHash)) {
                replaceHash[wildcard] = values[wildcard]
            }
        });
    }

    result = result.replace(matchRge, (replacer) => {
        return replacer in replaceHash ? replaceHash[replacer] : replacer;
    });
    return result;
}


window["__"] = (key, values = {}, locale = null) => {
    locale = !locale ? currentLocale : locale
    // values 必须是对象
    return translate(
        (!locale ? currentLocale : locale),
        key,
        values
    )
}

export const i18n = new VueI18n({
    locale: 'zh_CN',
    missing: (locale, key, vm, values) => {
        if (Array.isArray(values) && values.length === 1) {
            if (Array.isArray(values[0])) {
                // 数组转对象表示法
                let temp = {}
                for (let i = 0; i < values[0].length; i++) {
                    temp[i] = values[0][i]
                }
                return __(key, temp)
            }
            return __(key, values[0])
        }
        return __(key)
    }
})
