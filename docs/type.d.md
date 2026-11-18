# Module: type.d

**File:** `\packages\ctool-core\src\components\type.d.ts`

## Overview

Module `type.d` contains 1 analyzed entities.

```
import { VNode } from "vue";
import Text from "@/helper/text";
import Serialize from "@/helper/serialize";
import {
    ComponentSizeType,
    ButtonType,
    DisplayPosition,
    UploadFileType,
    UploadFileMode,
    UploadFileButtonType,
    TextInputUpload,
    SelectOption,
    SelectValue,
    RadioOption,
    RadioValue,
    TableConfig,
    TableLists,
    LinkType,
    ModalFooterType,
    TabsListsType,
    SelectType,
    AlignSize,
    AlignDirection,
    AlignHorizontal,
    AlignVertical,
    TextInputEncoderType,
    TextOutputEncoderType,
    SerializeInputEncoderType,
    SerializeOutputEncoderType,
    CheckboxValue,
    CheckboxOption,
} from "@/types";
import { SerializeInput, SerializeOutput } from "./serialize";
import { TextInput, TextOutput } from "./text";
import { IconType } from "@/helper/icon";

type ComponentType<T> = T | any;

declare module "@vue/runtime-core" {
    interface GlobalComponents {
        Input: new () => {
            $props: {
                modelValue?: string;
                placeholder?: string;
                disabled?: boolean;
                readonly?: boolean;
                center?: boolean;
                label?: string;
                size?: ComponentSizeType;
                width?: number | string;
                disableClear?: boolean;
            };
            $emit: { (e: "change", value: string): void; (e: "load", value: HTMLInputElement): void };
            $slots: {
                prepend: () => VNode[];
                prefix: () => VNode[];
                append: () => VNode[];
                suffix: () => VNode[];
            };
        };
        InputNumber: new () => {
            $props: {
                modelValue: number;
                placeholder?: string;
                center?: boolean;
                disabled?: boolean;
                readonly?: boolean;
                label?: string;
                step?: number | string;
                min?: number | boolean;
     
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `type.d.GlobalComponents` | interface | No description |

## Git History

- Commits: 18
- Authors: 1
- Bug fixes: 2
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
