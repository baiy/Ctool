# Module: property

**File:** `\packages\ctool-core\src\tools\json\toObject\php\property.ts`

## Overview

Module `property` contains 3 analyzed entities.

```
import {guessType, isScalarType} from "./types";
import {camelCase, indent} from "./utils";
import {isEmpty} from "lodash"

export const Visibility = {
    PUBLIC: "public",
    PRIVATE: "private",
    PROTECTED: "protected"
};

export const buildProperties = (properties, {visibility, typedProperties}) => {
    let result = "";
    properties.forEach((p) => {
        if (p.type) {
            result += indent(`/** @var ${p.type} */\n`, 1);
        }
        result += indent(`${visibility}${(p.type && typedProperties) ? " " + p.type : ""} $${p.name};\n`, 1);

    });
    return result;
}

const subtype = (type, value, key) => {
    if (isScalarType(type) || isEmpty(value)) return null;
    let subKey = key;
    if (type === "array") {
        return guessType(
            value.length > 0 ? value[0] : null,
            subKey,
        )
    }
    return guessType(
        value,
        subKey,
    )
}

export const getPropertyInfo = (key, value) => {
    let type = guessType(value, key);
    return {
        name: camelCase(key),
        type: type,
        originalName: key,
        value: value,
        subtype: subtype(type, value, key)
    }
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `property.buildProperties` | function | No description |
| `property.getPropertyInfo` | function | No description |
| `property.subtype` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
