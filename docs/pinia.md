# Module: pinia

**File:** `\packages\ctool-core\src\helper\pinia.ts`

## Overview

Module `pinia` contains 4 analyzed entities.

```
import storage from "./storage";
import {createPersistedState} from 'pinia-plugin-persistedstate'
import {createPinia, defineStore as piniaDefineStore} from 'pinia'
import {isArray} from 'lodash'

const EXPIRY_SEPARATOR = "_-expiry-_"
const VERSION_FLAG = "_version_flag_"

// 自定义持久化
class PiniaStorage implements Pick<Storage, 'getItem' | 'setItem'> {
    // 处理过期时间/版本号
    handleKey(_key: string): { k: string, e: number, v: boolean } {
        let isVersion = _key.includes(VERSION_FLAG);
        if (isVersion) {
            _key = _key.replace(VERSION_FLAG, "")
        }
        let [key, expiry] = _key.split(EXPIRY_SEPARATOR)
        return {
            k: key,
            e: parseInt(expiry),
            v: isVersion
        }
    }

    getItem(_key: string): any {
        let handle = this.handleKey(_key)
        return storage.get<any>(handle.k, null, handle.v)
    }

    setItem(_key: string, value: any): void {
        let handle = this.handleKey(_key)
        if (handle.v) {
            storage.set(handle.k, value, handle.e)
            return
        }
        storage.setNoVersion(handle.k, value, handle.e)
    }
}

const serializer = {
    serialize: (s: any) => s,
    deserialize: (s: any) => s
}

interface PersistOptions {
    key: string, // 缓存key
    expire?: number, // 过期时间 0
    paths?: string[] | undefined // 存储key数组 undefined
    isVersion?: boolean // 是否添加版本号 false
}

const persist = (_option: PersistOptions | PersistOptions[] = []) => {
    const option = (!isArray(_option) ? [_option] : _option).map((item) => {
        let config = {isVersion: false, paths: undefined, expire: 0, ...item}
        return {
            key: `${config.isVersion ? VERSION_FLAG : ""}${config.key}${EXPIRY_SEPARATOR}${config.expire}`,
            paths: config.paths
        }
    })
    return option.length == 1 ? option[0] : option
}

// pinia
export const pinia = createPinia().use(createPersistedState({storage: new PiniaStorage, serializer}))

// defineStore 默认
export
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `pinia.
    co` | function | No description |
| `pinia.    /**
   ` | function | No description |
| `pinia. implements ` | class | No description |
| `pinia.ng, // 缓存key
 ` | interface | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
