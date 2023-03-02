import i18n from "./locale.json"
import {i18n as coreI18n} from "../../ctool-core/public/ctool.addition.json"
import {
    Locale,
    ThemeType,
} from "ctool-config"

const settingKey = "ctool.nv_setting"
const browserLocale = navigator.language
const defaultLocale = browserLocale === "zh" || browserLocale.indexOf("zh-") === 0 || browserLocale.indexOf("zh_") === 0 ? "zh_CN" : "en"
const secondLocale = defaultLocale === "zh_CN" ? "en" : "zh_CN"

export const getSetting = (): { v: { items: { locale: Locale, theme: ThemeType } } } => {
    return JSON.parse(localStorage.getItem(settingKey) || `{"e":0,"v":{"items":{"locale":"_default","theme":"auto"}}}`)
}

const updateSetting = (key: "locale" | "theme", value: any) => {
    const setting = getSetting()
    // @ts-ignore
    setting.v.items[key] = value
    localStorage.setItem(settingKey, JSON.stringify(setting))
}

export const updateTheme = () => {
    let theme = getSetting().v.items.theme
    if (theme === 'auto') {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    }
    updateSetting("theme", theme === "dark" ? "light" : "dark")
    initTheme()
}

export const updateLocale = () => {
    updateSetting("locale", getSetting().v.items.locale === secondLocale ? defaultLocale : secondLocale)
}

export const initTheme = () => {
    let theme = getSetting().v.items.theme
    if (theme === 'auto') {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    }
    document.getElementsByTagName('html')[0].dataset.theme = theme
}

export const translation = (key: string, locale: Locale) => {
    let l = locale === "_default" ? defaultLocale : locale
    if (key in i18n[l]) {
        return i18n[l][key];
    }
    if (key in coreI18n.detail[l]) {
        return coreI18n.detail[l][key]['message']
    }

    return key
}
