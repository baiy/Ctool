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
    defineConfig('C-99',getCodemirrorLanguage('c'),['c99']),
    defineConfig('C++ 14',getCodemirrorLanguage('c++'),['cpp14']),
    defineConfig('C++ 17',getCodemirrorLanguage('c++'),['cpp17']),
    defineConfig('Python 2',getCodemirrorLanguage('python'),['python2']),
    defineConfig('Python 3',getCodemirrorLanguage('python'),['python3']),
    defineConfig('VB.NET',getCodemirrorLanguage('VB.NET'),['vbn']),
    defineConfig('JavaScript',getCodemirrorLanguage('JavaScript'),['nodejs']),
]

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
    // 自定义
    for (let language of customLanguages) {
        if (
            [language.name, ...language.alias].map(name => name.toLowerCase()).includes(land.toLowerCase())
        ) {
            return language.name
        }
    }

    const codemirrorLanguage = getCodemirrorLanguage(land)
    if (codemirrorLanguage !== null) {
        return codemirrorLanguage.name
    }

    return land;
}

export const allLanguage = (() => {
    return [
        ...languages.map(item => item.name),
        ...customLanguages.map(item => item.name)
    ].sort()
})()





