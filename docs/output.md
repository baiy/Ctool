# Module: output

**File:** `\packages\ctool-core\src\components\serialize\output.ts`

## Overview

Module `output` contains 1 analyzed entities.

```
import {HistorySerializable, SerializeOutputEncoderType, OutputBase} from "@/types";
import {has, isEmpty, merge} from "lodash";

type Option = {
    text: {
        delimiter: string,
        is_add_quote: boolean
    },
    csv: {
        quoted: boolean,
        header: boolean
    },
    html_table: {
        header: boolean
    },
    xml: {
        attribute_prefix: string,
    }
}

const defaultOption: Option = {
    text: {
        delimiter: ",\\n",
        is_add_quote: false
    },
    csv: {
        quoted: false,
        header: true
    },
    html_table: {
        header: true
    },
    xml: {
        attribute_prefix: "",
    }
}

export default class Output implements OutputBase<SerializeOutputEncoderType>, HistorySerializable<Output> {
    public _: '_output_' = '_output_'
    public __: '_history_serializable_' = '_history_serializable_'

    public type: SerializeOutputEncoderType;
    public option: Option

    constructor(type: SerializeOutputEncoderType = 'json') {
        this.type = type;
        this.option = defaultOption
    }

    isSaveHistory() {
        return true
    }

    serialize() {
        const option: Record<string, any> = {}
        if (this.type in this.option) {
            option[this.type] = this.option[this.type]
        }
        return {
            _: '_input_',
            __: '_history_serializable_',
            type: this.type,
            ...(isEmpty(option) ? {} : {option}),
        }
    }

    unserialize(data?: Record<string, any>) {
        if (!data) {
            return this;
        }
        const item = new Output()
        if (has(data, 'type')) {
            item.type = data.type
        }
        if (has(data, 'option')) {
            item.option = merge(item.option, data.option)
        }
        return item
    }
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `output.Output` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
