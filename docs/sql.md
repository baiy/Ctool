# Module: sql

**File:** `\packages\ctool-core\src\tools\code\formatter\sql.ts`

## Overview

Module `sql` contains 0 analyzed entities.

```
import {format} from 'sql-formatter';
import Base from "./base";

export const formatter = new (class extends Base<'sql'> {
    async beautify(): Promise<string> {
        return format(this.code, {
            language: this.option?.language || "sql",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }

    async compress(): Promise<string> {
        return this.code.replace(/\s+/g, " ").replace(/\s+\(/, "(").replace(/\s+\)/, ")")
    }
})
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
