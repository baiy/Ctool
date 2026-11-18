# Module: json

**File:** `\packages\ctool-core\src\tools\code\formatter\json.ts`

## Overview

Module `json` contains 0 analyzed entities.

```
import { format } from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import Base from "./base";
import jsonMinify from "./jsonMinify";

export const formatter = new (class extends Base<"json"> {
    async beautify(): Promise<string> {
        return format(this.code, {
            parser: "json5",
            plugins: [babel, estree],
            quoteProps: "preserve",
            trailingComma: "none",
            tabWidth: this.getOptionValue("tab", 4),
            printWidth: 1,
        });
    }

    async compress(): Promise<string> {
        return jsonMinify(this.code);
    }
});

```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
