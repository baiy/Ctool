# Module: contextMenu

**File:** `\packages\ctool-core\src\components\editor\contextMenu.ts`

## Overview

Module `contextMenu` contains 2 analyzed entities.

```
import * as monaco from "monaco-editor";
import formatter from "@/tools/code/formatter";

// 自定义右键菜单
const lists = [
    "ctool_multiple_selection",
    "ctool_beautify",
    "ctool_compress",
    "ctool_line_wrapping",
    "ctool_line_number",
    "ctool_goto",
    "ctool_search",
] as const;

type contextMenuType = (typeof lists)[number];
type menuHandle = (ed: monaco.editor.ICodeEditor, id: contextMenuType, result?: any) => any;

const menuDefinition = (): {
    id: contextMenuType;
    label: string;
    contextMenuGroupId?: string;
    enable?: boolean;
    run?: menuHandle;
}[] => {
    return [
        // 列选择
        {
            id: "ctool_multiple_selection",
            label: $t(`component_editor_multiple`),
            contextMenuGroupId: "1_modification",
            enable: true,
            run: (ed, id) => {
                ed.trigger(id, "editor.action.insertCursorAtEndOfEachLineSelected", "");
            },
        },
        // 查找/替换
        {
            id: "ctool_search",
            label: $t(`component_editor_search`),
            contextMenuGroupId: "1_modification",
            enable: true,
            run: (ed, id) => {
                ed.trigger(id, "editor.action.startFindReplaceAction", null);
            },
        },
        // 跳转
        {
            id: "ctool_goto",
            label: $t(`component_editor_goto`),
            contextMenuGroupId: "1_modification",
            enable: true,
            run: ed => ed.trigger("", "editor.action.gotoLine", null),
        },
        // 格式化
        {
            id: "ctool_beautify",
            label: $t(`code_beautify`),
            run: async ed => {
                const lang = ed.getModel()?.getLanguageId() || "";
                if (!formatter.isEnable(lang, "beautify") || ed.getValue() === "") {
                    return;
                }
                const result = await formatter.simple(lang, "beautify", ed.getValue());
                if (result !== ed.getValue()) {
    
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `contextMenu. = (): {
    i` | function | No description |
| `contextMenu.eCodeEditor` | class | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
