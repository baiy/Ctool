<template>
    <Display
        :position="props.toolbar"
        class="ctool-code-editor"
        :class="props.disableBorder ? ['ctool-code-editor-disable-border'] : []"
        :style="{ height: `${sizeConvert(props.height)}`, width: `100%` }"
        toggle
    >
        <div ref="container" style="height: 100%; width: 100%"></div>
        <template #extra>
            <slot></slot>
        </template>
    </Display>
</template>
<script lang="ts" setup>
// 代码编辑器
import { monacoInit, ContextMenu, monacoInstance, monacoEditor, lineInfo } from "./monaco";
import PlaceholderContentWidget from "./placeholderContentWidget";
import { onUnmounted, onMounted, unref, watch, PropType, ref, shallowRef } from "vue";
import { getEditorLanguage } from "@/helper/code";
import { DisplayPosition } from "@/types";
import { useTheme } from "@/store/setting";
import { sizeConvert } from "../util";
import event from "@/event";

const modelValue = defineModel<string>({
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
    placeholder: {
        type: String,
        default: () => $t("main_ui_input"),
    },
    // 父组件语言判断函数
    langCallback: {
        type: [Function, Boolean] as PropType<(() => string) | false>,
        default: () => {
            return false;
        },
    },
    // 外部组件reload++ 重新加载编辑器
    reload: {
        type: Number,
        default: 0,
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
    lineInfo: {
        type: Boolean,
        default: false,
    },
});

const storeTheme = useTheme();
const container = ref<HTMLElement | null>(null);
const editorView = shallowRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
const lineWrapping = ref(!props.disableLineWrapping);
const lineNumbers = ref(!props.disableLineNumbers);

const getLanguage = (selectLang: string) => {
    let name: string = selectLang;
    if (props.langCallback !== false) {
        name = props.langCallback() || selectLang;
    }
    return getEditorLanguage(name);
};

const updateEditorConfig = async () => {
    if (!editorView.value) {
        return;
    }
    
    lineInfo(editorView.value).status(props.lineInfo);
    
    const model = editorView.value.getModel();
    
    // 设置语言
    model && monacoInstance()?.editor.setModelLanguage(model, getLanguage(props.lang).id);
    
    // 主题
    monacoInstance()?.editor.setTheme(storeTheme.theme.raw === "dark" ? "vs-dark" : "vs");
    
    editorView.value.render(true);
};

const create = async (element: HTMLElement) => {
    if (editorView.value) {
        editorView.value.dispose();
    }
    monacoInit({
        "vs/nls": { availableLanguages: { "*": $t("main_locale") === "zh_CN" ? "zh-cn" : "en" } },
    }).then(monaco => {
        const editor = monaco.editor.create(element, {
            value: unref(modelValue.value),
            minimap: {
                enabled: false,
            },
            lineNumbers: lineNumbers.value ? "on" : "off",
            wordWrap: lineWrapping.value ? "on" : "off",
            language: getLanguage(props.lang).id,
            scrollbar: {
                verticalScrollbarSize: 5,
            },
            automaticLayout: true,
        });
        
        // 内容更新
        editor.onDidChangeModelContent(() => {
            if (editor.getValue() !== unref(modelValue.value)) {
                modelValue.value = editor.getValue();
            }
        });
        
        // placeholder
        new PlaceholderContentWidget(props.placeholder, editor);
        
        // 右键菜单
        const contextMenu = new ContextMenu(editor);
        
        // 行信息展示
        lineInfo(editor).status(props.lineInfo);
        
        contextMenu.setHandle("ctool_line_wrapping", (_ed, _id, result) => (lineWrapping.value = result));
        contextMenu.setHandle("ctool_line_number", (_ed, _id, result) => (lineNumbers.value = result));
        
        editorView.value = editor;
        
        // 编辑器配置
        updateEditorConfig();
    });
};

onMounted(async () => {
    !props.disableClear && event.addListener("content_clear", () => updateEditor());
    await create(<HTMLElement>container.value);
});

onUnmounted(() => editorView.value?.dispose());

const updateEditor = (text = "") => {
    if (!editorView.value) {
        return;
    }
    if (editorView.value.getValue() !== text) {
        editorView.value.setValue(text);
    }
};

// 回写内容
watch(
    () => {
        return {
            value: unref(modelValue.value),
        };
    },
    ({ value }) => {
        if (editorView.value) {
            return updateEditor(value);
        }
        
        // 防止初始内容变更 编辑器还没有初始化成功
        const timer = setInterval(() => {
            if (editorView.value) {
                clearInterval(timer);
            }
            updateEditor(value);
        }, 50);
    },
);

// 初始化重新编辑器
watch(
    () => {
        return {
            color: storeTheme.theme.raw,
            lang: props.lang,
            reload: props.reload,
            lineInfo: props.lineInfo,
        };
    },
    () => updateEditorConfig(),
);
</script>
<style>
.ctool-code-editor {
    border-color: var(--ctool-border-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    overflow: hidden;
}

.ctool-code-editor-disable-border.ctool-code-editor {
    border: none;
}
</style>
