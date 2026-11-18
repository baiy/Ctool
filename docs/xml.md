# Module: xml

**File:** `\packages\ctool-core\src\tools\code\formatter\xml.ts`

## Overview

Module `xml` contains 5 analyzed entities.

```
import xmlFormatter from "xml-formatter"
import Base from "./base";

export const formatter = new (class extends Base<'xml'> {

    async beautify(): Promise<string> {
        return xmlFormatter(this.code, {
            indentation: " ".repeat(this.getOptionValue('tab', 4)),
            collapseContent: this.getOptionValue('collapse_content', false),
            lineSeparator: '\n'
        });
    }

    async compress(): Promise<string> {
        return xmlFormatter(this.code, {
            indentation: '',
            collapseContent: true,
            lineSeparator: ''
        })
    }
})
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `xml.fixObjectArray` | function | No description |
| `xml.isArrayNoName` | function | No description |
| `xml.removeEmptyRoot` | function | No description |
| `xml.parse` | function | No description |
| `xml.stringify` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
