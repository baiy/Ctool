# Module: history

**File:** `\packages\ctool-core\src\helper\history.ts`

## Overview

Module `history` contains 0 analyzed entities.

```
import storage from "@/helper/storage"
import {HistoryItemStructure} from "@/types"
import event from "@/event"
import {toolExists, getTool} from "@/config"
import dayjs from "dayjs"
import {cloneDeep, isEqual} from "lodash";

// 工具缓存数据过期时间(秒)
const TOOL_DATA_EXPIRY: number = 3600 * 24 * 7
// 最大历史条数
const HISTORY_MAX_LENGTH: number = 50
// 历史数据最大长度
const HISTORY_MAX_SIZE: number = 200 * 1024

class History<T = any> {
    lists: HistoryItemStructure<T>[] = []
    name: string
    static instance: Record<string, History> = {};

    static itemFactory<T>(item: T): HistoryItemStructure<T> {
        return {
            t: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            v: item
        }
    }

    static change() {
        event.dispatch('history_change')
    }

    static repository<T = any>(name:string): History<T> {
        if (!(name in History.instance)) {
            History.instance[name] = new History<T>(name)
        }
        return History.instance[name]
    }

    constructor(name: string) {
        this.name = name
        this.lists = storage.get<HistoryItemStructure<T>[]>(this.cacheName(), [], true) || []
    }

    cacheName() {
        return `tool_history_${this.name}`
    }

    // 插入
    push(_item: T): void {
        const item: T = cloneDeep(_item)
        // 过滤超大数据
        const itemLength = JSON.stringify(item).length;
        if (itemLength > HISTORY_MAX_SIZE) {
            console.log(`skip data too big:${itemLength} > ${HISTORY_MAX_SIZE}`)
            return;
        }

        // 与最新一致过滤
        if (
            this.lists.length > 0
            && isEqual(this.lists[0].v, item)
        ) {
            console.log("skip latest")
            return;
        }

        // 删除已有
        for (let i = 0; i < this.lists.length; i++) {
            if (isEqual(this.lists[i].v, item)) {
                this.lists.splice(i, 1)
            }
        }

        // 插入
        this.lists.unshift(History.itemFactory(item))

        // 删除多余
        if (thi
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
