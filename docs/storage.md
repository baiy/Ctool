# Module: storage

**File:** `\packages\ctool-core\src\helper\storage.ts`

## Overview

Module `storage` contains 2 analyzed entities.

```
import {StorageInterface, StorageDataStructureInterface, StorageDataStructure} from '@/types'
import {version} from './util'
import platform from './platform'
import {isObject} from "lodash";
import {isProxy, toRaw, unref} from "vue";
import dayjs from "dayjs";

const cacheVersion = version.split('.').join('');
const timestamp = () => {
    return dayjs().unix()
}

const addKeyVersion = (key: string, is: boolean = true): string => `${is ? `v_${cacheVersion}_` : 'nv_'}${key}`

const encode = <T>(value: T, expiry: number = 0): StorageDataStructureInterface<T> => {
    expiry = expiry ? expiry + timestamp() : 0
    value = unref(value)
    return {
        v: isProxy(value) ? toRaw(value) : value,
        u: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        e: expiry,
        es: expiry ? dayjs(expiry * 1000).format('YYYY-MM-DD HH:mm:ss') : "",
    }
}

const decode = <T>(data: StorageDataStructure<T>): StorageDataStructure<T> => {
    if (
        !data
        || !isObject(data)
        || !("v" in data)
        || !("e" in data)
    ) {
        return null;
    }
    return data
}

class StorageObject {
    private readonly _handle: StorageInterface;

    constructor(handle: StorageInterface) {
        this._handle = handle;
    }

    get handle(): StorageInterface {
        return this._handle;
    }

    get<T>(key: string, def: T | null = null, isVersion: boolean | null = null): T | null {
        let data: StorageDataStructure<T>;
        // 自动判断有无版本号
        if (isVersion === null) {
            // 默认获取有版本号数据
            data = decode<T>(this._handle.get<T>(addKeyVersion(key)))
            if (data === null) {
                // 获取无版本数据
                data = decode<T>(this._handle.get<T>(addKeyVersion(key, false)))
            }
        }
        // 强制指定有无版本号
        else {
            data = decode<T>(this._handle.get<T>(addKeyVersion(key, isVersion)))
        }

        // 不存在/过期
        if (data === null || (data.e !== 0 && data.e < timestamp())) {
          
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `storage.keyName` | function | No description |
| `storage.storage` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
