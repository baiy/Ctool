# Module: utilV4

**File:** `\packages\ctool-core\src\tools\ipcalc\utilV4.ts`

## Overview

Module `utilV4` contains 3 analyzed entities.

```
import {ip2long, long2ip, Netmask} from "netmask"
import convert from "@/helper/radix";

const tryBinaryToDecimal = (ip:string) => {
    if (ip.includes('.') && ip.substring(0, 2).toUpperCase() === "0B") {
        return ipConvert(ip, 10, 2, '0b')
    }
    return ip
}

export const ipConvert = (ip: string, toRadix = 10, fromRadix = 10, filterPrefix = "") => {
    return ip.split('.').map((item) => {
        // 移除前缀
        if (
            filterPrefix
            && item.length > filterPrefix.length
            && item.substring(0, filterPrefix.length).toUpperCase() === filterPrefix.toUpperCase()
        ) {
            item = item.substring(filterPrefix.length)
        }
        // 移除补零
        item = item.replace(/\b(0+)/gi, "") || "0"
        if (toRadix === fromRadix) {
            return `${item}`;
        }

        return `${convert(item, fromRadix, toRadix).padStart(toRadix === 2 ? 8 : (toRadix === 8 ? 4 : 2), '0').toUpperCase()}`
    }).join('.')
}

export const getMaskBitByAvailable = (available: number) => {
    if (isNaN(available) || available > 0xfffffffe || available < 1) {
        throw new Error(`Available Size Invalid`)
    }
    let bitSize = parseInt(`${Math.log(available) / Math.log(2)}`) + 1;
    if ((Math.pow(2, bitSize) - available) < 2) {
        bitSize += 1;
    }
    return 32 - bitSize

}

export default class {
    netmask: Netmask
    ip = ""

    constructor(
        ipAddr = "192.168.0.1" // lang/点分[10/8/16]进制
        , maskAddr = "24" // 位数/lang/点分[10/8/16]进制
    ) {
        // mask long
        if (!`${maskAddr}`.includes('.') && parseInt(`${maskAddr}`, 10) > 32) {
            maskAddr = long2ip(parseInt(`${maskAddr}`, 10))
        }

        // ip/mask 支持二进制
        ipAddr = tryBinaryToDecimal(ipAddr)
        maskAddr = tryBinaryToDecimal(maskAddr)

        this.netmask = new Netmask(`${ipAddr}/${maskAddr}`)
        this.ip = `${long2ip(ip2long(ipAddr))}`
    }

    // 可用地址
    available() {
        return Math.max(this.netmask.
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `utilV4.tryBinaryToDecimal` | function | No description |
| `utilV4.ipConvert` | function | No description |
| `utilV4.lable = (available: n` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
