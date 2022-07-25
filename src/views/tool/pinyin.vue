<template>
    <heightResize :append="['.page-option-block']" ignore @resize="resize">
        <autoHeightTextarea :height="inputHeight" v-model="current.input" :placeholder="$t('pinyin_input')"/>
        <option-block class="page-option-block">
            <FormItem>
                <RadioGroup v-model="current.operation" type="button" button-style="solid">
                    <Radio label="normal">{{ $t('pinyin_normal') }}</Radio>
                    <Radio label="tone">{{ $t('pinyin_tone') }}</Radio>
                    <Radio label="abbr">{{ $t('pinyin_abbr') }}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Select v-model="current.delimiter" style="width:120px">
                    <Option v-for="(d,k) in delimiter" :value="d.v" :key="k">{{ d.n }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.multiple_flag">{{
                        $t('pinyin_multiple_flag')
                    }}
                </Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.replace_v">ü=>v</Checkbox>
            </FormItem>
            <FormItem v-if="current.operation === 'tone'">
                <Checkbox v-model="current.tone_is_number">{{
                        $t('pinyin_tone_is_number')
                    }}
                </Checkbox>
            </FormItem>
        </option-block>
        <autoHeightTextarea :height="outputHeight" :value="output" :placeholder="$t('pinyin_output')"/>
    </heightResize>
</template>
<script>
import heightResize from "./components/heightResize";
import pinyin from "./library/pinyin";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData('input')
    },
    computed: {
        output() {
            let result = "";
            if (this.current.input.trim()) {
                result = pinyin(
                    this.current.input,
                    this.current.delimiter === "null" ? "" : (this.current.delimiter === "blank" ? " " : this.current.delimiter),
                    {...this.option, multiple_flag: this.current.multiple_flag, replace_v: this.current.replace_v}
                );
                this.$saveToolData(this.current);
            }
            return result
        },
        option() {
            if (this.current.operation === "normal") {
                return {
                    pattern: "pinyin",
                    tone: "",
                }
            }
            if (this.current.operation === "tone") {
                return {
                    pattern: "pinyin",
                    tone: this.current.tone_is_number ? "num" : "symbol",

                }
            }
            return {
                pattern: "first",
                tone: "",
            }
        }
    },
    methods: {
        resize(height) {
            this.inputHeight = Math.min(Math.ceil(height / 2), 160);
            this.outputHeight = height - this.inputHeight;
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                delimiter: "null",
                operation: "normal",
                multiple_flag: false,
                tone_is_number: false,
                replace_v: false,
            },
            delimiter: [
                {"n": this.$t('pinyin_delimiter_null'), "v": "null"},
                {"n": this.$t('pinyin_delimiter_space'), "v": "blank"},
                {"n": this.$t('pinyin_delimiter_1'), "v": "-"},
                {"n": this.$t('pinyin_delimiter_2'), "v": "_"},
                {"n": this.$t('pinyin_delimiter_3'), "v": "."}
            ],
            inputHeight: 100,
            outputHeight: 100,
        }
    },
}
</script>
