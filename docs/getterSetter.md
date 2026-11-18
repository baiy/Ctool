# Module: getterSetter

**File:** `\packages\ctool-core\src\tools\json\toObject\php\getterSetter.ts`

## Overview

Module `getterSetter` contains 5 analyzed entities.

```
import {camelCase, indent} from "./utils";

function buildSetter(property, {typedMethods}) {
    const methodName = camelCase("set" + "_" + property.name);
    let result = "";

    let declaration = `public function ${methodName}`;
    declaration += `(${(typedMethods && property.type !== undefined) ? property.type + " " : ""}$${property.name})`;
    result += indent(declaration + "\n", 1);
    result += indent("{\n", 1);
    result += indent(`$this->${property.name} = $${property.name};\n`, 2);
    result += indent(`return $this;\n`, 2);
    result += indent("}", 1);
    return result;
}

function buildGetter(property, {typedMethods}) {
    const prefix = property.type === "bool" ? "is" : "get";
    const methodName = camelCase(prefix + "_" + property.name);
    let result = "";
    let declaration = `public function ${methodName}()`;
    if (typedMethods && property.type !== undefined) {
        declaration += ":" + property.type;
    }
    result += indent(declaration + "\n", 1);
    result += indent("{\n", 1);
    result += indent(`return $this->${property.name};\n`, 2);
    result += indent("}", 1);
    return result;
}

function buildMethod(callback, properties, config) {
    if (!config.getters && !config.setters) return "";
    let result = "\n";
    const l = properties.length;
    properties.forEach((p, i) => {
        result += "\n";
        result += callback(p, config);
        if (i < (l - 1)) {
            result += "\n";
        }
    })
    return result;
}

export const buildSetters = (properties, config) => {
    if (!config.setters) return "";
    return buildMethod(buildSetter, properties, config);
}

export const buildGetters = (properties, config) => {
    if (!config.getters) return "";
    return buildMethod(buildGetter, properties, config);
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `getterSetter.buildSetter` | function | No description |
| `getterSetter.buildMethod` | function | No description |
| `getterSetter.buildGetter` | function | No description |
| `getterSetter.buildSetters` | function | No description |
| `getterSetter.buildGetters` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
