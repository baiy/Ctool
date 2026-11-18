# Module: plugin

**File:** `\packages\ctool-core\src\helper\plugin.ts`

## Overview

Module `plugin` contains 1 analyzed entities.

```
import {App, Plugin} from "vue";
import {$t} from "@/i18n";
import rowDirective from "@/directive/row";
import {copy} from "@/helper/clipboard"
import registerComponents from "@/components/register";
import {Locale} from "@/types";
import useSetting from "@/store/setting";
import {isError} from "lodash";
import Message from "./message"

const plugin: Plugin = {
    install(app: App) {
        // i18n
        app.config.globalProperties.$t = (key: string, values?: Record<string, any> | [], locale?: Locale) => {
            return $t(key, values, locale || useSetting().items.locale)
        }
        app.config.globalProperties.$copy = (text: string) => {
            copy(text, () => {
                Message.success($t('main_ui_copy_text_ok'))
            })
        }
        // 指令
        rowDirective(app)
        // 组件注册
        registerComponents(app)
    }
}

// @ts-ignore
window['$t'] = $t
// @ts-ignore
window['$copy'] = (text: string) => {
    copy(text, () => {
        Message.success($t('main_ui_copy_text_ok'))
    })
}
// @ts-ignore
window['$error'] = (err: any, isI18n = true) => {
    const error = `${isError(err) ? err.message : err.toString()}`
    return isI18n ? $t('main_ui_error', [error]) : error
}

declare module "vue" {
    interface ComponentCustomProperties {
        $t: (key: string, values?: Record<string, any> | [], Locale?: Locale) => string
        $copy: (data: string) => void
    }
}

export default plugin
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `plugin.tomProperties {
        $` | interface | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
