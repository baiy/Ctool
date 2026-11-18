# Module: types

**File:** `\packages\ctool-core\src\types.ts`

## Overview

Module `types` contains 3 analyzed entities.

```
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
export type AlignDirection = "horizontal" | "v
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `types.OptionMap` | interface | No description |
| `types.Config` | interface | No description |
| `types.Format` | interface | No description |

## Git History

- Commits: 10
- Authors: 1
- Bug fixes: 2
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
