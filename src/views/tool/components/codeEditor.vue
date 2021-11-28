<template>
    <input-block right="5px" bottom="5px" :style="style">
        <div ref="container" class="code-editor" :style="`height:100%;width:${width}`"></div>
        <template slot="extra">
            <Checkbox v-if="showLineWrappingSet !== 'null'" v-model="lineWrapping">{{ $t('main_editor_line_wrapping') }}</Checkbox>
        </template>
    </input-block>
</template>
<script>
import {format} from "../library/formatter";
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
        enableBorder: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: ""
        },
        showLineWrappingSet: {
            type: String,
            default: "null"
        },
        height: {
            type: String,
            default: "100%"
        },
        hideLineNumbers: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: "100%"
        },
    },
    computed: {
        style() {
            let css = [`height:${this.height}`];
            if (this.enableBorder) {
                css.push("border: 1px solid #dcdee2")
                css.push("border-radius: 4px")
            }
            return css.join(";")
        }
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
        },
        lineWrapping(newValue) {
            if (this.editor !== null) {
                this.editor.setOption("lineWrapping", newValue);
            }
        }
    },
    mounted() {
        this.initEditor()
    },
    data() {
        return {
            editor: null,
            lineWrapping: true,
        }
    },
    created() {
        if (this.showLineWrappingSet !== 'null') {
            this.lineWrapping = this.showLineWrappingSet === 'yes'
        }
    },
    methods: {
        initEditor() {
            this.editor = create(
                this.$refs.container,
                this.language,
                {
                    lineNumbers: !this.hideLineNumbers,
                    lineWrapping: this.lineWrapping,
                    placeholder: this.placeholder
                }
            );
            this.editor.setValue(this.value)
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
            this.$emit('input', format(this.editor.getValue(), lang, false, option))
        },
        compress(lang) {
            this.$emit('input', format(this.editor.getValue(), lang, true))
        }
    }
};
</script>
<style>
.CodeMirror {
    height: 100%;
}

.CodeMirror pre.CodeMirror-placeholder {
    color: #999;
}
</style>

