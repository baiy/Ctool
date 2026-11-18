# Module: define

**File:** `\packages\ctool-core\src\tools\json\define.ts`

## Overview

Module `define` contains 0 analyzed entities.

```
import { SerializeInput, SerializeOutput } from "@/components/serialize";
import { Option as toObjectOption } from "./toObject";
//=======
const tabsMap = [
    { label: $t("code_indent_width_null"), value: 0 },
    { label: $t("code_indent_width", [2]), value: 2 },
    { label: $t("code_indent_width", [4]), value: 4 },
    { label: $t("code_indent_width", [6]), value: 6 },
    { label: $t("code_indent_width", [8]), value: 8 },
] as const;

export type TabsType = (typeof tabsMap)[number]["value"];
export const tabOptions: { label: string; value: number }[] = tabsMap as any;

export const pathLists = [
    { label: $t(`json_json_path`), value: "json_path" },
    { label: $t(`json_jmes_path`), value: "jmes_path" },
];
export type PathOptionType = {
    type: "json_path" | "jmes_path";
    json_path: string;
    jmes_path: string;
};

export type SchemaOptionType = {
    exp: string;
    option: Record<string, any>;
};

//=======
export type actionType = {
    input: string;
    tabs: string;
    expand_type: string;
    option: {
        info: {
            line: boolean;
        };
        tab: TabsType;
        from: SerializeInput;
        to: SerializeOutput;
        path: PathOptionType;
        schema: SchemaOptionType;
        to_object: toObjectOption;
    };
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
