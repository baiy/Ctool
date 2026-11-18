# Module: utils

**File:** `\packages\ctool-core\src\tools\json\toObject\php\utils.ts`

## Overview

Module `utils` contains 3 analyzed entities.

```
import nameConvert from "@/helper/nameConvert"

export const indent = (string, level = 0, spaceCount = 4) => {
    let space = " ".repeat(spaceCount * level);
    return space + string;
}

export const camelCase = (str) => {
    return nameConvert(str).camelCase()
}

export const pascalCase = (str) => {
    return nameConvert(str).pascalCase()
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `utils.indent` | function | No description |
| `utils.camelCase` | function | No description |
| `utils.pascalCase` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
