# Module: keyword

**File:** `\packages\ctool-config\src\generate\keyword.ts`

## Overview

Module `keyword` contains 1 analyzed entities.

```
import { localesReal, tools, ToolType, FeatureType } from "../index";
import { pinyin } from "pinyin-pro";
import { buildData, buildAddition } from "./fileSystem";
import { allLocales } from "./i18n";

type Item = { name: ToolType; feature: FeatureType; keyword: string[]; search: string[] };
export const buildKeywords = () => {
    let keywords: Item[] = [];
    tools.forEach(tool => {
        tool.features.forEach(feature => {
            const keywordItem: Item = {
                name: tool.name,
                feature: feature.name,
                keyword: [],
                search: [],
            };
            localesReal.forEach(code => {
                const locale = allLocales.detail[code];
                const items: string[] = [];

                items.push(
                    keywordItem.name,
                    keywordItem.feature,
                    locale[`tool_${keywordItem.name}`].message, // 工具名称
                    locale[`tool_${keywordItem.name}_${keywordItem.feature}`].message, // 功能名称
                    ...locale[`tool_${keywordItem.name}_${keywordItem.feature}_keywords`].message.split(","), // 功能关键字
                );
                keywordItem.keyword.push(...items);
                items.push(
                    ...locale[`tool_${keywordItem.name}_${keywordItem.feature}_keywords`].message
                        .replaceAll(" ", "")
                        .split(","), // 功能关键字(移除空格)
                );
                keywordItem.search.push(...items);

                // 获取拼音
                if (code === "zh_CN") {
                    items.forEach(item => {
                        if (/[\u4e00-\u9fa5]/.test(item)) {
                            keywordItem.search.push(
                                pinyin(item, { toneType: "none", type: "array", v: true }).join(""),
                            ); // 全拼
                            keywordItem.search.push(
                                pinyin(item, { pattern: "first", toneTy
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `keyword.buildKeywords` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
