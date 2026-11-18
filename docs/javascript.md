# Module: javascript

**File:** `\packages\ctool-core\src\tools\code\formatter\javascript.ts`

## Overview

Module `javascript` contains 0 analyzed entities.

```
import Base from "./base";
import UglifyJS from "uglify-js-export";
import { format } from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";

export const formatter = new (class extends Base<"javascript"> {
    async beautify(): Promise<string> {
        return format(this.code, {
            plugins: [babel, estree],
            parser: "babel",
            tabWidth: this.getOptionValue("tab", 4),

        });
    }

    async compress(): Promise<string> {
        let result = UglifyJS.minify(this.code, {
            keep_fnames: true,
            compress: false,
            mangle: false,
            output: {
                beautify: false,
            },
        });
        if (!("code" in result) || !result.code) {
            throw new Error(JSON.stringify(result.error));
        }
        return result.code;
    }
});
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
