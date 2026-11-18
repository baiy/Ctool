# Module: quickType

**File:** `\packages\ctool-core\src\tools\json\toObject\quickType.ts`

## Overview

Module `quickType` contains 1 analyzed entities.

```
import {
    getTargetLanguage,
    inferenceFlagNames,
    inferenceFlags,
    InputData,
    jsonInputForTargetLanguage,
    quicktype,
    defaultTargetLanguages
} from "quicktype-core";
import {pick, omit} from "lodash";
import {Transform, Option} from "./type";

const getTargetOption = (lang: string) => {
    return getTargetLanguage(lang).optionDefinitions.map(({name}) => name)
}

export default class implements Transform {
    getLanguages() {
        return defaultTargetLanguages.map(item => item.displayName)
            .filter(name => {
                // 禁用php quick type 支持不太完善
                return !["php"].includes(name.toLowerCase())
            })
    }

    async execute(lang: string, input: string, options: Record<string, any>): Promise<string> {
        const targetOption = getTargetOption(lang)
        const jsonInput = jsonInputForTargetLanguage(lang);
        await jsonInput.addSource({
            name: 'ctool',
            samples: [input]
        });
        const inputData = new InputData();
        inputData.addInput(jsonInput);
        return (await quicktype({
            inputData,
            lang,
            ...omit(options, targetOption),
            rendererOptions: pick(options, targetOption)
        })).lines.join("\n")
    }

    getOptionDefine(lang: string) {
        const define: Option[] = []
        if (lang !== "") {
            const quickTypeLanguage = getTargetLanguage(lang)
            define.push(...quickTypeLanguage.optionDefinitions.map(option => {
                let type: Option["type"] = "string"
                if (option.type === Boolean) {
                    type = "boolean"
                }
                if (option.legalValues !== undefined && option.type === String) {
                    type = "select"
                }
                return {
                    name: option.name,
                    description: option.description,
                    type: type,
                    value: option.leg
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `quickType.getTargetOption` | function | No description |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
