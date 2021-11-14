<template>
    <Input :style="style" class="auto-height-textarea" v-model="textarea" type="textarea"
           :placeholder="placeholder"></Input>
</template>
<script>
import _ from "lodash";

// 窗口高度调整 返回工具页面可操作性高度
export default {
    name: 'autoHeightTextarea',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        height: {
            type: [String, Number],
            default: ''
        },
    },
    data() {
        return {
            textarea: ""
        }
    },
    computed: {
        style() {
            let css = [];
            if (this.height) {
                css.push(`height:${this.height}${_.isNumber(this.height) ? 'px' : ''}`)
            }
            return css.join(";")
        }
    },
    watch: {
        textarea(value) {
            if (value !== this.value) {
                this.$emit('input', value)
            }
        },
        value(value) {
            if (value !== this.textarea) {
                this.textarea = value
            }
        }
    },
    created() {
        this.textarea = this.value
    }
};
</script>
<style>
.auto-height-textarea, .auto-height-textarea textarea.ivu-input {
    height: 100%;
}
</style>
