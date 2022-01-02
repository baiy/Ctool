import VueI18n from 'vue-i18n'
import Vue from 'vue'
import {getMessage as chromiumGetMessage} from "../adapter/chromium/helper"
import {getMessage as firefoxGetMessage} from "../adapter/firefox/helper"
import {isChromium,isFirefox} from "../helper";
import locales from "./locales/build.js";

Vue.use(VueI18n)

// 区域列表
export const LOCALE_LISTS = locales.lists
export const LOCALE_DETAIL = locales.detail
export const DEFAULT_LOCALE = locales.default_locale
export const DEFAULT_SHOW_LOCALE = locales.default_show_locale

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
    } else if (locale !== DEFAULT_SHOW_LOCALE) {
        // 获取默认语言
        text = getMessage(DEFAULT_SHOW_LOCALE, key)
    }
    return text;
}

const translate = (code, key, values = {}) => {
    if (!key) return '';

    let locale = code === "_default" ? DEFAULT_LOCALE : code;
    if (code === "_default" && (isChromium || isFirefox) ) {
        let placeholders = []
        if (
            (locale in LOCALE_DETAIL)
            && (key in LOCALE_DETAIL[locale])
            && ('placeholders' in LOCALE_DETAIL[locale][key])
        ) {
            placeholders = LOCALE_DETAIL[locale][key]['placeholders']
        }
        if (isChromium){
            return chromiumGetMessage(key, values, placeholders)
        }
        if (isFirefox){
            return firefoxGetMessage(key, values, placeholders)
        }
    }

    let text = getMessage(code, key);

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


window["__"] = (key, values = {}, locale = null) => {
    locale = !locale ? currentLocale : locale
    // values 必须是对象
    return translate(
        (!locale ? currentLocale : locale),
        key,
        values
    )
}

// 获取当前真实区域
export const getCurrentLocale = () => {
    return __('main_locale').toString();
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
