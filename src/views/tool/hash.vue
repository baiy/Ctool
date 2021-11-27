<template>
    <div id="tool-hash">
        <Row :gutter="10">
            <Col span="8">
                <input-block>
                    <heightResize>
                        <autoHeightTextarea v-model="current.input" :placeholder="$t('hash_content')"/>
                    </heightResize>
                    <Checkbox slot="extra" v-model="current.isUppercase">{{ $t('hash_uppercase') }}</Checkbox>
                </input-block>
            </Col>
            <Col span="16">
                <heightResize @resize="resize">
                    <input-block :style="`margin-top: ${no >0 ? 5 : 0}px;`" :text="type" v-for="(type,no) in types" :key="type" @on-default-right-bottom-click="()=>copy(type)">
                        <autoHeightTextarea :value="result(type)" :height="outputHeight" :placeholder="type"/>
                    </input-block>
                </heightResize>
            </Col>
        </Row>
    </div>
</template>
<script>
import crypto from "crypto-js"
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

const sm = require('sm-crypto');
export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData('input')
    },
    computed: {
        md5() {
            let result = crypto.MD5(this.current.input).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sha1() {
            let result = crypto.SHA1(this.current.input).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sha256() {
            let result = crypto.SHA256(this.current.input).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sha512() {
            let result = crypto.SHA512(this.current.input).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sm3() {
            let result = sm.sm3(this.current.input);
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
    },
    watch: {
        current: {
            handler() {
                if (this.current.input){
                    this.$saveToolData(this.current);
                }
            },
            deep: true
        }
    },
    methods:{
        result(type){
            if (!this.current.input) {
                return "";
            }
            return this[type]
        },
        copy(type){
            if (this[type]){
                this.$clipboardCopy(this[type])
            }
        },
        resize(height){
            this.outputHeight = (height - 20)/5
        }
    },
    data() {
        return {
            current: {
                input: "",
                isUppercase: false,
            },
            types: ['md5', 'sha1', 'sha256', 'sha512', "sm3"],
            outputHeight:100
        }
    },
}
</script>
