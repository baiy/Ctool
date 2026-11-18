# Module: type

**File:** `\packages\ctool-core\src\tools\json\toObject\type.ts`

## Overview

Module `type` contains 0 analyzed entities.

```
export type Option = {
    description: string,
    name: string
    type: "string" | "select" | "boolean"
    value?: any,
    defaultValue: any
}

export interface Transform {
    getLanguages(): string[]

    getOptionDefine(lang: string): Option[]

    execute(lang: string, input: string, options: Record<string, any>): Promise<string>
}
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
