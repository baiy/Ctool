<template>
    <heightResize ignore :append="['.page-option-block']" @resize="resize">
        <autoHeightTextarea v-model="current.input" :height="inputHeight" :placeholder="$t('html_input')"/>
        <option-block class="page-option-block">
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">{{ $t('html_encode') }}</Button>
                    <Button type="primary" @click="handle('decode')">{{ $t('html_decode') }}</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <autoHeightTextarea :value="current.output" :height="outputHeight" :placeholder="$t('html_output')"/>
    </heightResize>
</template>
<script>
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData('input')
    },
    methods: {
        handle(v) {
            if (this.current.input) {
                if (v === "encode") {
                    this.current.output = require('js-htmlencode').htmlEncode(this.current.input);
                } else {
                    this.current.output = require('js-htmlencode').htmlDecode(this.current.input);
                }
                this.current.operation = v;
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            }
        },
        resize(height) {
            this.inputHeight = Math.min(160, Math.ceil(height / 2))
            this.outputHeight = height - this.inputHeight
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                operation: ""
            },
            inputHeight: 100,
            outputHeight: 100
        }
    },
}
</script>
