# Module: release

**File:** `\packages\ctool-adapter\web\src\release.ts`

## Overview

Module `release` contains 0 analyzed entities.

```
import {copyCoreDist, release} from "ctool-adapter-base";
import {mkdirSync, rmSync} from "fs";
import {join} from "path";

(async () => {
    const tempPath = join(__dirname, '../_temp')
    rmSync(tempPath, {recursive: true, force: true});
    mkdirSync(tempPath);
    // 核心文件
    copyCoreDist(tempPath)
    // 发布
    console.info(`web: ${await release(tempPath, 'web')}`)
    // 移除临时目录
    rmSync(tempPath, {recursive: true, force: true});
})()
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
