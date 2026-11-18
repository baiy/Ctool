# Module: nameConvert

**File:** `\packages\ctool-core\src\helper\nameConvert.ts`

## Overview

Module `nameConvert` contains 5 analyzed entities.

```
// 算法来源 https://github.com/netnexus/camelcaseplugin

const spaceCaseToPascalCaseSpace = 'spaceCaseToPascalCaseSpace'  // 转换过程  space case to Camel Case
const pascalCaseSpaceToKebabCase = 'pascalCaseSpaceToKebabCase'  // 转换过程  Camel Case to kebab-case
const kebabCaseToUpperSnakeCase = 'kebabCaseToUpperSnakeCase'  // 转换过程  kebab-case to SNAKE_CASE
const upperSnakeCaseToPascalCase = 'upperSnakeCaseToPascalCase'  // 转换过程  SNAKE_CASE to CamelCase
const pascalCaseToCamelCase = 'pascalCaseToCamelCase'  // 转换过程  CamelCase to camelCase
const camelCaseToLowerSnakeCase = 'camelCaseToLowerSnakeCase'  // 转换过程  camelCase to snake_case
const lowerSnakeCaseToSpaceCase = 'lowerSnakeCaseToSpaceCase'  // 转换过程  snake_case to space case

const isUpperCase = (str: string, first = false) => {
    if (!first) {
        return str.toUpperCase() === str;
    }
    return str.substring(0, 1).toUpperCase() === str.substring(0, 1)
        && (str.length === 1 || str.substring(1, 2).toLowerCase() === str.substring(1, 2));
}

const isLowerCase = (str: string, first = false) => {
    if (!first) {
        return str.toLowerCase() === str;
    }
    return str.substring(0, 1).toLowerCase() === str.substring(0, 1);
}
const firstToUpper = (str: string) => {
    return str !== "" ? str.replace(str[0], str[0].toUpperCase()) : "";
}
const firstToLower = (str: string) => {
    return str !== "" ? str.replace(str[0], str[0].toLowerCase()) : "";
}

const getMethodName = (str: string) => {
    str = str.trim();
    if (isLowerCase(str) && str.includes('_')) {
        return lowerSnakeCaseToSpaceCase;
    }
    if (isLowerCase(str) && str.includes('-')) {
        return kebabCaseToUpperSnakeCase;
    }
    if (isLowerCase(str) && str.includes(' ')) {
        return spaceCaseToPascalCaseSpace;
    }
    if (isUpperCase(str, true) && str.includes(' ')) {
        return pascalCaseSpaceToKebabCase;
    }
    if (isUpperCase(str) && str.includes('_')) {
        return upperSnakeCaseToPascalCase;
    }
    if (isU
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `nameConvert.{
        r` | function | No description |
| `nameConvert.place(str[0]` | function | No description |
| `nameConvert.(isLowerCase(` | function | No description |
| `nameConvert.type]()` | function | No description |
| `nameConvert.ring, s` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
