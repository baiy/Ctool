<template>
    <heightResize ignore :append="['.page-option-block']" @resize="resize">
        <autoHeightTextarea v-model="current.input" :height="inputHeight" :placeholder="$t('hexString_input')"/>
        <option-block class="page-option-block">
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('hex')">String -> Hex</Button>
                    <Button type="primary" @click="handle('str')">Hex -> String</Button>
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
                const convert = (from, to) => str => Buffer.from(str, from).toString(to)
                switch (type) {
                    case "hex":
                        this.current.output = convert('utf8', 'hex')(this.current.input);
                        break;
                    case "str":
                        this.current.output = convert('hex', 'utf8')(this.current.input.trim().replace(/\s+/g, ""));
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
