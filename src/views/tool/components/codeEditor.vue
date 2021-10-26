<template>
     <div ref="container" class="code-editor" :style="`height:${containerHeight};width:${width}`"></div>
</template>
<script>
import formatter from "../library/formatter";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const allowFormatterLanguage = {
    html: "html",
    typescript: "ts",
    javascript: "js",
    json: "json",
    graphql: "graphql",
    java: "java",
    markdown: "markdown",
    php: "php",
    css: "css",
    scss: "scss",
    less: "less",
    sql: "sql",
    xml: "xml",
    yaml: "yaml",
    vue: "vue",
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
        autoHeight: {
            type: Number,
            default: 0
        },
        theme: {
            type: String,
            default: 'vs'
        },
        roundedSelection: {
            type: Boolean,
            default: true
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
                if (this.value !== this.editor.getValue()){
                    this.$emit('input', this.editor.getValue())
                }
            })
        },
        /** @return monaco.editor.IStandaloneCodeEditor*/
        getEditor() {
            return this.editor
        },
        format(lang,option = {}) {
            if (!(lang in allowFormatterLanguage)){
                throw new Error("当前代码无法格式化");
            }
            this.$emit('input', formatter(this.editor.getValue(), allowFormatterLanguage[lang],option))
        }
    }
};
</script>

