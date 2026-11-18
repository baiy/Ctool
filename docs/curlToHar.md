# Module: curlToHar

**File:** `\packages\ctool-core\src\tools\httpSnippet\curlToHar.ts`

## Overview

Module `curlToHar` contains 4 analyzed entities.

```
import {isString} from "lodash";
import parser, {Arguments} from 'yargs-parser'

const parseQueryString = (searchParams: URLSearchParams) => {
    const lists: { name: string, value: string }[] = []

    for (const [key, value] of searchParams.entries()) {
        lists.push({
            name: key,
            value: value
        })
    }
    return lists;
}

const getMapValue = (items: string[] | string, split: string) => {
    const lists: { name: string, value: string }[] = []
    if (isString(items)) {
        items = items.split(";").map(item => item.trim())
    }
    items.forEach(item => {
        const temp = item.split(split).map(value => value.trim())
        if (temp.length > 1) {
            lists.push({
                name: temp[0],
                value: temp[1]
            })
        }
    })
    return lists
}

const parseFormData = (formDataString: string) => {
    const lists: { name: string, value: string }[] = []
    const lines = formDataString.split('Content-Disposition')
    lines.shift();
    lines.forEach(line => {
        const matchResult = line.match(/name="(.*?)"([\s\S]+)\r\n------/i)
        if (matchResult !== null) {
            const value = matchResult[2].replace("\r\n\r\n", "")
            lists.push({
                name: matchResult[1],
                value: value.includes("filename=\"") ? "" : value
            })
        }
    })
    return lists
}

const buildR = (args: Arguments) => {
    let method = "GET"
    let url: string = ""
    const httpVersion: string = "HTTP/1.1"
    const queryString: { name: string, value: string }[] = []
    const headers: { name: string, value: string }[] = []
    const cookies: { name: string, value: string }[] = []
    const postData: Record<string, any> = {}

    for (let key of Object.keys(args)) {
        if (['_', '__'].includes(key)) {
            continue;
        }
        const value: string = args[key];
        switch (key) {
            case "url":
                url = value

```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `curlToHar.parseQueryString` | function | No description |
| `curlToHar.parseFormData` | function | No description |
| `curlToHar.buildR` | function | No description |
| `curlToHar.getMapValue` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
