// 代码行信息扩展
// json  Array/Object[Length]

import * as monaco from "monaco-editor";
import { trimEnd, isArray, isPlainObject, debounce } from "lodash";
import Json from "@/helper/json";

type Range = {
    endLineNumber: number;
    startLineNumber: number;
    endColumn: number;
    startColumn: number;
};

const render = (range: Range, editor: monaco.editor.ICodeEditor) => {
    const code: string = trimEnd(
        editor.getModel()?.getValueInRange({
            startLineNumber: range.startLineNumber,
            endLineNumber: range.endLineNumber + 1,
            startColumn: range.startColumn - 1,
            endColumn: Number.MAX_SAFE_INTEGER,
        }),
        ",",
    );

    let lists: any = "";

    try {
        if (!["{", "["].includes(code[0])) {
            const temp = Json.parse(`{${code}}`, { JSON_REPAIR: true });
            if (isPlainObject(temp) && Object.keys(temp).length > 0) {
                lists = temp[Object.keys(temp)[0]];
            }
        } else {
            lists = Json.parse(code, { JSON_REPAIR: true });
        }
    } catch (e) {}

    let count: number = 0;

    if (isArray(lists)) {
        count = lists.length;
    }
    if (isPlainObject(lists)) {
        count = Object.keys(lists).length;
    }

    if (count < 1) {
        return;
    }
    editor.createDecorationsCollection([
        {
            range: {
                startColumn: 0,
                endColumn: Number.MAX_SAFE_INTEGER,
                startLineNumber: range.startLineNumber,
                endLineNumber: range.startLineNumber,
            },
            options: {
                after: {
                    content: `${count}`,
                    inlineClassName: "ctool-monaco-editor-line-info",
                },
            },
        },
    ]);
};

const lineCountDecoration = debounce(function (editor: monaco.editor.ICodeEditor) {
    const ranges = editor.getVisibleRanges();
    if (ranges.length === 0) {
        return;
    }
    const range = ranges[0];
    for (let index = range.startLineNumber; index <= range.endLineNumber; index++) {
        editor
            .getLineDecorations(index)
            ?.filter(item => item.options.after?.inlineClassName?.includes("ctool-monaco-editor-line-info"))
            .forEach(item => {
                editor.removeDecorations([item.id]);
            });
    }

    if ("json" !== editor.getModel()?.getLanguageId()) {
        return;
    }

    const decorations =
        editor.getDecorationsInRange(range)?.filter(item => {
            return item.options?.firstLineDecorationClassName?.includes("codicon-folding-");
        }) || [];
    decorations
        .filter(item => {
            return (
                item.range.startLineNumber >= range.startLineNumber && item.range.startLineNumber <= range.endLineNumber
            );
        })
        .forEach(item => {
            render(item.range, editor);
        });
}, 100);

export default (editor: monaco.editor.ICodeEditor) => {
    editor.onDidScrollChange(() => lineCountDecoration(editor));
    editor.onDidChangeModelLanguage(() => lineCountDecoration(editor));
    editor.onDidChangeModel(() => lineCountDecoration(editor));
    editor.onDidLayoutChange(() => lineCountDecoration(editor));
    setTimeout(() => lineCountDecoration(editor), 1000);
};
