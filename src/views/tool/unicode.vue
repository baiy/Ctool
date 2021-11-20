<template>
    <heightResize :append="['.page-option-block']" ignore @resize="resize">
        <autoHeightTextarea :height="inputHeight" v-model="current.input" :placeholder="$t('unicode_input')" />
        <option-block class="page-option-block">
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">{{ $t('unicode_encode') }}</Button>
                    <Button type="primary" @click="handle('decode')">{{ $t('unicode_decode') }}</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Select v-model="current.type" style="width:250px">
                    <Option value="unicode_point_default">{{ $t('unicode_mode_default') }} \u[0-9a-f]{4}</Option>
                    <Option value="unicode_point_wide">{{ $t('unicode_mode_wide') }} \u[0-9a-f]{4,6}</Option>
                    <Option value="unicode_point_wide_brace">{{ $t('unicode_mode_wide_bracket') }} \u{[0-9a-f]{4,6}}</Option>
                    <Option value="unicode_number">{{ $t('unicode_mode_number') }} U+[0-9A-F]{4,6}</Option>
                    <Option value="html_entity_10">{{ $t('unicode_mode_html_10') }} &amp;#[0-9]+;</Option>
                    <Option value="html_entity_16">{{ $t('unicode_mode_html_16') }} &amp;#x[0-9a-f]{1,6};</Option>
                    <Option value="css_entitie">{{ $t('unicode_mode_css_16') }} \[0-9a-f]{4,6}</Option>
                </Select>
            </FormItem>
            <FormItem v-if="!disable_ignore_ascii_select.includes(current.type)">
                <Checkbox v-model="current.ignore_ascii">{{ $t('unicode_ignore_ascii') }}</Checkbox>
            </FormItem>
        </option-block>
        <autoHeightTextarea :height="outputHeight" :value="current.output" :placeholder="$t('unicode_output')" />
    </heightResize>
</template>
<script>
import Unicode from "./library/unicode"
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
        handle(operation) {
            if (this.current.input) {
                try {
                    if (operation === "encode") {
                        this.current.output = Unicode.encode(
                            this.current.input,
                            this.current.type,
                            this.disable_ignore_ascii_select.includes(this.current.type) ? false : this.current.ignore_ascii
                        );
                    } else {
                        this.current.output = Unicode.decode(this.current.input, this.current.type);
                    }
                } catch (e) {
                    return this.$Message.error(this.$t('unicode_error',[e.message]).toString())
                }
                this.current.operation = operation;
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            }
        },
        resize(height){
            this.inputHeight = Math.ceil(height/2);
            this.outputHeight = height - this.inputHeight;
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                operation: "",
                type: "unicode_point_default",
                ignore_ascii: true,
            },
            inputHeight:100,
            outputHeight:100,
            disable_ignore_ascii_select: ['unicode_point_wide', 'unicode_number', 'css_entitie']
        }
    },
}
</script>
