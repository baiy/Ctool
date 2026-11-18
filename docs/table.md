# Module: table

**File:** `\packages\ctool-core\src\helper\serialize\table.ts`

## Overview

Module `table` contains 6 analyzed entities.

```
import {unescape, isArray} from "lodash";

const createTempElement = (innerHTML = "", type = "div", id = "") => {
    const el = document.createElement(type);
    el.id = id ? id : `ctool-temp-${Math.ceil(Math.random() * 99999)}`
    el.style.cssText = "display:none;"
    document.body.appendChild(el);
    // 移除script标签
    el.innerHTML = innerHTML.replace(/<script/gmi, "<xxxxx")
    return el;
}

const nodeFilter = (item: string): string => {
    if (item === null) {
        return "";
    }
    const re = new RegExp("</?\\w+((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)/?>", 'igm');
    item = item.replace(/\r\n|\r|\n/gmi, ' ');
    item = item.replace(/\n|<br>|<br\/>|<br \/>/gmi, '\n');
    item = item.replace(re, '');
    item = unescape(item);
    item = item.replace(/&nbsp;/gmi, " ");
    return item.trim();
}

const jsonOutputFormat = (json, type = "json", keyed_key = 0) => {
    if (type === "keyed") {
        const keys = Object.keys(json[0])
        let result = {}
        for (let item of json) {
            let item_key = keys[keyed_key]
            result[item[item_key]] = item
        }
        return result
    }
    if (type === "row_array") {
        let result = json.map((item) => {
            return Object.values(item)
        })
        if (result.length > 0) {
            result = [
                Object.keys(json[0]),
                ...result
            ]
        }
        return result
    }
    if (type === "column_array") {
        const keys = Object.keys(json[0])
        let result = {}
        for (let key of keys) {
            result[key] = json.map((item) => {
                return item[key]
            })
        }
        return result
    }
    return json
}

export const tableKeys = (table) => {
    table = table.trim();
    if (!table) {
        return [];
    }
    const tableElement = createTempElement(table).getElementsByTagName('table')[0];
    let cells = tableElement.getElementsByTagName('tr')[0].query
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `table.createTempElement` | function | No description |
| `table.(tabl` | function | No description |
| `table.s = (tabl` | function | No description |
| `table.er = (item` | function | No description |
| `table.utFormat = (json` | function | No description |
| `table.y = (json` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
