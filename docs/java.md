# Module: java

**File:** `\packages\ctool-core\src\tools\code\formatter\java.ts`

## Overview

Module `java` contains 0 analyzed entities.

```
import prettier from "prettier/standalone";
import javaPlugin from "prettier-plugin-java";
import Base from "./base";

export const formatter = new (class extends Base<'java'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [javaPlugin],
            parser: "java",
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

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
