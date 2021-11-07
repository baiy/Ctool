<template>
    <div ref="container" class="diff-editor" :style="`height:${containerHeight};width:${width}`"></div>
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
        value() {
            this.reset()
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
    created() {
        if (this.autoHeight > 0) {
            this.containerHeight = (window.innerHeight - this.autoHeight) + "px"
        } else {
            this.containerHeight = this.height
        }
    },
    mounted() {
        this.reset()
    },
    data() {
        return {
            editor: null,
            containerHeight: ""
        }
    },
    methods: {
        reset() {
            this.$refs.container.innerHTML = "";
            this.initEditor();
        },
        initEditor() {
            this.editor = createMerge(this.value, this.$refs.container, this.language, {collapseIdentical: this.collapse ? 2 : false})
            this.editor.customSetSize(null, this.containerHeight)
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
.diff-editor .CodeMirror-merge, .diff-editor .CodeMirror-merge .CodeMirror {
    height: 100%;
}
</style>

