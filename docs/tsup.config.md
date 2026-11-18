# Module: tsup.config

**File:** `\packages\ctool-config\tsup.config.ts`

## Overview

Module `tsup.config` contains 0 analyzed entities.

```
import {defineConfig} from "tsup";

export default defineConfig({
    entry: ["./src/index.ts", "./src/generate.ts"],
    outDir: "./dist/",
    legacyOutput: true,
    format: ["cjs", "esm"],
    platform: "node",
    target: "node16",
    splitting: false,
    dts: true,
    clean: true,
});
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
