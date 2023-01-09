import {SqlLanguage, formatters as sqlFormatters} from 'sql-formatter';

type GlobalOption = {
    tab: number
}

export interface OptionMap {
    javascript: GlobalOption
    json: GlobalOption
    typescript: GlobalOption
    css: GlobalOption
    php: GlobalOption
    java: GlobalOption
    less: GlobalOption
    scss: GlobalOption
    markdown: GlobalOption
    yaml: GlobalOption
    xml: { collapse_content: boolean } & GlobalOption
    html: GlobalOption
    sql: { language: SqlLanguage } & GlobalOption
    vue: GlobalOption
    angular: GlobalOption
    graphql: GlobalOption
}

export type Languages = keyof OptionMap

export interface Format<T extends Languages> {
    format(type: "beautify" | "compress"): Promise<string>

    setName(value: T): Format<T>

    set(code: string, option?: OptionMap[T]): Format<T>
}

export interface Config<T extends Languages> {
    beautify: boolean
    compress: boolean
    load: () => Promise<Format<T>>
}

export const sqlLanguages = <SqlLanguage[]>Object.keys(sqlFormatters).sort()
