<template>
    <div ref="container" class="monaco-editor"
         :style="`height:${containerHeight};width:${width}`">
    </div>
</template>
<script>
import formatter from "../library/formatter";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// 注册文本格式化服务
// html/typescript/javascript/json 使用内置服务
const allowFormatterLanguage = [
    {id: "css", format: "css"},
    {id: "graphql", format: "graphql"},
    {id: "java", format: "java"},
    {id: "markdown", format: "markdown"},
    {id: "php", format: "php"},
    {id: "scss", format: "scss"},
    {id: "sql", format: "sql"},
    {id: "xml", format: "xml"},
    {id: "yaml", format: "yaml"},
]
for (let lang of allowFormatterLanguage) {
    monaco.languages.registerDocumentFormattingEditProvider(lang.id, {
        provideDocumentFormattingEdits(model) {
            return [
                {
                    range: model.getFullModelRange(),
                    text: formatter(model.getValue(), lang.format),
                },
            ];
        }
    });
}

export default {
    name: 'codeEditor',
    props: {
        value: {
            type: String
        },
        language: {
            type: String,
            default: ""
        },
        theme: {
            type: String,
            default: 'vs'
        },
        roundedSelection: {
            type: Boolean,
            default: true
        },
        autoHeight: {
            type: Number,
            default: 0
        },
        height: {
            type: String,
            default: "350px"
        },
        width: {
            type: String,
            default: "100%"
        },
    },
    watch: {
        value(newValue) {
            if (this.editor !== null && this.editor.getValue() !== newValue) {
                this.editor.setValue(newValue)
            }
        },
        language(newValue) {
            if (this.editor !== null) {
                monaco.editor.setModelLanguage(this.editor.getModel(), newValue)
            }
        },
        theme(newValue) {
            if (this.editor !== null) {
                monaco.editor.setTheme(newValue)
            }
        }
    },
    created() {
        if (this.autoHeight > 0) {
            this.containerHeight = (window.innerHeight - this.autoHeight) + "px"
        } else {
            this.containerHeight = this.height
        }
    },
    mounted() {
        this.initEditor()
    },
    data() {
        return {
            editor: null,
            containerHeight: ""
        }
    },
    methods: {
        initEditor() {
            this.$refs.container.innerHTML = ''
            this.editor = monaco.editor.create(this.$refs.container, {
                value: this.value,
                language: this.language,
                theme: this.theme,
                roundedSelection: this.roundedSelection,
                automaticLayout: true
            })
            this.editor.onDidChangeModelContent(() => {
                this.$emit('input', this.editor.getValue())
            })
        },
        /** @return monaco.editor.IStandaloneCodeEditor*/
        getEditor() {
            return this.editor
        }
    }
};
</script>

