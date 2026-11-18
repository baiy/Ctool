# Module: unserialize

**File:** `\packages\ctool-core\src\helper\serialize\phpSerialize\unserialize.ts`

## Overview

Module `unserialize` contains 14 analyzed entities.

```
// @ts-nocheck
/**
 * @see https://github.com/locutusjs/locutus/blob/master/src/php/var/unserialize.js
 * support bigint
 */
function initCache() {
    const store = []
    // cache only first element, second is length to jump ahead for the parser
    const cache = function cache(value) {
        store.push(value[0])
        return value
    }

    cache.get = (index) => {
        if (index >= store.length) {
            throw RangeError(`Can't resolve reference ${index + 1}`)
        }

        return store[index]
    }

    return cache
}

function expectType(str, cache) {
    const types = /^(?:N(?=;)|[bidsSaOCrR](?=:)|[^:]+(?=:))/g
    const type = (types.exec(str) || [])[0]

    if (!type) {
        throw SyntaxError('Invalid input: ' + str)
    }
    switch (type) {
        case 'N':
            return cache([null, 2])
        case 'b':
            return cache(expectBool(str))
        case 'i':
            return cache(expectInt(str))
        case 'd':
            return cache(expectFloat(str))
        case 's':
            return cache(expectString(str))
        case 'S':
            return cache(expectEscapedString(str))
        case 'a':
            return expectArray(str, cache)
        case 'O':
            return expectObject(str, cache)
        case 'C':
            return expectClass(str, cache)
        case 'r':
        case 'R':
            return expectReference(str, cache)
        default:
            throw SyntaxError(`Invalid or unsupported data type: ${type}`)
    }
}

function expectBool(str) {
    const reBool = /^b:([01]);/
    const [match, boolMatch] = reBool.exec(str) || []

    if (!boolMatch) {
        throw SyntaxError('Invalid bool value, expected 0 or 1')
    }

    return [boolMatch === '1', match.length]
}

function expectInt(str) {
    const reInt = /^i:([+-]?\d+);/
    const [match, intMatch] = reInt.exec(str) || []

    if (!intMatch) {
        throw SyntaxError('Expected an integer value')
    }
    const value = parseInt(intMa
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `unserialize.expectClass` | function | No description |
| `unserialize.expectArrayItems` | function | No description |
| `unserialize.initCache` | function | No description |
| `unserialize.expectBool` | function | No description |
| `unserialize.expectInt` | function | No description |
| `unserialize.expectType` | function | No description |
| `unserialize.expectFloat` | function | No description |
| `unserialize.readBytes` | function | No description |
| `unserialize.expectString` | function | No description |
| `unserialize.expectEscapedString` | function | No description |
| `unserialize.expectKeyOrIndex` | function | No description |
| `unserialize.expectObject` | function | No description |
| `unserialize.expectArray` | function | No description |
| `unserialize.expectReference` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
