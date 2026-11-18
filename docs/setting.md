# Module: setting

**File:** `\packages\ctool-core\src\store\setting.ts`

## Overview

Module `setting` contains 0 analyzed entities.

```
// 设置
import {defineStore} from '@/helper/pinia'
import {Locale, ThemeType, ThemeRawType} from "@/types"
import {commonTool, ToolType} from "@/config"
import {proxy} from "ctool-config"
import {onMounted, watch, onUnmounted, nextTick} from 'vue';
import {setCurrentLocale} from '@/i18n';
import event from "@/event";

interface Setting {
    // 常用工具
    common: ToolType[],
    // 语言
    locale: Locale,
    // 主题
    theme: ThemeType,
    // 自动读取剪贴板
    auto_read_copy: boolean,
    // 读取剪贴板内容过滤首尾不可见字符
    auto_read_copy_filter: boolean,
    // 自动复制结果到剪贴板
    auto_save_copy: boolean,
    // 布局
    layout: "complex" | "simple",
    // 代理是否启用
    proxy_enable: boolean,
    // 代理地址
    proxy_url: string,
    // 自动填充历史过期时间
    fill_history_expire: number,
    // 历史记录角标隐藏
    history_icon_badge_hidden: boolean,
}

const getSystemTheme = (): ThemeRawType => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark"
    }
    return "light"
}

const defaultValue: Setting = {
    auto_read_copy: false,
    auto_read_copy_filter: false,
    auto_save_copy: true,
    locale: "_default",
    theme: "auto",
    common: [...commonTool],
    layout: "complex",
    proxy_enable: false,
    proxy_url: proxy.defaultProxyUrl,
    fill_history_expire: 3600,
    history_icon_badge_hidden: false,
}

const useSetting = defineStore('setting', () => {
    const items = $ref<Setting>(defaultValue)

    // 保存
    const save = <K extends keyof Setting>(key: K, value: Setting[K]) => {
        if (key === 'common' && (value as string[]).length < 1) {
            items['common'] = [...new Set(commonTool)]
            return;
        }
        items[key] = value
    }

    // 语言切换
    watch(() => items.locale, () => setCurrentLocale(items.locale))

    // 主题切换
    watch(() => items.theme, (theme) => {
        event.dispatch("theme_change", theme)
    })

    onMounted(() => {
        event.addListener('locale_change', async () => {
            aw
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 8
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
