<template>
    <heightResize :append="['.page-option-block']" ignore @resize="resize">
        <autoHeightTextarea :height="inputHeight" v-model="current.input" :placeholder="$t('pinyin_input')" />
        <option-block class="page-option-block">
            <FormItem>
                <RadioGroup v-model="current.operation" type="button" button-style="solid">
                    <Radio label="normal">{{ $t('pinyin_normal') }}</Radio>
                    <Radio label="tone">{{ $t('pinyin_tone') }}</Radio>
                    <Radio label="abbr">{{ $t('pinyin_abbr') }}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Select v-model="current.delimiter" style="width:200px">
                    <Option v-for="(d,k) in delimiter" :value="d.v" :key="k">{{ d.n }}</Option>
                </Select>
            </FormItem>
        </option-block>
        <autoHeightTextarea :height="outputHeight" :value="output" :placeholder="$t('pinyin_output')" />
    </heightResize>
</template>
<script>
import "./pinyin/dict"
import "ipinyinjs"
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

function py(type, str, delimiter) {
    let pinyin = {
        abbr: function (str, delimiter) {
            return window.pinyinUtil.getFirstLetter(str).split('').join(delimiter);
        },
        tone: function (str, delimiter) {
            return window.pinyinUtil.getPinyin(str, delimiter);
        },
        normal: function (str, delimiter) {
            return window.pinyinUtil.getPinyin(str, delimiter, false);
        }
    };
    str = str.split("\n");
    for (let i = 0; i < str.length; i++) {
        str[i] = pinyin[type](str[i], delimiter);
    }
    return str.join("\n");
}

export default {
    components:{
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
                result = py(
                    this.current.operation,
                    this.current.input,
                    this.current.delimiter === "null" ? "" : (this.current.delimiter === "blank" ? " " : this.current.delimiter)
                );
                this.$saveToolData(this.current);
            }
            return result
        }
    },
    methods:{
        resize(height){
            this.inputHeight = Math.min(Math.ceil(height/2),160);
            this.outputHeight = height - this.inputHeight;
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: "",
                delimiter: "null",
                operation: "normal"
            },
            delimiter: [
                {"n": this.$t('pinyin_delimiter_null'), "v": "null"},
                {"n": this.$t('pinyin_delimiter_space'), "v": "blank"},
                {"n": this.$t('pinyin_delimiter_1'), "v": "-"},
                {"n": this.$t('pinyin_delimiter_2'), "v": "_"},
                {"n": this.$t('pinyin_delimiter_3'), "v": "."}
            ],
            inputHeight:100,
            outputHeight:100,
        }
    },
}
</script>
