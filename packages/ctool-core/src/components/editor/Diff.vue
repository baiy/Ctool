<template>
    <Display
        :position="props.toolbar"
        :right="35"
        class="ctool-code-diff"
        :style="{ height: `${sizeConvert(props.height)}`, width: `100%` }"
        toggle
    >
        <div ref="container" style="height: 100%; width: 100%"></div>
        <template #extra>
            <Align>
                <Input
                    size="small"
                    center
                    :disabled="changes === 0"
                    :model-value="`${changes ? currentChange : 0} / ${changes}`"
                    :width="110"
                >
                    <template #prepend>
                        <Button :disabled="changes === 0 || currentChange === 1" text="<" @click="location('prev')" />
                    </template>
                    <template #append>
                        <Button
                            :disabled="changes === 0 || currentChange === changes"
                            text=">"
                            @click="location('next')"
                        />
                    </template>
                </Input>
                <Bool v-model="inline" :label="$t(`component_editor_inline`)" size="small" border />
                <slot></slot>
            </Align>
        </template>
    </Display>
</template>
<script lang="ts" setup>
// 代码编辑器
import { monacoInit, ContextMenu, monacoInstance, monacoEditor } from "./monaco";
import PlaceholderContentWidget from "./placeholderContentWidget";
import { onUnmounted, onMounted, watch, PropType, ref, shallowRef } from "vue";
import { getEditorLanguage } from "@/helper/code";
import { DisplayPosition } from "@/types";
import { useTheme } from "@/store/setting";
import { sizeConvert } from "../util";
import event from "@/event";

const original = defineModel<string>("original", {
    default: "",
});
const modified = defineModel<string>("modified", {
    default: "",
});

const props = defineProps({
    toolbar: {
        type: String as PropType<DisplayPosition>,
        default: "bottom-right",
    },
    lang: {
        type: String as PropType<string>,
        default: "text",
    },
    height: {
        type: [String, Number],
        default: "100%",
    },
    disableLineWrapping: {
        type: Boolean,
        default: false,
    },
    disableBorder: {
        type: Boolean,
        default: false,
    },
    disableLineNumbers: {
        type: Boolean,
        default: false,
    },
    disableClear: {
        type: Boolean,
        default: false,
    },
});

const storeTheme = useTheme();
const container = ref<HTMLElement | null>(null);
const editorView = shallowRef<monacoEditor.editor.IDiffEditor | null>(null);

const lineWrapping = ref(!props.disableLineWrapping);
const lineNumbers = ref(!props.disableLineNumbers);

const changes = ref<number>(0);
const currentChange = ref<number>(1);

const inline = ref(false);

const updateEditorConfig = async () => {
    if (!editorView.value) {
        return;
    }
    [editorView.value.getOriginalEditor(), editorView.value.getModifiedEditor()].forEach(editor => {
        const model = editor.getModel();
        // 设置语言
        model && monacoInstance()?.editor.setModelLanguage(model, getEditorLanguage(props.lang).id);
    });
    
    editorView.value.updateOptions({
        renderSideBySide: !inline.value,
    });
    
    // 主题
    monacoInstance()?.editor.setTheme(storeTheme.theme.raw === "dark" ? "vs-dark" : "vs");
};

const create = async (element: HTMLElement) => {
    if (editorView.value) {
        editorView.value.dispose();
    }
    monacoInit({
        "vs/nls": { availableLanguages: { "*": $t("main_locale") === "zh_CN" ? "zh-cn" : "en" } },
    }).then(monaco => {
        const originalModel = monaco.editor.createModel(original.value);
        const modifiedModel = monaco.editor.createModel(modified.value);
        
        const diffEditor = monaco.editor.createDiffEditor(element, {
            lineNumbers: lineNumbers.value ? "on" : "off",
            wordWrap: lineWrapping.value ? "on" : "off",
            minimap: { enabled: false },
            automaticLayout: false,
            originalEditable: true,
            scrollBeyondLastLine: false,
            renderSideBySide: !inline.value,
            enableSplitViewResizing: false,
            scrollbar: {
                verticalScrollbarSize: 5,
            },
        });
        
        window["_diffEditor"] = diffEditor;
        
        diffEditor.setModel({
            original: originalModel,
            modified: modifiedModel,
        });
        
        // 内容更新
        diffEditor.getOriginalEditor().onDidChangeModelContent(() => {
            if (diffEditor.getOriginalEditor().getValue() !== original.value) {
                original.value = diffEditor.getOriginalEditor().getValue();
            }
        });
        
        diffEditor.getModifiedEditor().onDidChangeModelContent(() => {
            if (diffEditor.getModifiedEditor().getValue() !== modified.value) {
                modified.value = diffEditor.getModifiedEditor().getValue();
            }
        });
        
        [diffEditor.getOriginalEditor(), diffEditor.getModifiedEditor()].forEach(editor => {
            // placeholder
            new PlaceholderContentWidget($t("main_ui_input"), editor);
            // 右键菜单
            const contextMenu = new ContextMenu(editor);
            contextMenu.setHandle("ctool_line_wrapping", (_ed, _id, result) => (lineWrapping.value = result));
            contextMenu.setHandle("ctool_line_number", (_ed, _id, result) => (lineNumbers.value = result));
        });
        diffEditor.onDidUpdateDiff(() => {
            changes.value = diffEditor.getLineChanges()?.length || 0;
            currentChange.value = 1;
        });
        
        editorView.value = diffEditor;
        // 编辑器配置
        updateEditorConfig();
    });
};

const location = (type: "prev" | "next") => {
    const lineChanges = editorView.value?.getLineChanges() || [];
    let current = type === "prev" ? currentChange.value - 1 : currentChange.value + 1;
    const change = lineChanges.at(current - 1);
    if (!change) {
        return;
    }
    editorView.value?.revealLineInCenter(change.originalEndLineNumber);
    currentChange.value = current;
};

onMounted(async () => {
    !props.disableClear && event.addListener("content_clear", () => updateEditor());
    await create(<HTMLElement>container.value);
});

onUnmounted(() => editorView.value?.dispose());

const updateEditor = (original = "", modified = "") => {
    if (!editorView.value) {
        return;
    }
    if (editorView.value.getOriginalEditor().getValue() !== original) {
        editorView.value.getOriginalEditor().setValue(original);
    }
    if (editorView.value.getModifiedEditor().getValue() !== modified) {
        editorView.value.getModifiedEditor().setValue(modified);
    }
};

// 回写内容
watch(
    () => {
        return {
            original: original.value,
            modified: modified.value,
        };
    },
    value => {
        if (editorView.value) {
            return updateEditor(value.original, value.modified);
        }
        
        // 防止初始内容变更 编辑器还没有初始化成功
        const timer = setInterval(() => {
            if (editorView.value) {
                clearInterval(timer);
            }
            updateEditor(value.original, value.modified);
        }, 50);
    },
);

// 初始化重新编辑器
watch(
    () => {
        return {
            color: storeTheme.theme.raw,
            lang: props.lang,
            inline: inline.value,
        };
    },
    () => updateEditorConfig(),
);
</script>
<style>
.ctool-code-diff {
    border-color: var(--ctool-border-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    overflow: hidden;
}
</style>
