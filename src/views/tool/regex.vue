<template>
    <div>
        <Row :gutter="16" style="margin-bottom: 10px" class="page-option-block">
            <Col span="12">
                <input-block>
                    <Input type="textarea" :rows="3" v-model="current.input" :placeholder="$t('regex_expression')" />
                    <template slot="extra">
                        <referenceZh @on-select="(regex)=>current.input=regex" v-if="locale === 'zh_CN'" />
                        <referenceEn @on-select="(regex)=>current.input=regex" v-else />
                    </template>
                </input-block>
            </Col>
            <Col span="12">
                <input-block>
                    <Input v-model="current.replace" type="textarea" :rows="3" :placeholder="$t('regex_replace_content')" :disabled="current.isDelete === 1" />
                    <template slot="extra">
                        <RadioGroup v-model="current.isDelete">
                            <Radio :label="0">
                                {{ $t('regex_replace') }}
                            </Radio>
                            <Radio :label="1">
                                {{ $t('regex_delete') }}
                            </Radio>
                        </RadioGroup>
                    </template>
                </input-block>
            </Col>
        </Row>
        <heightResize :append="['.page-option-block']" @resize="resize">
            <Row :gutter="16">
                <Col span="12">
                    <input-block>
                        <autoHeightTextarea :height="height" v-model="current.content" :placeholder="$t('regex_input')"/>
                        <template slot="extra">
                            <Checkbox v-model="current.isGlobal">{{ $t('regex_global') }}</Checkbox>
                            <Checkbox v-model="current.isIgnoreCase">{{ $t('regex_ignore_case') }}</Checkbox>
                        </template>
                    </input-block>
                </Col>
                <Col span="12">
                    <autoHeightTextarea :height="height" :value="output" :placeholder="$t('regex_output')"/>
                </Col>
            </Row>
        </heightResize>
    </div>
</template>
<script>
import autoHeightTextarea from "./components/autoHeightTextarea";
import heightResize from "./components/heightResize";
import referenceEn from "./components/regex/referenceEn";
import referenceZh from "./components/regex/referenceZh";
import {getCurrentLocale} from "../../i18n";

export default {
    components: {
        autoHeightTextarea,
        heightResize,
        referenceEn,
        referenceZh
    },
    created() {
        this.$initToolData()
    },
    computed: {
        locale() {
            return getCurrentLocale()
        },
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
                isDelete: 0,
            },
            height: 100
        }
    },
}
</script>
