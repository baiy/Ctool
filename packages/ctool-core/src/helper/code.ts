import {languages} from "@codemirror/language-data"

type LanguageDescription = typeof languages[0]

// 获取 `codemirror` 编辑语言对象
const getCodemirrorLanguage = (land: string) => {
    for (let language of languages) {
        if ([language.name, ...language.alias].map(name => name.toLowerCase()).includes(land.toLowerCase())) {
            return language
        }
    }
    return null
}

// 定义自定义语言
const defineConfig = (name: string, languageDescription?: LanguageDescription | null, alias?: string[]) => {
    return {
        name,
        alias: alias || [],
        language_description: languageDescription ? languageDescription : null,
    }
}

// 自定义语言配置
const customLanguages = [
    defineConfig('GraphQL'),
    defineConfig('Vue', getCodemirrorLanguage('html')),
    defineConfig('Angular', getCodemirrorLanguage('html')),
    defineConfig('HTML Table', getCodemirrorLanguage('html'), ['html_table']),
    defineConfig('PHP Array', getCodemirrorLanguage('php'), ['php_array']),
    defineConfig('Php Serialize', getCodemirrorLanguage('php'), ['php_serialize']),
    defineConfig('Http Query String', null, ['http_query_string']),
    defineConfig('JSON Schema', getCodemirrorLanguage('json')),
    defineConfig('JavaScript PropTypes', getCodemirrorLanguage('TypeScript')),
    defineConfig('Flow', getCodemirrorLanguage('TypeScript')),
    defineConfig('Text'),
    defineConfig('CSV'),
]

// 编辑器是否支持代码高料
export const isSupportEditor = (land: string) => !!getEditorLanguage(land)

// 获取 编辑器 语言处理对象
export const getEditorLanguage = (land: string) => {
    const codemirrorLanguage = getCodemirrorLanguage(land)
    // codemirror
    if (codemirrorLanguage) {
        return codemirrorLanguage
    }

    // 自定义
    for (let language of customLanguages) {
        if (
            [language.name, ...language.alias].map(name => name.toLowerCase()).includes(land.toLowerCase())
            && language.language_description
        ) {
            return language.language_description
        }
    }
    return null
}

// 获取程序语言显示名称
export const getDisplayName = (land: string) => {
    const codemirrorLanguage = getCodemirrorLanguage(land)
    if (codemirrorLanguage !== null) {
        return codemirrorLanguage.name
    }

    // 自定义
    for (let language of customLanguages) {
        if (
            [language.name, ...language.alias].map(name => name.toLowerCase()).includes(land.toLowerCase())
        ) {
            return language.name
        }
    }

    return land;
}

export const allLanguage = (() => {
    return [
        ...languages.map(item => item.name),
        ...customLanguages.map(item => item.name)
    ].sort()
})()





