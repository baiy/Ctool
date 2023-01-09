<template>
    <Display :position="toolbar" class="ctool-code-editor" :style="{height:`${sizeConvert(height)}`,width:`100%`}">
        <div ref="container" style="height: 100%;width: 100%" @contextmenu="contextMenuOpen($event)"></div>
        <context-menu v-model:show="contextMenuConfig.show" :options="contextMenuConfig.options">
            <context-menu-item icon="copy" :disabled="contextMenuConfig.selected_text === ''" :label="$t(`main_ui_copy`)" @click="contextMenuClick('copy')"/>
            <context-menu-item icon="clipboard" :disabled="!contextMenuConfig.has_focus" :label="$t(`main_ui_paste`)" @click="contextMenuClick('paste')"/>
            <context-menu-item icon="location" :label="$t(`component_editor_goto`)" @click="contextMenuClick('goto')"/>
            <context-menu-item :label="$t(`component_editor_search`)" @click="contextMenuClick('search')"/>
            <context-menu-sperator/>
            <context-menu-item :disabled="!isEnableFormat.beautify" :label="$t(`code_beautify`)" @click="contextMenuClick('beautify')"/>
            <context-menu-item :disabled="!isEnableFormat.compress" :label="$t(`code_compress`)" @click="contextMenuClick('compress')"/>
            <context-menu-sperator/>
            <context-menu-item :icon="lineWrapping ? `selected` : ''" :label="$t(`component_editor_line_wrapping`)" @click="contextMenuClick('line_wrapping')"/>
            <context-menu-item :icon="lineNumbers ? `selected` : ''" :label="$t(`component_editor_line_number`)" @click="contextMenuClick('line_number')"/>
            <context-menu-item :label="$t(`component_editor_multiple`)" @click="contextMenuClick('multiple')"/>
            <template #itemIconRender={icon}>
                <i style="width: 20px">
                    <Icon v-if="icon" :name="icon"/>
                </i>
                <!-- // todo @imengyu/vue3-context-menu 右键菜单最新版无法显示 暂时回滚 1.1.5 -->
            </template>
        </context-menu>
        <template #extra>
            <slot></slot>
        </template>
    </Display>
</template>
<script lang="ts" setup>
// 代码编辑器
import {onUnmounted, onMounted, unref, watch, PropType, reactive} from "vue";
import {EditorState, StateEffect, EditorSelection} from "@codemirror/state"
import {EditorView, ViewUpdate, placeholder} from "@codemirror/view"
import {getEditorLanguage} from "@/helper/code"
import {openSearchPanel, gotoLine} from "@codemirror/search"
import {DisplayPosition} from "@/types"
import {basicSetup} from '@uiw/codemirror-extensions-basic-setup';
import {useTheme} from "@/store/setting"
import {githubLight, githubDark} from '@uiw/codemirror-theme-github';
import formatter from "@/tools/code/formatter";
import {copy, paste} from "@/helper/clipboard";
import {sizeConvert} from "../util";

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    toolbar: {
        type: String as PropType<DisplayPosition>,
        default: "bottom-right"
    },
    lang: {
        type: String as PropType<string>,
        default: "text"
    },
    placeholder: {
        type: String,
        default: () => $t('main_ui_input')
    },
    // 父组件语言判断函数
    langCallback: {
        type: [Function, Boolean] as PropType<(() => string) | false>,
        default: () => {
            return false
        }
    },
    // 外部组件reload++ 重新加载编辑器
    reload: {
        type: Number,
        default: 0
    },
    height: {
        type: [String, Number],
        default: "100%"
    },
    disableLineWrapping: {
        type: Boolean,
        default: false
    },
    disableLineNumbers: {
        type: Boolean,
        default: false
    }
})

const storeTheme = useTheme()
let container = $ref<HTMLElement | null>(null);
let editorView = $ref<EditorView | null>(null);
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

let lineWrapping = $ref(!props.disableLineWrapping)
let lineNumbers = $ref(!props.disableLineNumbers)

const getLanguage = async (selectLang: string) => {
    let name: string = selectLang
    if (props.langCallback !== false) {
        name = props.langCallback() || selectLang
    }
    const languageLoader = getEditorLanguage(name)
    return languageLoader ? await languageLoader.load() : []
}

const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.docChanged) {
        const content = vu.state.doc.toString()
        if (content !== unref(props.modelValue)) {
            emit('update:modelValue', content)
        }
    }
})

const getExtensions = async () => {
    return [
        // 主题
        storeTheme.theme.raw === "dark" ? githubDark : githubLight,
        // 内容更新
        updateListener,
        // 代码语言
        await getLanguage(props.lang),
        // 自动换行
        lineWrapping ? EditorView.lineWrapping : [],
        // 默认字符
        props.placeholder ? placeholder(`${props.placeholder}`) : [],

        // 通用组件
        basicSetup({
            // 显示行号
            lineNumbers: !!lineNumbers,
            foldGutter: !!lineNumbers,
        }),
    ]
}

const create = async (element: HTMLElement) => {
    if (editorView) {
        editorView.destroy()
    }
    editorView = new EditorView({
        state: EditorState.create({
            doc: unref(props.modelValue),
            extensions: await getExtensions()
        }),
        parent: element,
    })
}

