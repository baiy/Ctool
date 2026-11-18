# Module: helper

**File:** `\packages\ctool-site\src\helper.ts`

## Overview

Module `helper` contains 2 analyzed entities.

```
import i18n from "./locale.json";
import { ref } from "vue";
import { i18n as coreI18n, keywords as allKeywords } from "../../ctool-core/public/ctool.addition.json";
import {
    Locale,
    ThemeType,
    toolExists,
    ToolType,
    FeatureInterface,
    getTool,
    commonTool,
    FeatureType,
} from "ctool-config";

const settingKey = "ctool.nv_setting";
const operateKey = "ctool.nv_operate";
const browserLocale = navigator.language;
const defaultLocale =
    browserLocale === "zh" || browserLocale.indexOf("zh-") === 0 || browserLocale.indexOf("zh_") === 0 ? "zh_CN" : "en";
const secondLocale = defaultLocale === "zh_CN" ? "en" : "zh_CN";

export const getSetting = (): { v: { items: { locale: Locale; theme: ThemeType } } } => {
    return JSON.parse(localStorage.getItem(settingKey) || `{"e":0,"v":{"items":{"locale":"_default","theme":"auto"}}}`);
};
let settingInstance: any = undefined;
export const useSetting = () => {
    const handle = () => {
        const setting = getSetting();
        const locale = ref(setting.v.items.locale);
        const theme = ref(setting.v.items.theme);
        const update = (key: "locale" | "theme") => {
            if (key === "locale") {
                locale.value = locale.value === secondLocale ? defaultLocale : secondLocale;
                document.getElementsByTagName("html")[0].dataset.locale = locale.value;
            }
            if (key === "theme") {
                let _theme = theme.value;
                if (theme.value === "auto") {
                    _theme =
                        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light";
                }
                theme.value = _theme === "dark" ? "light" : "dark";
            }
            const localStorageSetting = getSetting();
            localStorageSetting.v.items.locale = locale.value;
            localStorageSetting.v.items.theme = theme.value;

```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `helper.openUrl` | function | No description |
| `helper.optionMap` | function | No description |

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
