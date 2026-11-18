# Module: html

**File:** `\packages\ctool-core\src\tools\code\formatter\html.ts`

## Overview

Module `html` contains 0 analyzed entities.

```
import prettier from "prettier/standalone";
import html from "prettier/plugins/html";
import Base from "./base";

import { minify } from "html-minifier-terser";

export const formatter = new (class extends Base<'html'> {
    async beautify(): Promise<string> {
        return prettier.format(this.code, {
            plugins: [html],
            parser: "html",
            tabWidth: this.getOptionValue('tab', 4)
        });
    }

    async compress(): Promise<string> {
        return minify(this.code,{
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            collapseBooleanAttributes: true,
            useShortDoctype: true,
        })
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
