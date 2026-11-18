# Module: csv

**File:** `\packages\ctool-core\src\helper\serialize\csv.ts`

## Overview

Module `csv` contains 4 analyzed entities.

```
import {parse as csvParse} from 'csv-parse/sync';
import {stringify as csvStringify} from 'csv-stringify/sync';

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

export const getKeyedField = (csv: string) => {
    return Object.keys(csvParse(csv, {columns: true, skip_empty_lines: true})[0] || {})
}

export const parse = (csv = "", {type = "row_object", keyed_key = 0} = {}) => {
    return jsonOutputFormat(
        csvParse(csv, {columns: true, skip_empty_lines: true}),
        type,
        keyed_key
    )
}

const stringify = (json: any, {quoted = false, header = true} = {}) => {
    return csvStringify(json, {quoted, header})
}

export default {
    parse,
    stringify
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `csv.jsonOutputFormat` | function | No description |
| `csv.parse` | function | No description |
| `csv.stringify` | function | No description |
| `csv.getKeyedField` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
