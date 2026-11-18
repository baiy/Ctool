# Module: less

**File:** `\packages\ctool-core\src\tools\code\formatter\less.ts`

## Overview

Module `less` contains 0 analyzed entities.

```
import prettier from "prettier/standalone";
import css from "prettier/plugins/postcss";
import Base from "./base";

export const formatter = new (class extends Base<'less'> {

    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [css],
            parser: "less",
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
