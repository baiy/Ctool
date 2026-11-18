# Module: utilV6

**File:** `\packages\ctool-core\src\tools\ipcalc\utilV6.ts`

## Overview

Module `utilV6` contains 0 analyzed entities.

```
import ip6 from 'ip6';
import Serialize from "@/helper/serialize";

export default {
    normalize: (addr: string): string => {
        try {
            return addr !== "" ? ip6.normalize(addr) : ""
        } catch (e) {
            return $error(e)
        }
    },
    abbreviate: (addr: string): string => {
        try {
            return addr !== "" ? ip6.abbreviate(addr) : ""
        } catch (e) {
            return $error(e)
        }
    },
    validate: (addr: string): boolean => {
        ip6.validate(addr)
        return true
    },
    subnet: (addr: string, mask0 = 32, mask1 = 64, limit = 8, abbr = false, random = false): Serialize => {
        if (addr === "") {
            return Serialize.empty()
        }
        try {
            return Serialize.formObject(
                random ? ip6.randomSubnet(addr, mask0, mask1, limit, abbr) : ip6.divideSubnet(addr, mask0, mask1, limit, abbr)
            )
        } catch (e) {
            return Serialize.fromError($error(e))
        }
    },
    range: (addr: string, mask0 = 32, mask1 = 64, abbr = false): { start: string, end: string, size: BigInt } => {
        if (addr === "") {
            return {start: "", end: "", size: 0n}
        }
        try {
            return ip6.rangeBigInt(addr, mask0, mask1, abbr)
        } catch (e) {
            return {start: $error(e), end: $error(e), size: 0n}
        }
    },
    ptr: (addr: string, mask = 32): string => {
        if (addr === "") {
            return ""
        }
        try {
            return ip6.ptr(addr, mask)
        } catch (e) {
            return $error(e)
        }
    },
}
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
