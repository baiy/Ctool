<template>
    <heightResize ignore :append="['.page-option-block']" @resize="resize">
        <autoHeightTextarea v-model="current.input" :height="inputHeight" :placeholder="$t('hexString_input')"/>
        <option-block class="page-option-block">
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('hex')">Base64 -> Hex</Button>
                    <Button type="primary" @click="handle('base64')">Hex -> Base64</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUppercase">{{ $t('hexString_uppercase') }}</Checkbox>
            </FormItem>
        </option-block>
        <autoHeightTextarea :value="current.output" :height="outputHeight" :placeholder="$t('hexString_output')"/>
    </heightResize>
</template>
<script>
import CryptoJS from "crypto-js"
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
        handle(type) {
            if (this.current.input) {
                switch (type) {
                    case "hex":
                        this.current.output = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(this.current.input));
                        break;
                    case "base64":
                        this.current.output = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(this.current.input));
                        break;
                    default:
                        return;
                }
                if (this.current.isUppercase && type === "hex") {
                    this.current.output = this.current.output.toUpperCase()
                }
                this.current.operation = type;
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
                isUppercase: false,
                output: "",
                operation: ""
            },
            inputHeight: 100,
            outputHeight: 100
        }
    },
}
</script>
