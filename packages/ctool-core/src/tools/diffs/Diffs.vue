<template>
    <Align direction="vertical" class="ctool-diff">
        <HeightResize v-slot="{height}" ignore :append="['.ctool-page-option']" :reduce="5">
            <div ref="container" :style="{height:`${height}px`,width:`100%`,overflow: 'hidden'}"></div>
        </HeightResize>
        <Align class="ctool-page-option" horizontal="center">
            <Select v-model="action.current.option.lang" :options="allLanguage"/>
            <Button :text="$t(`code_beautify`)" @click="beautify"/>
            <Bool v-model="action.current.option.lineWrapping" :label="$t(`component_editor_line_wrapping`)" border/>
            <Bool v-model="action.current.option.collapse" :label="$t(`diffs_collapse`)" border/>
            <Dropdown
                @select="(value)=>action.current.option.revert = value"
                :placeholder="$t(`diffs_revert_direction`)"
                :options="[{value:'b-to-a',label:$t(`diffs_right_to_left`)},{value:'a-to-b',label:$t(`diffs_left_to_right`)}]"
            />
            <Input
                center
                :disabled="difference.chunks.length === 0"
                :model-value="`${difference.chunks.length ? difference.index + 1 : 0} / ${difference.chunks.length}`"
                :width="130"
            >
                <template #prepend>
                    <Button
                        :disabled="difference.chunks.length === 0 || difference.index === 0"
                        text="<"
                        @click="location('last')"
                    />
                </template>
                <template #append>
                    <Button
                        :disabled="difference.chunks.length === 0 || difference.index === (difference.chunks.length - 1)"
                        text=">"
                        @click="location('next')"
                    />
                </template>
            </Input>
        </Align>
    </Align>
</template>
<script lang="ts" setup>
import {onUnmounted, onMounted, watch} from "vue";
import {EditorView, ViewUpdate, placeholder} from "@codemirror/view"
import {MergeView} from "@codemirror/merge"
import {basicSetup} from '@uiw/codemirror-extensions-basic-setup';
import {useTheme} from "@/store/setting"
import {githubLight, githubDark} from '@uiw/codemirror-theme-github';
import {initialize, useAction} from "@/store/action";
import formatter from "@/tools/code/formatter";
import {allLanguage, getEditorLanguage} from "@/helper/code";
import event from "@/event";

type MergeConfig = ConstructorParameters<typeof MergeView>

type DataType = {
    a: string,
    b: string,
    option: {
        lineWrapping: boolean
        lang: string
        collapse: boolean
        revert: MergeConfig[0]['revertControls']
    }
}
const action = useAction(await initialize<DataType>({
    a: "",
    b: "",
    option: {
        lineWrapping: true,
        lang: "Text",
        collapse: false,
        revert: "b-to-a",
    }
}, {paste: false}))

const storeTheme = useTheme()

let container = $ref<HTMLElement | null>(null);
let mergeView = $ref<MergeView | null>(null);
const difference = $ref<{ index: number, chunks: { fromA: number }[] }>({
    index: 0,
    chunks: []
})

const getLanguage = async (selectLang: string) => {
    const languageLoader = getEditorLanguage(selectLang)
    return languageLoader ? await languageLoader.load() : []
}

const getExtensions = async () => {
    return [
        // 主题
        storeTheme.theme.raw === "dark" ? githubDark : githubLight,
        // 内容更新
        EditorView.updateListener.of((vu: ViewUpdate) => {
            if (!mergeView) {
                return
            }
            if (vu.docChanged) {
                if (vu.view.dom.contains(mergeView.a.dom as any)) {
                    if (vu.state.doc.toString() !== action.current.a) {
                        action.current.a = vu.state.doc.toString()
                    }
                }
                if (vu.view.dom.contains(mergeView.b.dom as any)) {
                    if (vu.state.doc.toString() !== action.current.b) {
                        action.current.b = vu.state.doc.toString()
                    }
                }
            }
        }),
        // 代码语言
        await getLanguage(action.current.option.lang),
        // 自动换行
        action.current.option.lineWrapping ? EditorView.lineWrapping : [],
        // 默认字符
        placeholder($t('main_ui_input')),
        // 通用组件
        basicSetup(),
    ]
}

const init = async (element: HTMLElement) => {
    if (mergeView) {
        mergeView.destroy()
    }
    mergeView = new MergeView({
        a: {
            doc: action.current.a,
            extensions: await getExtensions()
        },
        b: {
            doc: action.current.b,
            extensions: await getExtensions()
        },
        parent: element,
        revertControls: action.current.option.revert,
        collapseUnchanged: action.current.option.collapse ? {} : undefined,
        highlightChanges: true,
        gutter: true
    })
}

const beautify = async () => {
    action.current.a = await formatter.simple(action.current.option.lang, 'beautify', action.current.a)
    action.current.b = await formatter.simple(action.current.option.lang, 'beautify', action.current.b)
    init(<HTMLElement>container)
}

const location = (type: "next" | "last") => {
    if (!mergeView) {
        return;
    }
    const index = type === "next" ? difference.index + 1 : difference.index - 1
    const chunk = difference.chunks[index]
    if (chunk) {
        mergeView.dom.scrollTo({
            top: mergeView.a.lineBlockAt(chunk.fromA).top,
            behavior: 'smooth'
        })
        difference.index = index
    }
}

onMounted(() => {
    setTimeout(() => {
        init(<HTMLElement>container)
    }, 200)
    event.addListener('content_clear', () => {
        action.current.a = ""
        action.current.b = ""
        init(<HTMLElement>container)
    })
})

onUnmounted(() => {
    mergeView?.destroy()
});

// 初始化重新编辑器
watch(() => {
    return {
        color: storeTheme.theme.raw,
        option: action.current.option
    }
}, () => init(<HTMLElement>container), {deep: true})

// 获取差异数据
watch(() => {
    return {
        a: action.current.a,
        b: action.current.b,
    }
}, () => {
    setTimeout(() => {
        if (!mergeView) {
            return;
        }
        difference.index = 0
        difference.chunks = mergeView['chunks'].map((item) => {
            return {fromA: item.fromA}
        }) || []
    }, 1000)
}, {immediate: true})

// 数据保存
watch(() => action.current, () => {
    if (action.current.a === "" || action.current.b === "") {
        return;
    }
    action.save()
}, {deep: true})

</script>
<style>
.ctool-diff .cm-mergeView {
    height: 100%;
    border-color: var(--ctool-border-color);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    font-size: .875rem;
}

.ctool-diff .cm-editor {
    cursor: auto;
}

.ctool-diff .cm-editor {
    background-color: var(--ctool-form-element-background-color);
}

.ctool-diff .cm-editor .cm-gutters {
    background-color: var(--ctool-block-title-bg-color);
}

.ctool-diff .cm-editor.cm-focused {
    outline: unset;
}

.ctool-diff .cm-editor input:not([type=checkbox], [type=radio], [type=range]) {
    width: auto;
}

.ctool-diff .cm-editor label {
    display: unset;
}

.ctool-diff .cm-editor button {
    width: auto;
    display: unset;
    color: unset;
}

.ctool-diff .cm-editor form {
    margin-bottom: 0;
}

.ctool-diff .cm-merge-revert button {
    color: unset;
}
</style>
