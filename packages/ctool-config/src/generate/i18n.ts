// 编译语言包
import JSON5 from "json5";
import {fileCoreSrc, buildData, buildType} from "./fileSystem";
import {difference, cloneDeep} from "lodash";
import {tools,LocaleStructure, LocalListsStructure, AllLocaleStructure, localesReal} from "@/index"

const localLists: LocalListsStructure[] = [
    {code: '_default', name: "默认(default)"},
    {code: "en", name: "English"},
    {code: 'zh_CN', name: "简体中文"}
]

const placeholder = (message: string) => {
    let placeholders: string[] = [];
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

const getLocale = (code: string) => {
    const globalLocaleDir = `i18n/locales/${code}`
    if (!fileCoreSrc.isDir(globalLocaleDir)) {
        throw new Error(`无法获取全局语言包`)
    }
    let locale: { [_k: string]: LocaleStructure } = {}

    // 全局语言包
    fileCoreSrc.readdir(globalLocaleDir, '.i18n.json5').forEach((file) => {
        let type = file.replace('.i18n.json5', '');
        let config = JSON5.parse(fileCoreSrc.readFile(`${globalLocaleDir}/${file}`));
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
    })
    // 工具配置补全
    tools.forEach(tool => {
        if (tool.isSimple() && `tool_${tool.name}` in locale) {
            locale[`tool_${tool.name}_${tool.firstFeature().name}`] = cloneDeep(locale[`tool_${tool.name}`])
        }
        tool.features.forEach(feature => {
            const key = `tool_${tool.name}_${feature.name}_keywords`
            if (!(key in locale)) {
                locale[key] = {message: ""}
            }
        })

    })
    // 工具语言包
    tools.forEach((tool) => {
        const toolLocaleFile = `${tool.root}/i18n/${code}.json5`
        if (!fileCoreSrc.isFile(toolLocaleFile)) {
            return
        }
        let config = JSON5.parse(fileCoreSrc.readFile(toolLocaleFile));
        Object.keys(config).forEach((key) => {
            let placeholders = placeholder(config[key])
            locale[`${tool.name}_${key}`] = {
                message: config[key],
            }
            if (placeholders.length > 0) {
                locale[`${tool.name}_${key}`]["placeholders"] = placeholders
            }
        });
    })
    return locale;
}

const getAllLocales = () => {
    // 所有语言包
    let locales: AllLocaleStructure = {
        lists: localLists,
        detail: {
            zh_CN: {},
            en: {}
        }
    }
    localLists.forEach(({code}) => {
        if (code === "_default") {
            return;
        }
        let locale = getLocale(code)
        if (locale !== null) {
            locales['detail'][code] = locale;
        }

    })
    checkAllLocales(locales)
    return locales
}


const checkAllLocales = (locales: AllLocaleStructure) => {
    /**
     * 检查语言包是否完备
     * 确保中文/英文语言包是否一致
     */
    const zhKeys = Object.keys(locales['detail']['zh_CN'])
    const enKeys = Object.keys(locales['detail']['en'])

    const zhDiff = difference(zhKeys, enKeys);
    if (zhDiff.length > 0) {
        throw new Error(`中/英文语言包存在差异[key](英文缺失):${zhDiff.join(',')}`)
    }
    const enDiff = difference(enKeys, zhKeys);
    if (enDiff.length > 0) {
        throw new Error(`中/英文语言包存在差异[key](中文缺失):${enDiff.join(',')}`)
    }

    // 检查工具名称/功能配置
    tools.map((tool) => {
        if (!zhKeys.includes(`tool_${tool.name}`)) {
            throw new Error(`tool_${tool.name} 语言包配置不存在`)
        }
        tool.features.forEach(feature => {
            if (!zhKeys.includes(`tool_${tool.name}_${feature.name}`)) {
                throw new Error(`tool_${tool.name}_${feature.name} 语言包配置不存在`)
            }
        })
    })

}

export const allLocales = getAllLocales()

export const buildI18n = () => {
    // 运行时语言包
    buildData.prepend(`import {AllLocaleStructure} from "@/types"`)
    buildData.append(`export const locales:AllLocaleStructure = ${JSON.stringify(allLocales, null, 4)}`, '语言包')

    // 语言类型文件
    const typeLists = Object.keys(allLocales['detail']['zh_CN']).map((key) => {
        return `"${key}" // ${allLocales['detail']['zh_CN'][key].message}`
    })
    buildType.append(`type I18nLocale = "${localesReal.join(`" | "`)}"`, '语言地区类型')
    buildType.append(`type I18nKey = ${typeLists.join(`\n${" ".repeat(4)} | `)}`, '语言key类型')
    buildType.append(`declare const $t: (key: I18nKey | string, value?: Record<string, any> | any[], locale?: I18nLocale) => string`)
}
