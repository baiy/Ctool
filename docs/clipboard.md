# Module: clipboard

**File:** `\packages\ctool-core\src\helper\clipboard.ts`

## Overview

Module `clipboard` contains 0 analyzed entities.

```
import platform from "./platform";
import { onUnmounted, ref } from "vue";

// 剪贴板权限
export let permission: PermissionState = "denied";

// 初始化剪贴板权限
export const initPermission = async () => {
    return new Promise(resolve => {
        if (platform.isUtools() || platform.isDesktop()) {
            permission = "granted";
            return resolve("");
        }

        // https://github.com/nolanlawson/pinafore/pull/618/files
        if (!navigator.permissions || !navigator.permissions.query) {
            return resolve("");
        }

        navigator.permissions
            //@ts-ignore
            .query({ name: "clipboard-read" })
            .then(result => {
                permission = result.state;
                resolve("");
            })
            .catch(() => {
                resolve("");
            });
    });
};

// 复制文本
export const copy = (data: string, successCallback?: () => void) => {
    try {
        if (data === "") {
            return;
        }
        navigator.clipboard.writeText(data).then(
            () => {
                successCallback && successCallback();
            },
            function (e) {
                console.log("copy failed", e);
            },
        );
    } catch (e) {
        console.log("copy error", e);
    }
};
// 获取剪贴板数据
export const paste = async (force: boolean = false): Promise<string> => {
    return new Promise(resolve => {
        try {
            if (!force && permission !== "granted") {
                return resolve("");
            }
            navigator.clipboard
                .readText()
                .then(text => {
                    return resolve(text ? text : "error");
                })
                .catch(e => {
                    console.error(e);
                    return resolve("");
                });
        } catch {
            resolve("");
        }
    });
};

export const copyImage = (imageBase64: string, successCallback?: () => void) => {
    if (imageBase6
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 7
- Authors: 2
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
