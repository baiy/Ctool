# Module: protobuf

**File:** `\packages\ctool-core\src\tools\json\toObject\protobuf.ts`

## Overview

Module `protobuf` contains 11 analyzed entities.

```
// https://github.com/json-to-proto/json-to-proto.github.io/blob/master/src/convert.ts
import Json from "@/helper/json"
import {Option, Transform} from "./type";

const googleAnyImport = "google/protobuf/any.proto";
const googleTimestampImport = "google/protobuf/timestamp.proto";

const googleAny = "google.protobuf.Any";
const googleTimestamp = "google.protobuf.Timestamp";

const isBigInt = (value: unknown): value is BigInt => {
    return typeof value === 'bigint';
}

class Result {
    constructor(
        public readonly success: string,
        public readonly error: string,
    ) {
    }
}

class ProtoPrimitiveType {
    constructor(
        public readonly name: string,
        public readonly complex: boolean,
        public readonly merge: boolean,
    ) {
    }
}

const boolProtoPrimitiveType = new ProtoPrimitiveType("bool", false, false);
const stringProtoPrimitiveType = new ProtoPrimitiveType("string", false, false);
const int64ProtoPrimitiveType = new ProtoPrimitiveType("int64", false, true);
const complexProtoType = new ProtoPrimitiveType(googleAny, true, false);
const timestampProtoType = new ProtoPrimitiveType(googleTimestamp, false, false);

export class Options {
    constructor(
        public inline: boolean,
        public googleProtobufTimestamp: boolean,
        public mergeSimilarObjects: boolean,
    ) {
    }
}

class Collector {
    private imports: Set<string>;
    private messages: Array<Array<string>>;
    private messageNameSuffixCounter: { [key: string]: number; };

    constructor() {
        this.imports = new Set<string>()
        this.messages = [];
        this.messageNameSuffixCounter = {};
    }

    addImport(importPath: string) {
        this.imports.add(importPath);
    }

    generateUniqueName(source: string): string {
        if (this.messageNameSuffixCounter.hasOwnProperty(source)) {
            const suffix = this.messageNameSuffixCounter[source];

            this.messageNameSuffixCounter[source] = suffix + 1;

       
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `protobuf.toMessageName` | function | No description |
| `protobuf.convert` | function | No description |
| `protobuf.render` | function | No description |
| `protobuf.numberType` | function | No description |
| `protobuf.mergePrimitiveType` | function | No description |
| `protobuf.isBigInt` | function | No description |
| `protobuf.Options` | class | No description |
| `protobuf.ProtoPrimitiveType` | class | No description |
| `protobuf.Collector` | class | No description |
| `protobuf.Result` | class | No description |
| `protobuf.Analyzer` | class | No description |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
