<template>
    <heightResize :append="['.page-option-block']" ignore @resize="resize">
        <autoHeightTextarea :height="inputHeight" v-model="current.input" :placeholder="$t('url_input')" />
        <option-block class="page-option-block">
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">{{ $t('url_encode') }}</Button>
                    <Button type="primary" @click="handle('decode')">{{ $t('url_decode') }}</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
        <autoHeightTextarea :height="outputHeight" :value="current.output" :placeholder="$t('url_output')" />
    </heightResize>
</template>
<script>
import decodeUriComponent from "decode-uri-component";
import strictUriEncode from "strict-uri-encode";
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";
export default {
    components:{
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData('input')
    },
    methods: {
        handle(v) {
            if (this.current.input) {
                try {
                    this.current.operation = v;
                    this.current.output = v === "encode" ? strictUriEncode(this.current.input) : decodeUriComponent(this.current.input);
                    this.$clipboardCopy(this.current.output);
                    this.$saveToolData(this.current);
                }catch (e){
                    this.current.output = `error: ${e.message}`
                }
            }
        },
        resize(height){
            this.inputHeight = Math.min(160,Math.ceil(height/2));
            this.outputHeight = height - this.inputHeight;
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                operation: ""
            },
            inputHeight:100,
            outputHeight:100,
        }
    },
}
</script>
