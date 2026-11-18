# Module: index

**File:** `\packages\ctool-site\src\index.ts`

## Overview

Module `index` contains 9 analyzed entities.

```
import {createApp} from 'vue'
import '@/statics/style.css'
import App from './Index.vue'
import {initTheme, isToToolIndex} from './helper'

(() => {
    if (isToToolIndex()) {
        return window.location.href = "/tool.html"
    }
    initTheme()
    createApp(App).mount('#app')
})()
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `index.getPath` | function | No description |
| `index.copyCoreDist` | function | No description |
| `index.release` | function | No description |
| `index.getCoreDistPath` | function | No description |
| `index.getReleasePath` | function | No description |
| `index.replaceFileContent` | function | No description |
| `index.getRootPackageJson` | function | No description |
| `index.getAdditionData` | function | No description |
| `index.version` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
