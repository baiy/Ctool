export type {
    StorageDataStructureInterface,
    StorageDataStructure,
    StorageInterface,
    Storage,
    PlatformRuntime,
} from "./type"

import {
    _tools,
    ToolInterface as _ToolInterface,
    CategoryInterface as _CategoryInterface,
    FeatureInterface as _FeatureInterface,
    ToolType as _ToolType,
    FeatureType as _FeatureType,
    _categoryTool,
    _common,
    CategoryType as _CategoryType
} from "./config"
import Tool from "./tool"
import Feature from "./feature"
import Category from "./category"
import {mapValues} from "lodash"

export type ToolType = _ToolType
export type CategoryType = _CategoryType
export type FeatureType<T extends ToolType = ToolType> = _FeatureType<T>
export type ToolInterface<T extends ToolType = ToolType> = _ToolInterface<T>
export type CategoryInterface<T extends CategoryType = CategoryType> = _CategoryInterface<T>
export type FeatureInterface<T extends ToolType = ToolType> = _FeatureInterface<T>

// @ts-ignore
const toolContainer: { [key in ToolType]: ToolInterface<key> } = mapValues(_tools, (value, name) => {
    const tool = new Tool(name as ToolType)
    tool.parentDirectory = value.parent_directory
    for (let feature of value.feature) {
        new Feature(tool, feature as FeatureType)
    }
    return tool
})

// @ts-ignore
const categoryContainer: { [key in CategoryType]: CategoryInterface<key> } = mapValues(_categoryTool, (items, name) => {
    const category = new Category(name as CategoryType)
    for (let item of items) {
        category.addTool(toolContainer[item])
    }
    return category
})

export const tools: ToolInterface[] = Object.values(toolContainer)

export const categories: CategoryInterface[] = Object.values(categoryContainer)

export const commonTool = _common

export const toolExists = (name: string): name is ToolType => {
    return name !== "" && name in toolContainer
}

export const categoryExists = (name: string): name is CategoryType => {
    return name !== "" && name in categoryContainer
}

export const getTool = <T extends ToolType = ToolType>(name: T): ToolInterface<T> => {
    return toolContainer[name]
}

export const getCategory = <T extends CategoryType = CategoryType>(name: T): CategoryInterface<T> => {
    return categoryContainer[name]
}
