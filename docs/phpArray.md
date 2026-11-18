# Module: phpArray

**File:** `\packages\ctool-core\src\helper\serialize\phpArray.ts`

## Overview

Module `phpArray` contains 1 analyzed entities.

```
// 算法来源
// https://www.npmjs.com/package/phparr
// 添加 BigInt 类型支持
import {isArray, isBoolean, isNull, isNumber, isObject, isString} from "lodash"

export const stringify = (data) => {
    const space = " ".repeat(4);
    const indent = function (item) {
        return item.split('\n').map(line => `${space}${line}`).join('\n');
    };
    switch (true) {
        case isNumber(data):
        case isString(data):
        case isBoolean(data):
        case isNull(data):
            return JSON.stringify(data);
        case isArray(data):
            return [
                space ? '[\n' : '[',
                data.map(item => stringify(item)).map(indent).join(space ? ',\n' : ','),
                space ? '\n]' : ']'
            ].join("")
        case isObject(data): {
            let items: string[] = [];
            for (let k in data) {
                items.push(JSON.stringify(k) + (space ? ' => ' : '=>') + stringify(data[k]))
            }
            return (space ? '[\n' : '[') + items.map(indent).join(space ? ',\n' : ',') + (space ? '\n]' : ']')
        }
        case typeof data === 'bigint': {
            return (data as BigInt).toString()
        }
        default:
            throw new Error('parse error');
    }
}

export default {
    stringify: (data) => `<?php\n    return ${stringify(data)};`
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `phpArray.> {
    c` | function | No description |

## Git History

- Commits: 2
- Authors: 2
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
