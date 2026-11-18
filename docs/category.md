# Module: category

**File:** `\packages\ctool-config\src\category.ts`

## Overview

Module `category` contains 1 analyzed entities.

```
import {ToolInterface, CategoryInterface, ToolType, CategoryType} from "./config"

class Category<T extends CategoryType = any> implements CategoryInterface<T> {
    private readonly _name: T;
    private _tools: ToolInterface[] = []

    constructor(name: T) {
        this._name = name
    }

    get name() {
        return this._name;
    }

    get tools() {
        return this._tools
    }

    addTool(tool: ToolInterface) {
        this._tools.push(tool)
        tool.addCategory(this)
    }

    existTool(name: string) {
        return this.tools.map<string>(item => item.name).includes(name)
    }

    firstTool() {
        return this._tools[0]
    }
}

export default Category
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `category.Category` | class | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
