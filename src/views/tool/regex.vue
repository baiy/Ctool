<template>
    <div>
        <Row :gutter="16" style="margin-bottom: 10px" class="page-option-block">
            <Col span="12">
                <input-block :text="$t('regex_reference')" @on-default-right-bottom-click="reference">
                    <Input v-model="current.input">
                        <Select slot="prepend" @on-change="commonSelect" :placeholder="$t('regex_expression')"
                                style="width:100px">
                            <Option style="text-align: left" v-for="(v,k) in regex" :value="v.regex" :key="k">{{v.name}}
                            </Option>
                        </Select>
                    </Input>
                </input-block>
            </Col>
            <Col span="12">
                <input-block>
                    <Input v-model="current.replace" :disabled="current.isDelete">
                        <span slot="prepend">{{ $t('regex_replace_content') }}</span>
                    </Input>
                    <template slot="extra">
                        <Checkbox v-model="current.isDelete">{{ $t('regex_delete') }}</Checkbox>
                    </template>
                </input-block>
            </Col>
        </Row>
        <heightResize :append="['.page-option-block']" @resize="resize">
            <Row :gutter="16">
                <Col span="12">
                    <input-block>
                        <autoHeightTextarea :height="height" v-model="current.content"
                                            :placeholder="$t('regex_input')"/>
                        <template slot="extra">
                            <Checkbox v-model="current.isGlobal">{{ $t('regex_global') }}</Checkbox>
                            <Checkbox v-model="current.isIgnoreCase">{{ $t('regex_ignore_case') }}</Checkbox>
                        </template>
                    </input-block>
                </Col>
                <Col span="12">
                    <autoHeightTextarea :height="height" :value="output"
                                        :placeholder="$t('regex_output')"/>
                </Col>
            </Row>
        </heightResize>
    </div>
</template>
<script>
import {openUrl} from "../../helper";
import autoHeightTextarea from "./components/autoHeightTextarea";
import heightResize from "./components/heightResize";

export default {
    components: {
        autoHeightTextarea,
        heightResize
    },
    created() {
        this.$initToolData('input')
    },
    computed: {
        replaceContent(){
            if (!this.current.isDelete && !this.current.replace){
                return false
            }
            return this.current.isDelete ? "" : this.current.replace;
        },
        output() {
            let result = "";
            try {
                if (!this.current.input || !this.current.content) {
                    return result;
                }

                let reg = new RegExp(
                    this.current.input, (this.current.isIgnoreCase ? 'i' : '') + (this.current.isGlobal ? 'g' : '')
                );
                if (this.replaceContent !== false) {
                    result = this.current.content.replace(reg, this.replaceContent);
                } else {
                    let arr = this.current.content.match(reg);
                    let string = '';
                    if (arr) {
                        string += this.$t('regex_output_count', [arr.length]) + "\n";
                        for (let i = 0; i < arr.length; i++) {
                            string += ("$" + i + " -> " + arr[i]) + "\r\n";
                        }
                    } else {
                        string = this.$t('regex_output_emty');
                    }
                    result = string
                }
                this.$saveToolData(this.current);
            } catch (e) {
                result = this.$t('regex_error', [e.message])
            }
            return result
        }
    },
    methods: {
        resize(height) {
            this.height = height;
        },
        reference() {
            openUrl(this.$t('regex_reference_url').toString())
        },
        commonSelect(v) {
            this.current.input = v;
        }
    },
    data() {
        return {
            current: {
                input: "[\\dheo]",
                content: ((new Date).getFullYear()) + " hello WORLD 你好世界",
                output: "",
                replace: "",
                isGlobal: true,
                isIgnoreCase: true,
                isDelete: false
            },
            height: 100,
            regex: [
                {regex: "[\\u4e00-\\u9fa5]", name: this.$t('regex_type_zh')},
                {regex: "[^\\x00-\\xff]", name: this.$t('regex_type_complex')},
                {regex: "\\n\\s*\\r", name: this.$t('regex_type_blank')},
                {
                    regex: "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?",
                    name: this.$t('regex_type_email')
                },
                {regex: "[a-zA-z]+://[^\\s]*", name: this.$t('regex_type_url')},
                {regex: "[1][3,4,5,7,8][0-9]{9}", name: this.$t('regex_type_cn_mobile')},
                {regex: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", name: this.$t('regex_type_ip')},
                {regex: "\\d{3}-\\d{8}|\\d{4}-\\d{7,8}", name: this.$t('regex_type_cn_tel')},
                {regex: "[1-9][0-9]{4,}", name: this.$t('regex_type_tencent_qq')},
                {regex: "[1-9]\\d{5}(?!\\d)", name: this.$t('regex_type_cn_postcode')},
                {
                    regex: "([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))",
                    name: this.$t('regex_type_date')
                },
                {regex: "[1-9]\\d*", name: this.$t('regex_type_positive_integer')},
                {regex: "-[1-9]\\d*", name: this.$t('regex_type_negative_integer')},
                {regex: "-?[1-9]\\d*", name: this.$t('regex_type_integer')},
                {regex: "[1-9]\\d*|0", name: this.$t('regex_type_non_negative_integer')},
                {regex: "-[1-9]\\d*|0", name: this.$t('regex_type_non_positive_integer')},
                {regex: "[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*", name: this.$t('regex_type_positive_float')},
                {regex: "-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*", name: this.$t('regex_type_negative_float')}
            ]
        }
    },
}
</script>
