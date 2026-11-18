# Module: propertiesToJson

**File:** `\packages\ctool-core\src\helper\serialize\propertiesToJson.ts`

## Overview

Module `propertiesToJson` contains 2 analyzed entities.

```
/** @link https://github.com/ryanpcmcquen/propertiesToJSON/pull/5 */
import Json from "@/helper/json";

const defaultValue = (v, d) => (v === undefined ? d : v);

const typesMap = {
    false: false,
    true: true,
    undefined: undefined,
    null: null,
};

const defaults = {
    jsonAsString: false,
    convertToJsonTree: false,
    parseNumber: false,
    parseBooleanNullUndefined: false,
};

function isNumeric(value) {
    // https://stackoverflow.com/a/1830844/9740955
    return !isNaN(parseFloat(value)) && isFinite(value);
}

const treeCreationRecursiveFn = function (keys, value, result) {
    const key = keys[0];
    if (keys.length === 1) {
        if (
            typeof result[key] !== null &&
            typeof result[key] === 'object' &&
            typeof value === 'string'
        ) {
            console.warn(`key missing for value ->`, value);
            console.warn('The value will have empty string as a key');
            result[key][''] = value;
        } else result[key] = value;
    } else {
        let obj = {};

        // since typeof null === "object" we check for null also https://stackoverflow.com/a/8511350/9740955
        if (
            typeof result[key] === 'object' &&
            !Array.isArray(result[key]) &&
            result[key] !== null
        )
            obj = result[key];
        else if (typeof result[key] === 'string') {
            // conflicting case: a=b \n a.c=d then o/p will be a: { '': 'b', c: 'd' }
            obj = {...(result[key] !== undefined && {'': result[key]})};
            console.warn(`key missing for value ->`, result[key]);
            console.warn('The value will have empty string as a key');
        }

        result[key] = treeCreationRecursiveFn(keys.slice(1), value, obj);
    }
    return result;
};

export default (str, options: Partial<typeof defaults> = {}) => {
    const parsedOptions = {
        jsonAsString: defaultValue(options.jsonAsString, defaults.jsonAsString),
        convertToJsonT
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `propertiesToJson.isNumeric` | function | No description |
| `propertiesToJson.defaultValue` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
