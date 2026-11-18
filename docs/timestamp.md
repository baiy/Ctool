# Module: timestamp

**File:** `\packages\ctool-core\src\tools\time\util\timestamp.ts`

## Overview

Module `timestamp` contains 2 analyzed entities.

```
import dayjs, {Dayjs} from "dayjs";

enum InputType {
    error,
    empty,
    normal,
    unix
}

enum Format {
    second = "second",
    millisecond = "millisecond",
    nanosecond = "nanosecond",
}

type TimeType = {
    type: InputType,
    format: Format,
}

type Output = {
    isValid: boolean
    second: string
    millisecond: string
    nanosecond: string
    format?: Format
    autoFormat?: Format
    type?: InputType
}

const formatDecimalLength = {
    second: 0,
    millisecond: 3,
    nanosecond: 9,
}

const transform = (input: string, timezone: string, format: Format | "auto" = "auto"): Output => {
    const {type, format: _format} = getTimeType(input)
    format = (format === "auto" ? _format : format) as Format
    try {
        if (type === InputType.empty) {
            return {
                isValid: false,
                second: "",
                millisecond: "",
                nanosecond: "",
            }
        }

        if (type === InputType.error) {
            throw new Error($t('time_error_format'))
        }

        let decimal: string
        let time: Dayjs
        const decimalLength = formatDecimalLength[format]

        if (type === InputType.normal) {
            const fragment = input.split(".")
            decimal = (fragment[1] || "").slice(0, decimalLength)
            time = dayjs.tz(fragment[0], timezone)
        } else {
            time = dayjs(parseInt(decimalLength ? input.slice(0, -1 * decimalLength) : input) * 1000).tz(timezone)
            decimal = decimalLength ? input.slice(-1 * decimalLength) : ""
        }
        if (!time.isValid()) {
            throw new Error($t('time_error_format'))
        }

        const second = type === InputType.normal ? time.unix().toString() : time.format('YYYY-MM-DD HH:mm:ss');
        const millisecond = decimal.slice(0, formatDecimalLength.millisecond).padEnd(formatDecimalLength.millisecond, "0");
        const nanosecond = decimal.slice(0, formatDecimalLength.nanoseco
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `timestamp.transform` | function | No description |
| `timestamp.getTimeType` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
