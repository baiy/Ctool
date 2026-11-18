# Module: feature

**File:** `\packages\ctool-config\src\feature.ts`

## Overview

Module `feature` contains 1 analyzed entities.

```
import {ToolInterface, FeatureInterface, ToolType, FeatureType} from "./config"
import {upperFirst} from "lodash";

export default class Feature<T extends ToolType = ToolType> implements FeatureInterface<T> {
    private readonly _name: FeatureType<T>
    private readonly _tool: ToolInterface<T>

    constructor(tool: ToolInterface<T>, name: FeatureType<T>) {
        this._name = name
        this._tool = tool
        this._tool.addFeature(this)
    }

    get name() {
        return this._name;
    }

    get tool() {
        return this._tool;
    }

    getComponentPath() {
        return `${this.tool.root}/${upperFirst(this.name)}.vue`
    }

    getRouter() {
        return `/tool/${this.tool.directory}${this.tool.isSimple() ? '' : `/${this.name}`}`
    }

    getQuery(category: string = "", other: Record<string, any> = {}) {
        if (!this.tool.inCategory(category)) {
            category = this.tool.firstCategory().name
        }
        return {
            category,
            ...other
        }
    }

    getKey() {
        return `${this.tool.name}-${this.name}`
    }
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `feature.Feature` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
