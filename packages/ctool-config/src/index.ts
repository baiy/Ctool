import {
    _tools,
    ToolInterface as _ToolInterface,
    CategoryInterface as _CategoryInterface,
    FeatureInterface as _FeatureInterface,
    ToolType as _ToolType,
    FeatureType as _FeatureType,
    _categoryTool,
    _common,
    CategoryType as _CategoryType,
} from "./config";
import Tool from "./tool";
import Feature from "./feature";
import Category from "./category";
import { mapValues } from "lodash";

export type ToolType = _ToolType
export type CategoryType = _CategoryType
export type FeatureType<T extends ToolType = ToolType> = _FeatureType<T>
export type ToolInterface<T extends ToolType = ToolType> = _ToolInterface<T>
export type CategoryInterface<T extends CategoryType = CategoryType> = _CategoryInterface<T>
export type FeatureInterface<T extends ToolType = ToolType> = _FeatureInterface<T>

// @ts-ignore
const toolContainer: { [key in ToolType]: ToolInterface<key> } = mapValues(_tools, (value, name) => {
    const tool = new Tool(name as ToolType);
    tool.parentDirectory = value.parent_directory;
    for (let feature of value.feature) {
        new Feature(tool, feature as FeatureType);
    }
    return tool;
});

// @ts-ignore
const categoryContainer: { [key in CategoryType]: CategoryInterface<key> } = mapValues(_categoryTool, (items, name) => {
    const category = new Category(name as CategoryType);
    for (let item of items) {
        category.addTool(toolContainer[item]);
    }
    return category;
});

export const tools: ToolInterface[] = Object.values(toolContainer);

export const categories: CategoryInterface[] = Object.values(categoryContainer);

export const commonTool = _common;

export const toolExists = (name: string): name is ToolType => {
    return name !== "" && name in toolContainer;
};

export const categoryExists = (name: string): name is CategoryType => {
    return name !== "" && name in categoryContainer;
};

export const getTool = <T extends ToolType = ToolType>(name: T): ToolInterface<T> => {
    return toolContainer[name];
};

export const getCategory = <T extends CategoryType = CategoryType>(name: T): CategoryInterface<T> => {
    return categoryContainer[name];
};

// 存储
export interface StorageDataStructureInterface<T = any> {
    v: T,
    u: string,
    e: number,
    es: string
}

export type StorageDataStructure<T = any> = StorageDataStructureInterface<T> | null

export interface StorageInterface {
    get<T = any>(key: string): StorageDataStructure<T>;

    set<T = any>(key: string, value: StorageDataStructureInterface<T>): void;

    remove(key: string): void;

    clear(): void;

    getAllKey(): string[];
}

export type Storage = {
    get<T = any>(key: string, def: T | null, isVersion: boolean | null): T | null
    set<T = any>(key: string, value: T, expiry: number, isVersion: boolean): void
    setNoVersion<T = any>(key: string, value: T, expiry: number): void
}

// 平台入口初始化对象
export type Initializer = {
    // 存储对象
    storage(): Storage,
    // 路由跳转
    push(path: string, query?: Record<string, string | number>): void
}

// 平台
export interface PlatformRuntime {
    is(): boolean

    name: string

    openUrl(url: string): any,

    storage?: () => StorageInterface

    getLocale?: () => string

    initialize?: (initializer: Initializer) => void

    // 是否开启 web同源策略(跨域) 默认为不开启
    webSecurity?: () => boolean
}

// 多语言
export const localesReal = ["zh_CN", "en"] as const;
export type LocaleLists = typeof localesReal[number];
export const locales = ["_default", ...localesReal] as const;
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

// 显示主题
export const themes = ["light", "dark", "auto"] as const;
export type ThemeType = typeof themes[number];
export type ThemeRawType = Exclude<ThemeType, "auto">;

// 代理配置
export { default as proxy } from "./proxy";
