<template>
    <div ref="container" class="diff-editor" :style="`height:${height};width:${width}`"></div>
</template>
<script>
import {createMerge} from "../library/editor";

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
        collapse: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: "100%"
        },
        width: {
            type: String,
            default: "100%"
        },

    },
    watch: {
        value: {
            handler(val) {
                if (this.editor !== null) {
                    this.editor.customSetValue(val)
                }
            },
            deep: true
        },
        language(newValue) {
            if (this.editor !== null) {
                this.editor.customSetEditorLanguage(newValue);
            }
        },
        collapse() {
            this.reset()
        }
    },
    mounted() {
        this.reset()
    },
    data() {
        return {
            editor: null,
        }
    },
    methods: {
        reset() {
            this.$refs.container.innerHTML = "";
            this.initEditor();
        },
        initEditor() {
            this.editor = createMerge(this.value, this.$refs.container, this.language, {collapseIdentical: this.collapse ? 2 : false})
            this.editor.customChange((original, modified) => {
                if (original !== this.value.original || modified !== this.value.modified) {
                    this.value.original = original
                    this.value.modified = modified
                    this.$emit('input', this.value)
                }
            })
        },
    }
};
</script>

<style>
.diff-editor .CodeMirror-merge {
    border: none;
}

.diff-editor .CodeMirror-merge, .diff-editor .CodeMirror-merge-pane, .diff-editor .CodeMirror-merge .CodeMirror {
    height: 100%;
}
</style>

