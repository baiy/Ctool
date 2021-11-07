<template>
    <div ref="container" class="code-editor" :style="`height:${containerHeight};width:${width}`"></div>
</template>
<script>
import {compress, format} from "../library/formatter";
import {create} from "../library/editor";

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
                this.editor.customSetEditorLanguage(newValue);
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
            this.editor = create(this.$refs.container, this.language);
            this.editor.setValue(this.value)
            this.editor.setSize(null, this.containerHeight)
            this.editor.on('change', editor => {
                if (this.value !== editor.getValue()) {
                    this.$emit('input', editor.getValue())
                }
            })
        },
        getEditor() {
            return this.editor
        },
        format(lang, option = {}) {
            this.$emit('input', format(this.editor.getValue(), lang, option))
        },
        compress(lang) {
            this.$emit('input', compress(this.editor.getValue(), lang))
        }
    }
};
</script>

