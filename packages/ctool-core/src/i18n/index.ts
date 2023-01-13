import {Locale, LocaleLists} from "@/types";
import platform from "@/helper/platform";
import {locales} from "@/buildDataTemp";
import event from "@/event";

export const LOCALE_DETAIL = locales.detail
// 默认语言
export const DEFAULT_LOCALE = platform.getLocale()
// 运行时当前语言
let currentLocale: Locale = "_default"

const getMessage = (code: Locale, key: string) => {
    let locale: LocaleLists = code === "_default" ? DEFAULT_LOCALE : code;
    let text = key;
    if ((locale in LOCALE_DETAIL) && (key in LOCALE_DETAIL[locale])) {
        text = LOCALE_DETAIL[locale][key]['message']
    }
    return text;
}

const translate = (code: Locale, key: string, values: Record<string, any> = {}): string => {
    if (!key) return '';

    let text = getMessage(code, key);

    const matchRge = new RegExp('{.+?}', 'g')
    const matchString = text.match(matchRge);
    const replaceHash: Record<string, any> = {};
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

export const $t = (key: string, values?: Record<string, any> | [], locale?: Locale) => {
    if (!locale) {
        locale = currentLocale
    }
    if (!values) {
        values = []
    }
    if (Array.isArray(values)) {
        // 数组转对象表示法
        let temp: Record<string, any> = {}
        for (let i = 0; i < values.length; i++) {
            temp[i] = values[i]
        }
        values = temp
    }

    // values 必须是对象
    return translate(locale, key, values)
}

// 设置当前语言
export const setCurrentLocale = (value: Locale) => {
    currentLocale = value
    document.getElementsByTagName('html')[0].dataset.locale = value === "_default" ? DEFAULT_LOCALE : value
    event.dispatch("locale_change", value)
}

// 获取当前语言
export const getCurrentLocale = () => {
    return $t('main_locale')
}

export const getLocaleName = (code: string): null | string => {
    for (let l of locales.lists) {
        if (l.code === code) {
            return l.name
        }
    }
    return null
}
