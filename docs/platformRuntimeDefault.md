# Module: platformRuntimeDefault

**File:** `\packages\ctool-core\src\helper\platform\platformRuntimeDefault.ts`

## Overview

Module `platformRuntimeDefault` contains 0 analyzed entities.

```
import {PlatformRuntime} from "ctool-config";
import storage from "./storage";

export const runtime = new (class implements PlatformRuntime {
    name = "web"

    webSecurity() {
        return true
    }

    is() {
        return true
    }

    openUrl(url: string) {
        return window.open(url);
    }

    getLocale() {
        return navigator.language
    }

    storage() {
        return storage
    }

})
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
