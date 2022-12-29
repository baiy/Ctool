import {FeatureType, ToolType} from "./config";

// 路由
export type ToolRouteConfig<T extends ToolType = ToolType> = {
    tool: T, // 工具标示
    feature: FeatureType<T>, // 功能标示
    component: any
}

export type RouteMeta = {
    type: "tool"
    tool: ToolType
    feature: FeatureType
} | { type: "index" | "other" }

export type {StorageDataStructureInterface, StorageDataStructure, StorageInterface, PlatformRuntime} from "ctool-config"

// 多语言
export const localesReal = ["zh_CN", "en"] as const
export type LocaleLists = typeof localesReal[number];
export const locales = ["_default", ...localesReal] as const
export type Locale = typeof locales[number];

export interface LocaleStructure {
    message: string,
    placeholders?: string[]
}

export interface LocalListsStructure {
    code: Locale,
    name: string
}

export interface AllLocaleStructure {
    lists: LocalListsStructure[],
    detail: { [_k in LocaleLists]: { [_k: string]: LocaleStructure } }
}

// 历史数据
export interface HistoryItemStructure<T> {
    t: string,
    v: T
}

// 显示主题
export const themes = ["light", "dark", "auto"] as const
export type ThemeType = typeof themes[number];
export type ThemeRawType = Exclude<ThemeType, "auto">;

/**
 * 代码编辑器语言映射
 * @see node_modules @codemirror/language-data/dist/index.js
 */
export const editorLanguageMap = {
    json: {lang: "JSON"},
    javascript: {lang: "TSX"},
    jsx: {lang: "TSX"},
    html: {lang: "HTML", alias: ["html_table"]},
    xml: {lang: "XML"},
    css: {lang: "CSS"},
    less: {lang: "LESS"},
    scss: {lang: "SCSS"},
    graphql: {lang: ""},
    java: {lang: "Java"},
    ruby: {lang: "Ruby"},
    markdown: {lang: "Markdown"},
    c: {lang: "C"},
    cpp: {lang: "C++", alias: ['C++']},
    php: {lang: "PHP", alias: ['php_array']},
    python: {lang: "Python"},
    sql: {lang: "SQL"},
    yaml: {lang: "YAML"},
    typescript: {lang: "TSX"},
    csharp: {lang: "C#", alias: ["C#"]},
    rust: {lang: "Rust"},
    go: {lang: "Go"},
    dart: {lang: "Dart"},
    diff: {lang: "diff"},
    vue: {lang: "HTML"},
    protobuf: {lang: "ProtoBuf"},
    toml: {lang: "TOML"},
    dockerfile: {lang: "Dockerfile"},
    erlang: {lang: "Erlang"},
    webAssembly: {lang: "WebAssembly"},
    coffeeScript: {lang: "CoffeeScript"},
    kotlin: {lang: "Kotlin"},
    lua: {lang: "Lua"},
    nginx: {lang: "Nginx"},
    perl: {lang: "Perl"},
    powerShell: {lang: "PowerShell"},
    properties: {lang: "Properties file"},
    shell: {lang: "Shell"},
    swift: {lang: "Swift"},
    laTeX: {lang: "LaTeX"},
    angular: {lang: "HTML"},
    text: {lang: ""},
}

export type EditorLanguages = keyof typeof editorLanguageMap

// 组件尺寸
export type ComponentSizeType = "small" | "large" | "default";

// Display 组件
export type DisplayPosition =
    "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "top-left"
    | "top-right"
    | "top-center"
    | "right-center"
    | "left-center"
    | "center"

// UploadFile 组件
export type UploadFileType = "image" | "file"
export type UploadFileMode = "button" | "paste"
export type UploadFileButtonType = "icon" | "text"

// TextInput 组件
export type TextInputUpload = UploadFileType | "none"

// Button 组件
export type ButtonType = "general" | "primary" | "danger" | "dotted"
// Select 组件
export type SelectOption = Array<string | number | { value: string | number, label: string | number }>
export type SelectValue = string | number
export type SelectType = "general" | "primary"
// Radio 组件
export type RadioOption = Array<string | number | { value: string | number, label: string | number }>
export type RadioValue = string | number
// table 组件
export type TableConfig = { key: string, title: string, width?: number, html?: boolean }[]
export type TableLists = Record<string, any>[]
// link 组件
export type LinkType = 'primary' | 'default'
// Modal 组件
export type ModalFooterType = 'normal' | 'long' | 'none'
// Tabs 组件
export type TabsListsType = { name: string, label: string }[]
// center 组件
export type CenterType = boolean // false:禁用 true:横向排列 绝对居中 = row
    | "row"  // 横向排列 绝对居中
    | "column"  // 竖向排列 绝对居中
    | 'vertical' // 横向排列 垂直居中
    | 'horizontal' // 横向排列 水平居中
    | 'column-vertical' // 竖向排列 垂直居中
    | 'column-horizontal' // 竖向排列 水平居中

// Align 组件
export type AlignDirection = "horizontal" | "vertical"
export type AlignHorizontal = "left" | "center" | "right" | "none"
export type AlignVertical = "top" | "center" | "bottom"
export type AlignSize = ComponentSizeType | "none" | string | number

// 历史数据序列化/反序列化
export interface HistorySerializable<T = any> {
    __: "_history_serializable_"

    isSaveHistory(): boolean

    serialize(): Record<string, any>

    unserialize(data?: Record<string, any>): T
}

// 输入输出组件
export interface InputOutputBase<T extends string = string> {
    _: "_output_" | "_input_"
    type: T,
    option: {
        [key in T]?: any
    }
}

export interface InputBase<T extends string = string, V = string> extends InputOutputBase<T> {
    _: "_input_",
    value: V,
}

export interface OutputBase<T extends string = string> extends InputOutputBase<T> {
    _: "_output_"
}

// 文本输入输出
const _textInputEncoderLists = ['text', 'base64', 'hex', 'upload', 'url'] as const
export type TextInputEncoderType = typeof _textInputEncoderLists[number]
export const textInputEncoderLists: TextInputEncoderType[] = _textInputEncoderLists as any
const _textOutputEncoderLists = ['text', 'base64', 'hex', 'image', 'down'] as const
export type TextOutputEncoderType = typeof _textOutputEncoderLists[number]
export const textOutputEncoderLists: TextOutputEncoderType[] = _textOutputEncoderLists as any

// 序列化输入输出
const _serializeInputEncoderLists = ['json', 'http_query_string', 'csv', 'html_table', 'xml', 'yaml', 'toml', 'properties', 'php_array'] as const
export type SerializeInputEncoderType = typeof _serializeInputEncoderLists[number]
export const serializeInputEncoderLists: SerializeInputEncoderType[] = _serializeInputEncoderLists as any
const _serializeOutputEncoderLists = ['json', 'http_query_string', 'csv', 'html_table', 'xml', 'yaml', 'toml', 'properties', 'php_array'] as const
export type SerializeOutputEncoderType = typeof _serializeOutputEncoderLists[number]
export const serializeOutputEncoderLists: SerializeOutputEncoderType[] = _serializeOutputEncoderLists as any

// 消息提示
export type MessageType = "success" | "error" | "info"
export type MessageOption = { offset?: number, showClose?: boolean, duration?: number }
export type MessageMethod = {
    closeAll: () => void
    success: (info: string, options?: MessageOption) => void
    error: (info: string, options?: MessageOption) => void,
    info: (info: string, options?: MessageOption) => void,
}



