# Module: runUtil

**File:** `\packages\ctool-core\src\tools\code\runUtil.ts`

## Overview

Module `runUtil` contains 5 analyzed entities.

```
import storage from "@/helper/storage"
import {axios} from '@/helper/proxy';
import {AxiosError} from 'axios';

type Language = {
    code: string,
    version: {
        name: string,
        value: string
    }[]
}
export const language: Language[] = [
    {
        "code": "java",
        "version": [
            {
                "name": "JDK 1.8.0_66",
                "value": "0"
            },
            {
                "name": "JDK 9.0.1",
                "value": "1"
            },
            {
                "name": "JDK 10.0.1",
                "value": "2"
            },
            {
                "name": "JDK 11.0.4",
                "value": "3"
            },
            {
                "name": "JDK 17.0.1",
                "value": "4"
            }
        ]
    },
    {
        "code": "c",
        "version": [
            {
                "name": "GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "Zapcc 5.0.0",
                "value": "1"
            },
            {
                "name": "GCC 7.2.0",
                "value": "2"
            },
            {
                "name": "GCC 8.1.0",
                "value": "3"
            },
            {
                "name": "GCC 9.1.0",
                "value": "4"
            },
            {
                "name": "GCC 11.1.0",
                "value": "5"
            }
        ]
    },
    {
        "code": "c99",
        "version": [
            {
                "name": "GCC 5.3.0",
                "value": "0"
            },
            {
                "name": "GCC 7.2.0",
                "value": "1"
            },
            {
                "name": "GCC 8.1.0",
                "value": "2"
            },
            {
                "name": "GCC 9.1.0",
                "value": "3"
            },
            {
                "name": "GCC 11.1.0",
                "value": "4"
            }
        ]
    },
    {
        "cod
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `runUtil.getLanguage` | function | No description |
| `runUtil.getConfig` | function | No description |
| `runUtil.getUsed` | function | No description |
| `runUtil.execute` | function | No description |
| `runUtil.setConfig` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
