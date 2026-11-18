# Module: constructor

**File:** `\packages\ctool-core\src\tools\json\toObject\php\constructor.ts`

## Overview

Module `constructor` contains 3 analyzed entities.

```
import {indent} from "./utils";

function buildParameters(properties, {typedMethods}) {
    let result = "";
    const propertiesCount = properties.length;
    properties.forEach((property, i) => {
        if (typedMethods && property.type !== undefined) {
            result += property.type + " "
        }
        result += "$" + property.name;
        if (i < (propertiesCount - 1)) {
            result += ", ";
        }
    })
    return result;
}

function buildBody(properties) {
    let result = "";
    const propertiesCount = properties.length;
    properties.forEach((property, i) => {
        let line = "";
        line += `$this->${property.name} = $${property.name};`;
        if (i < (propertiesCount - 1)) {
            line += "\n";
        }
        result += indent(line, 2)
    })
    return result + "\n";
}

export const buildConstructor = (properties, config) => {
    let result = "\n";
    let declaration = "";
    declaration += "public function __construct(";
    declaration += buildParameters(properties, config);
    declaration += ")\n";
    result += indent(declaration, 1);
    result += indent(`{\n`, 1);
    result += buildBody(properties);
    result += indent("}", 1)
    return result;

}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `constructor.buildParameters` | function | No description |
| `constructor.buildBody` | function | No description |
| `constructor.buildConstructor` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
