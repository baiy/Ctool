export type {
    StorageDataStructureInterface,
    StorageDataStructure,
    StorageInterface,
    Storage,
    Initializer,
    PlatformRuntime,
    LocaleLists,
    Locale,
    LocaleStructure,
    LocalListsStructure,
    AllLocaleStructure,
    HistoryItemStructure,
    RouteMeta,
    ToolRouteConfig,
    ThemeType,
    ThemeRawType,
} from "ctool-config";

export { localesReal, locales, themes } from "ctool-config";

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
export type SelectOption = Array<string | number | {
    value: string | number,
    label: string | number,
    description?: string
}>
export type SelectValue = string | number
export type SelectType = "general" | "primary"
// Radio 组件
export type RadioOption = Array<string | number | { value: string | number, label: string | number }>
export type RadioValue = string | number
// Checkbox 组件
export type CheckboxOption = Array<string | number | { value: string | number, label: string | number }>
export type CheckboxValue = (string | number)[]
// table 组件
export type TableConfig = { key: string, title: string, width?: number, html?: boolean }[]
export type TableLists = Record<string, any>[]
// link 组件
export type LinkType = "primary" | "default"
// Modal 组件
export type ModalFooterType = "normal" | "long" | "none"
// Tabs 组件
export type TabsListsType = { name: string, label: string }[]
// Align 组件
export type AlignDirection = "horizontal" | "vertical"
export type AlignHorizontal = "left" | "center" | "right" | "none"
export type AlignVertical = "top" | "center" | "bottom"
export type AlignSize = ComponentSizeType | "none" | string | number

// 历史数据序列化/反序列化
export interface HistorySerializable<T = any> {
    __: "_history_serializable_";

    isSaveHistory(): boolean;

    serialize(): Record<string, any>;

    unserialize(data?: Record<string, any>): T;
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
    _: "_output_";
}

// 文本输入输出
const _textInputEncoderLists = ["text", "base64", "hex", "upload", "url"] as const;
export type TextInputEncoderType = typeof _textInputEncoderLists[number]
export const textInputEncoderLists: TextInputEncoderType[] = _textInputEncoderLists as any;
const _textOutputEncoderLists = ["text", "base64", "hex", "image", "down"] as const;
export type TextOutputEncoderType = typeof _textOutputEncoderLists[number]
export const textOutputEncoderLists: TextOutputEncoderType[] = _textOutputEncoderLists as any;

// 序列化输入输出
const _serializeInputEncoderLists = ["json", "http_query_string", "csv", "html_table", "xml", "yaml", "toml", "properties", "php_array", "php_serialize"] as const;
export type SerializeInputEncoderType = typeof _serializeInputEncoderLists[number]
export const serializeInputEncoderLists: SerializeInputEncoderType[] = _serializeInputEncoderLists as any;
const _serializeOutputEncoderLists = ["text", "json", "http_query_string", "csv", "html_table", "xml", "yaml", "toml", "properties", "php_array", "php_serialize"] as const;
export type SerializeOutputEncoderType = typeof _serializeOutputEncoderLists[number]
export const serializeOutputEncoderLists: SerializeOutputEncoderType[] = _serializeOutputEncoderLists as any;

// 消息提示
export type MessageType = "success" | "error" | "info"
export type MessageOption = { offset?: number, duration?: number }
export type MessageMethod = {
    closeAll: () => void
    success: (info: string, options?: MessageOption) => void
    error: (info: string, options?: MessageOption) => void,
    info: (info: string, options?: MessageOption) => void,
}



