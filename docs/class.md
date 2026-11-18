# Module: class

**File:** `\packages\ctool-core\src\tools\json\toObject\php\class.ts`

## Overview

Module `class` contains 5 analyzed entities.

```
import {buildConstructor} from "./constructor";
import {buildGetters, buildSetters} from "./getterSetter";
import {buildProperties, getPropertyInfo} from "./property";
import {isScalarType} from "./types";
import {indent} from "./utils";

function getClassInfo(json, className, _config, deps) {
    const keys = Object.keys(json);
    const properties = keys.map((key) => {
        let info = getPropertyInfo(key, json[key]);
        if (
            isScalarType(info.type) ||
            isScalarType(info.subtype) ||
            info.subtype === null
        )
            return info;
        let depName = info.type === "array" ? info.subtype : info.type;
        if (!deps.has(depName)) {
            deps.add({
                className: depName,
                key: key,
                value: info.type === "array" ? json[key][0] : json[key],
            });
        }
        return info;
    });
    return {
        className: className,
        properties: properties,
    };
}

function buildArraySerialization(properties, config, className) {
    if (!config.includeDeps) {
        return "";
    }
    return (
        buildFromArray(properties, config, className) +
        buildToArray(properties, config) +
        buildToJson(properties, config)
    );
}

function buildFromArray(properties, {typedMethods}, className) {
    let result = "\n\n";
    let declaration = `public static function fromArray(`;
    declaration += typedMethods ? "array $data" : "$data";
    declaration += !typedMethods ? ")" : "):" + className;
    result += indent(declaration + "\n", 1);
    result += indent("{\n", 1);
    result += indent(`return new ${className}(\n`, 2);
    const propertiesCount = properties.length;
    properties.forEach((property, i) => {
        let content = "";
        let isLast = i >= propertiesCount - 1;
        if (isScalarType(property.type) || isScalarType(property.subtype)) {
            content = `$data["${property.originalName}"]${isLast ? "" : ","}`;
      
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `class.getClassInfo` | function | No description |
| `class.buildToJson` | function | No description |
| `class.buildFromArray` | function | No description |
| `class.buildArraySerialization` | function | No description |
| `class.buildToArray` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
