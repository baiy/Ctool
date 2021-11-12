<template>
    <div id="tool-hash">
        <Row :gutter="10">
            <Col span="8">
                <input-block :text="$t('hash_content')">
                    <Input v-model="current.input" :rows="18" type="textarea" :placeholder="$t('hash_content')"></Input>
                    <Checkbox slot="extra" v-model="current.isUppercase">{{ $t('hash_uppercase') }}</Checkbox>
                </input-block>
            </Col>
            <Col span="16">
                <input-block style="margin-bottom: 6px" :text="type" v-for="type in types" :key="type" @on-default-right-bottom-click="()=>copy(type)">
                    <Input :value="result(type)" :placeholder="type" :rows="3" type="textarea"></Input>
                </input-block>
            </Col>
        </Row>
    </div>
</template>
<script>
import crypto from "crypto-js"

const sm = require('sm-crypto');
export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
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
        }
    },
    data() {
        return {
            current: {
                input: "",
                isUppercase: false,
            },
            types: ['md5', 'sha1', 'sha256', 'sha512', "sm3"]
        }
    },
}
</script>
