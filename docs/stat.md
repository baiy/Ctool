# Module: stat

**File:** `\packages\ctool-core\src\helper\stat.ts`

## Overview

Module `stat` contains 1 analyzed entities.

```
import {stringify} from "qs";
import {version} from "./util"
import {getCurrentLocale} from "@/i18n"
import platform from "./platform"
import {getUserUuid} from "@/store/user"

export const report = (data: Record<string, any> = {}) => {
    setTimeout(() => {
        try {
            let img = new Image(1, 1);
            img.src = 'https://www.baiy.org/chrome_tool/stat/?' + stringify({
                v: version,
                u: getUserUuid(),
                p: platform.name,
                l: getCurrentLocale(),
                r: Math.random(),
                ...data
            });
        } catch (e) {
        }
    }, 3000)
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `stat.report` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
