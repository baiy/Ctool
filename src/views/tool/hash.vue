<template>
    <div id="tool-hash">
        <Row :gutter="10">
            <Col span="10">
                <div style="position: relative;">
                    <input-block>
                        <heightResize>
                            <autoHeightTextarea v-model="current.input" :placeholder="$t('hash_content')"/>
                        </heightResize>
                        <template slot="extra">
                            <updateFile @success="handleUpload"/>
                            <Checkbox style="margin-left: 10px" v-model="current.isUppercase">{{
                                    $t('hash_uppercase')
                                }}
                            </Checkbox>
                        </template>
                    </input-block>
                    <disableMask v-if="isUploadFile" @close="uploadFile = {}">
                        {{ this.uploadFile.file.name }}
                    </disableMask>
                </div>
            </Col>
            <Col span="14">
                <heightResize @resize="resize">
                    <input-block :style="`margin-top: ${no >0 ? 5 : 0}px;`" :text="type" v-for="(type,no) in types"
                                 :key="type" @on-default-right-bottom-click="()=>$copy(result(type))">
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
import updateFile from './components/updateFile';
import disableMask from "./components/disableMask.vue";
const sm = require('sm-crypto');
export default {
    components: {
        updateFile,
        heightResize,
        autoHeightTextarea,
        disableMask
    },
    created() {
        this.$initToolData('input')
    },
    computed: {
        realInput() {
            return this.isUploadFile ? this.uploadFile.data : this.current.input
        },
        md5() {
            let result = crypto.MD5(this.realInput).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sha1() {
            let result = crypto.SHA1(this.realInput).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sha256() {
            let result = crypto.SHA256(this.realInput).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sha512() {
            let result = crypto.SHA512(this.realInput).toString();
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        sm3() {
            let result = sm.sm3(this.realInput);
            return this.current.isUppercase ? result.toUpperCase() : result;
        },
        isUploadFile() {
            return "file" in this.uploadFile
        },
    },
    watch: {
        current: {
            handler() {
                if (this.current.input) {
                    this.$saveToolData(this.current);
                }
            },
            deep: true
        }
    },
    methods: {
        result(type) {
            if (!this.realInput) {
                return "";
            }
            return this[type]
        },
        resize(height) {
            this.outputHeight = (height - 20) / 5
        },
        handleUpload(file) {
            let r = new FileReader()
            r.readAsBinaryString(file)
            r.onloadend = () => {
                let data = crypto.enc.Latin1.parse(r.result);
                if (data) {
                    this.uploadFile = {file, data}
                }
            }
        },
    },
    data() {
        return {
            current: {
                input: "",
                isUppercase: false,
            },
            uploadFile: {},
            types: ['md5', 'sha1', 'sha256', 'sha512', "sm3"],
            outputHeight: 100
        }
    },
}
</script>
