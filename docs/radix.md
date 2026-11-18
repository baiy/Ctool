# Module: radix

**File:** `\packages\ctool-core\src\helper\radix.ts`

## Overview

Module `radix` contains 0 analyzed entities.

```
import BigNumber from "bignumber.js";

export const defaultAlphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@"

export default (base: string | number, source: number, target: number, alphabet: string = "") => {
    alphabet = alphabet || defaultAlphabet

    const BN = BigNumber.clone({ALPHABET: alphabet,EXPONENTIAL_AT: 1e+9})
    return (new BN(base, source)).toString(target);
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
