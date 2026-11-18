# Module: lineInfo

**File:** `\packages\ctool-core\src\components\editor\lineInfo.ts`

## Overview

Module `lineInfo` contains 3 analyzed entities.

```
// 代码行信息扩展
// json  Array/Object[Length]

import * as monaco from "monaco-editor";
import { trimEnd, isArray, isPlainObject, debounce } from "lodash";
import Json from "@/helper/json";

type Range = {
    endLineNumber: number;
    startLineNumber: number;
    endColumn: number;
    startColumn: number;
};

const render = (range: Range, editor: monaco.editor.IStandaloneCodeEditor) => {
    const code: string = trimEnd(
        editor.getModel()?.getValueInRange({
            startLineNumber: range.startLineNumber,
            endLineNumber: range.endLineNumber + 1,
            startColumn: range.startColumn - 1,
            endColumn: Number.MAX_SAFE_INTEGER,
        }),
        ",",
    );

    let lists: any = "";

    try {
        if (!["{", "["].includes(code[0])) {
            const temp = Json.parse(`{${code}}`, { JSON_REPAIR: true });
            if (isPlainObject(temp) && Object.keys(temp).length > 0) {
                lists = temp[Object.keys(temp)[0]];
            }
        } else {
            lists = Json.parse(code, { JSON_REPAIR: true });
        }
    } catch (e) {}

    let count: number = 0;

    if (isArray(lists)) {
        count = lists.length;
    }
    if (isPlainObject(lists)) {
        count = Object.keys(lists).length;
    }

    if (count < 1) {
        return;
    }
    editor.createDecorationsCollection([
        {
            range: {
                startColumn: 0,
                endColumn: Number.MAX_SAFE_INTEGER,
                startLineNumber: range.startLineNumber,
                endLineNumber: range.startLineNumber,
            },
            options: {
                after: {
                    content: `${count}`,
                    inlineClassName: "ctool-monaco-editor-line-info",
                },
            },
        },
    ]);
};

const lineInfoHandle = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const ranges = editor.getVisibleRanges();
    if (ranges.length === 0) {
        return;
    }
    const range
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `lineInfo.e: Ran` | function | No description |
| `lineInfo. = (editor: mo` | function | No description |
| `lineInfo. private` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
