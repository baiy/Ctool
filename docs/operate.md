# Module: operate

**File:** `\packages\ctool-core\src\store\operate.ts`

## Overview

Module `operate` contains 6 analyzed entities.

```
// 页面操作
import {defineStore} from '@/helper/pinia'
import {reactive} from 'vue';
import {getTool, ToolType, toolExists, categoryExists, tools, getCategory} from "@/config";
import {useRouter} from "vue-router";
import event from "@/event";

interface Types {
    // 最后使用工具
    tool: string
    // 最后使用功能
    feature: string,
    // 最后访问分类
    category: string
    // 分类最后访问工具
    category_last_tool: Record<string, string>
    // 工具最后访问功能
    tool_last_feature: Record<string, string>
    // 最近访问功能列表
    recently: string[]
}

const defaultValue: Types = {
    tool: '',
    category: '',
    feature: '',
    category_last_tool: {},
    tool_last_feature: {},
    recently: []
}

export default defineStore(
    'operate',
    () => {
        const items = reactive<Types>(defaultValue)
        const router = useRouter()

        // 跳转
        const redirectTool = (_tool: string = "", _feature: string = "", _category: string = "", history: string | number = "", keyword: string = "") => {
            const tool = getTool(toolExists(_tool) ? _tool : tools[0].name)
            const category = getCategory(tool.inCategory(_category) ? _category : tool.firstCategory().name)
            const feature = tool.getFeature(tool.existFeature(_feature) ? _feature : tool.firstFeature().name)
            const query: Record<string, any> = {}
            if (history !== "") {
                query['history'] = history
            }
            if (keyword !== "") {
                query['keyword'] = keyword
            }
            event.dispatch('extend_page_close')
            return router.push(
                {
                    path: feature.getRouter(),
                    query: feature.getQuery(category.name, query)
                }
            )
        }
        // 访问
        const access = (_tool: string, _feature: string, _category: string): boolean => {
            if (!toolExists(_tool) || !categoryExists(_category)) {
                return false
            }
           
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `operate.ng | number ` | function | No description |
| `operate.ry(category).existT` | function | No description |
| `operate.            if ((t` | function | No description |
| `operate. getTool(to` | function | No description |
| `operate.sts(_t` | function | No description |
| `operate.    /` | interface | No description |

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 2
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
