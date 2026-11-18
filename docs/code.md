# Module: code

**File:** `\packages\ctool-core\src\helper\code.ts`

## Overview

Module `code` contains 4 analyzed entities.

```
import * as monaco from "monaco-editor";
const supportedLanguages = monaco.languages.getLanguages();

// 获取编辑器编辑语言对象
const getSourceLanguage = (land: string) => {
    for (let language of supportedLanguages) {
        if ([language.id, ...(language.aliases || [])].map(name => name.toLowerCase()).includes(land.toLowerCase())) {
            return language;
        }
    }
    return null;
};

// 定义自定义语言
const defineConfig = (name: string, language?: monaco.languages.ILanguageExtensionPoint | null, alias?: string[]) => {
    return {
        name,
        alias: alias || [],
        language: language,
    };
};

// 自定义语言配置
const customLanguages = [
    defineConfig("GraphQL"),
    defineConfig("Vue", getSourceLanguage("html")),
    defineConfig("Angular", getSourceLanguage("html")),
    defineConfig("HTML Table", getSourceLanguage("html"), ["html_table"]),
    defineConfig("PHP Array", getSourceLanguage("php"), ["php_array"]),
    defineConfig("Php Serialize", getSourceLanguage("php"), ["php_serialize"]),
    defineConfig("Http Query String", null, ["http_query_string"]),
    defineConfig("JSON Schema", getSourceLanguage("json")),
    defineConfig("JavaScript PropTypes", getSourceLanguage("TypeScript")),
    defineConfig("Flow", getSourceLanguage("TypeScript")),
    defineConfig("Text"),
    defineConfig("CSV"),
    defineConfig("C-99", getSourceLanguage("c"), ["c99"]),
    defineConfig("C++ 14", getSourceLanguage("c++"), ["cpp14"]),
    defineConfig("C++ 17", getSourceLanguage("c++"), ["cpp17"]),
    defineConfig("Python 2", getSourceLanguage("python"), ["python2"]),
    defineConfig("Python 3", getSourceLanguage("python"), ["python3"]),
    defineConfig("VB.NET", getSourceLanguage("VB.NET"), ["vbn"]),
    defineConfig("JavaScript", getSourceLanguage("JavaScript"), ["nodejs"]),
];

// 获取 编辑器 语言处理对象
export const getEditorLanguage = (land: string) => {
    const language = getSourceLanguage(land);
    if (language) {
        return language;
    }

    // 自定义
    for 
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `code.and: string) => {` | function | No description |
| `code.ge?: monaco.` | function | No description |
| `code.nguage(land);
   ` | function | No description |
| `code.  if ([languag` | function | No description |

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
