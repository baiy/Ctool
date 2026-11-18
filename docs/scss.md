# Module: scss

**File:** `\packages\ctool-core\src\tools\code\formatter\scss.ts`

## Overview

Module `scss` contains 0 analyzed entities.

```
import prettier from "prettier/standalone";
import css from "prettier/plugins/postcss";
import Base from "./base";

export const formatter = new (class extends Base<'scss'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [css],
            parser: "scss",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }
})
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