onMounted(async () => {
    await create(<HTMLElement>container)
})

onUnmounted(() => editorView?.destroy());

const updateEditor = (text) => {
    if (!editorView) {
        return;
    }
    if (!editorView.composing && text !== editorView.state.doc.toString()) {
        editorView.dispatch({
            changes: {from: 0, to: editorView.state.doc.length, insert: text || ""},
        });
    }
}

// 回写内容
watch(() => props.modelValue, (text) => {
    if (editorView) {
        return updateEditor(text)
    }

    // 防止初始内容变更 编辑器还没有初始化成功
    const timer = setInterval(
        () => {
            if (editorView) {
                clearInterval(timer)
            }
            updateEditor(text)
        }, 1)
})

// 初始化重新编辑器
watch(
    () => {
        return {
            color: storeTheme.theme.raw,
            lang: props.lang,
            reload: props.reload,
            lineWrapping,
            lineNumbers
        }
    },
    async () => {
        if (!editorView) {
            return;
        }
        editorView.dispatch({
            effects: StateEffect.reconfigure.of(await getExtensions()),
        });
    }
)
const contextMenuConfig = reactive({
    show: false,
    options: {
        theme: storeTheme.theme.raw === 'light' ? 'light' : 'dark',
        x: 500,
        y: 200
    },
    selected_text: "",
    has_focus: false
})


// 右键菜单
const contextMenuOpen = (e: MouseEvent) => {
    e.preventDefault();
    contextMenuConfig.options.x = e.x;
    contextMenuConfig.options.y = e.y;
    if (editorView) {
        contextMenuConfig.has_focus = editorView.hasFocus
        contextMenuConfig.selected_text = editorView.state.sliceDoc(editorView.state.selection.main.from, editorView.state.selection.main.to) || ""
    }
    contextMenuConfig.show = true;
}
const contextMenuClick = async (type = "") => {
    if (!editorView) {
        return;
    }
    if (type === "line_wrapping") {
        return lineWrapping = !lineWrapping
    }
    if (type === "line_number") {
        return lineNumbers = !lineNumbers
    }
    if (type === "goto") {
        return gotoLine(editorView as EditorView)
    }
    if (type === "search") {
        return openSearchPanel(editorView as EditorView)
    }
    if (type === "copy") {
        return copy(contextMenuConfig.selected_text)
    }
    if (type === "paste") {
        const text = (await paste()).trim()
        if (text !== "") {
            editorView.dispatch({
                changes: editorView.state.selection.ranges.map((range) => {
                    return {
                        from: range.from,
                        to: range.to,
                        insert: text
                    }
                })
            })
        }
        return
    }
    // 转换多光标
    if (type === "multiple") {
        contextMenuMultiple()
        return
    }
    if (['compress', 'beautify'].includes(type)) {
        const result = await formatter.simple(props.lang, type as any, editorView.state.doc.toString())
        if (result !== "") {
            editorView.dispatch({
                changes: {from: 0, to: editorView.state.doc.length, insert: result || ""},
            });
        }
        return;
    }
}

const contextMenuMultiple = () => {
    if (!editorView) {
        return;
    }
    let from = 0
    let to = 0
    editorView.state.selection.ranges.forEach((range, index) => {
        if (index === 0) {
            from = range.from
        }
        to = range.to
    })
    const selected: number[] = []
    const all: number[] = []
    for (let i = 1; i <= editorView.state.doc.lines; i++) {
        const line = editorView.state.doc.line(i)
        all.push(line.from)
        if (
            Math.min(line.to, to) - Math.max(line.from, from) >= 0
        ) {
            selected.push(line.from)
        }
    }
    const current = selected.length > 1 ? selected : all
    editorView.dispatch({
        selection: EditorSelection.create(current.map((head) => {
            return EditorSelection.range(head, head)
        }))
    });
    return
}
const isEnableFormat = $computed(() => {
    return {
        beautify: formatter.isEnable(props.lang, 'beautify'),
        compress: formatter.isEnable(props.lang, 'compress')
    }
})
</script>
<style>
.ctool-code-editor .cm-editor {
    cursor: auto;
    height: 100%;
    width: 100%;
    max-height: none;
    border-color: var(--ctool-border-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    font-size: .875rem;
    background-color: var(--ctool-form-element-background-color);
}

.ctool-code-editor .cm-editor .cm-scroller, .ctool-code-editor .cm-editor {
    height: 100% !important;

}

.ctool-code-editor .cm-editor .cm-gutters {
    background-color: var(--ctool-block-title-bg-color);
}

.ctool-code-editor .cm-editor.cm-focused {
    outline: unset;
}

.ctool-code-editor .cm-editor input:not([type=checkbox], [type=radio], [type=range]) {
    width: auto;
}

.ctool-code-editor .cm-editor label {
    display: unset;
}

.ctool-code-editor .cm-editor button {
    width: auto;
    display: unset;
    color: unset;
}

.ctool-code-editor .cm-editor form {
    margin-bottom: 0;
}
</style>
