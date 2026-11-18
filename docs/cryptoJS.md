# Module: cryptoJS

**File:** `\packages\ctool-core\src\tools\encrypt\cryptoJS.ts`

## Overview

Module `cryptoJS` contains 1 analyzed entities.

```
import CryptoJS from "crypto-js";
import { padEnd } from "lodash";

export const modeMap = {
    ECB: CryptoJS.mode.ECB,
    CBC: CryptoJS.mode.CBC,
    CTR: CryptoJS.mode.CTR,
    OFB: CryptoJS.mode.OFB,
    CFB: CryptoJS.mode.CFB,
};

export type ModeType = keyof typeof modeMap;
export const modeLists = Object.keys(modeMap) as ModeType[];

export const paddingMap = {
    Pkcs7: CryptoJS.pad.Pkcs7,
    Iso97971: CryptoJS.pad.Iso97971,
    AnsiX923: CryptoJS.pad.AnsiX923,
    Iso10126: CryptoJS.pad.Iso10126,
    ZeroPadding: CryptoJS.pad.ZeroPadding,
    NoPadding: CryptoJS.pad.NoPadding,
};
export type PaddingType = keyof typeof paddingMap;
export const paddingLists = Object.keys(paddingMap) as PaddingType[];

export const keySizeMap = {
    "128": 128,
    "192": 192,
    "256": 256,
};
export type KeySizeType = keyof typeof keySizeMap;
export const keySizeLists = Object.keys(keySizeMap) as KeySizeType[];

export type Option = {
    key: string;
    iv?: string;
    mode?: ModeType;
    key_size?: KeySizeType;
    padding?: PaddingType;
    fill?: boolean;
    type?: "simple" | "advanced";
};
// 秘钥处理
const secretHandle = (name: string, secret = "", length: number = 0, fill = true) => {
    if (!fill && secret.length === 0) {
        throw new Error(`[${name}] required`);
    }
    if (length === 0 || secret.length === length) {
        return CryptoJS.enc.Utf8.parse(secret);
    }
    // 长度截取
    if (secret.length > length) {
        return CryptoJS.enc.Utf8.parse(secret.substring(0, length));
    }

    // 不使用填充报错
    if (!fill) {
        throw new Error(`[${name}] length !== ${length}`);
    }
    // 内容填充
    return CryptoJS.enc.Utf8.parse(padEnd(secret, length, "\0"));
};

// aes
export const aes = {
    encrypt: (
        input: string,
        { key, iv = "", mode = "CBC", key_size = "128", padding = "Pkcs7", type = "simple", fill = true }: Option,
    ) => {
        if (type === "simple") {
            return CryptoJS.AES.encrypt(CryptoJS.enc.Base64.parse(in
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `cryptoJS.ndle = (name` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
