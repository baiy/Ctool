<template>
    <div ref="container" class="diff-editor" :style="`height:${containerHeight};width:${width}`"></div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default {
    name: 'diffEditor',
    props: {
        value: {
            type: Object
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
            if (this.editor !== null
                && (
                    this.original.getValue() !== newValue['original']
                    || this.modified.getValue() !== newValue['modified']
                )) {
                this.original.setValue(newValue['original'])
                this.modified.setValue(newValue['modified'])
            }
        },
        language(newValue) {
            if (this.editor !== null) {
                monaco.editor.setModelLanguage(this.editor.getOriginalEditor().getModel(), newValue)
                monaco.editor.setModelLanguage(this.editor.getModifiedEditor().getModel(), newValue)
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
            original: null,
            modified: null,
            containerHeight: ""
        }
    },
    methods: {
        initEditor() {
            this.$refs.container.innerHTML = ''
            this.editor = monaco.editor.createDiffEditor(this.$refs.container, {
                theme: this.theme,
                roundedSelection: this.roundedSelection,
                automaticLayout: true,
                renderSideBySide: true
            })
            this.original = monaco.editor.createModel(this.value['original'], this.language)
            this.modified = monaco.editor.createModel(this.value['modified'], this.language)
            this.editor.setModel({original: this.original, modified: this.modified})
            this.editor.getOriginalEditor().updateOptions({readOnly: false})

            this.original.onDidChangeContent(() => {
                if (this.value.original !== this.original.getValue()) {
                    this.value.original = this.original.getValue()
                    this.$emit('input', this.value)
                }
            })
            this.modified.onDidChangeContent(() => {
                if (this.value.modified !== this.modified.getValue()) {
                    this.value.modified = this.modified.getValue()
                    this.$emit('input', this.value)
                }
            })
        },
        // 行内模式
        inline(value) {
            if (this.editor) {
                value = !!value;
                this.editor.updateOptions({renderSideBySide: !!value})
                this.editor.getOriginalEditor().updateOptions({readOnly: !value})
                this.editor.getModifiedEditor().updateOptions({readOnly: !value})
            }
        }
    }
};
</script>

