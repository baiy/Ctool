# Module: action

**File:** `\packages\ctool-core\src\store\action.ts`

## Overview

Module `action` contains 7 analyzed entities.

```
// 工具操作
import { reactive, toRaw } from "vue";
import dayjs from "dayjs";
import { instanceOfInput, instanceOfHistorySerializable } from "@/helper/util";
import { paste, copy as copyText, copyImage } from "@/helper/clipboard";
import useOperate from "@/store/operate";
import getHistoryInstance from "@/helper/history";
import useSetting from "@/store/setting";
import { useRoute } from "vue-router";
import { debounce, cloneDeep, isNumber, toNumber, mergeWith, isObject, isString, merge } from "lodash";
import { MessageType } from "@/types";
import { objectInObject } from "@/helper/util";
import Message from "@/helper/message";
import storage from "@/helper/storage";

type Success = {
    message?: string,
    message_type?: MessageType,
    copy_text?: string,
    copy_image?: string,
    is_save?: boolean
}

type InitializeReturn<T extends Record<string, any> = {}> = {
    items: T,
    field: string
}

// initialize option
type initializeOption = {
    // 主要输入字段 可以接受剪贴板数据
    input?: string,
    // 剪贴板校验函数
    paste?: ((str: string) => boolean) | false,
    //
    /**
     * 搜索关键字处理函数
     * 返回 `!false` 时 做如下操作
     * 1. 使用返回值覆盖 `defaultItems` 中对应值
     * 2. 使用返回值过滤历史数据
     */
    keyword?: (keyword: string) => Record<string, any> | false
}
/**
 * 初始化页面数据
 * 自动解析输入 优先级从高到低
 * * 固定输入: storage:_temp_input_storage | url?input=value
 * * 强制历史数据: url?history = index
 * * 剪贴板数据 || 最新历史数据 根据配置`fill_history_expire`确定
 * * 默认数据
 *
 * 固定输入/剪贴板数据 inputField != ""
 * @param defaultItems 默认数据
 * @param {initializeOption} option
 */
export const initialize = async <T extends Record<string, any>>(
    defaultItems: T,
    {
        input: inputField = "input",
        keyword: keywordCheck = (_keyword: string) => false,
        paste: pasteCheck = (_str: string) => true,
    }: initializeOption = {},
) => {
    const storeOperate = useOperate();
    const history = getHistoryInstance<T>(storeOperate.items.tool, storeOperate.items.feature);
    const route = useRoute();
    const s
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `action.
) => {
  ` | function | No description |
| `action. field` | function | No description |
| `action.d === "") {` | function | No description |
| `action.aw(cur` | function | No description |
| `action.OfHistory` | function | No description |
| `action.    ` | function | No description |
| `action.ing.ite` | function | No description |

## Git History

- Commits: 8
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
