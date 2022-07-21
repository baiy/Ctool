<template>
    <div id="tool-hash">
        <Row :gutter="10">
            <Col span="10">
                <div style="position: relative;">
                    <heightResize ignore :append="['.page-hash-salt']" @resize="inputResize">
                        <input-block>
                            <autoHeightTextarea :height="inputHeight" v-model="current.input" :placeholder="$t('hash_content')"/>
                            <template slot="extra">
                                <updateFile @success="handleUpload"/>
                                <Checkbox style="margin-left: 10px" v-model="current.isUppercase">{{
                                        $t('hash_uppercase')
                                    }}
                                </Checkbox>
                                <Checkbox style="margin-left: 10px" v-model="current.isSalt">{{ $t('hash_salt') }}</Checkbox>
                            </template>
                        </input-block>
                    </heightResize>
                    <div class="page-hash-salt" v-show="current.isSalt">
                        <Input v-model="current.salt" style="padding: 5px 0">
                            <span slot="prepend">{{ $t('hash_salt_value') }}</span>
                        </Input>
                        <Input v-model="current.saltExp">
                            <span slot="prepend">{{ $t('hash_salt_mode') }}</span>
                            <Select :placeholder="$t('hash_salt_select')" slot="append" style="width: 120px;text-align: left" @on-change="saltExpSelect">
                                <Option v-for="(item,i) of saltExpLists" :key="i" :value="item">{{item}}</Option>
                            </Select>
                        </Input>
                    </div>
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
import hashHandle from "./library/hash";
import {dispatchWindowResize} from '../../tool/event'
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
        },
        "current.isSalt":()=>{
            dispatchWindowResize()
        }
    },
    methods: {
        result(type) {
            if (!this.realInput) {
                return "";
            }
            try {
                let result = hashHandle(type, this.realInput, this.current.salt, this.current.isSalt ? this.current.saltExp : "");
                return this.current.isUppercase ? result.toUpperCase() : result;
            }catch (e) {
                return e.message
            }
        },
        resize(height) {
            this.outputHeight = (height - 20) / 5
        },
        inputResize(height) {
            this.inputHeight = height
        },
        handleUpload(file) {
            let r = new FileReader()
            r.readAsBinaryString(file)
            r.onloadend = () => {
                let data = crypto.enc.Latin1.parse(r.result);
                if (data) {
                    this.current.isSalt = false
                    this.uploadFile = {file, data}
                }
            }
        },
        saltExpSelect(value){
            this.current.saltExp = value
        }
    },
    data() {
        return {
            current: {
                input: "",
                salt: "",
                saltExp: "hash(hash($input.$salt).$salt)",
                isSalt: false,
                isUppercase: false,
            },
            uploadFile: {},
            types: ['md5', 'sha1', 'sha256', 'sha512', "sm3"],
            outputHeight: 100,
            inputHeight: 100,
            saltExpLists:[
                'hash(hash($input))',
                'hash($input.$salt)',
                'hash(hash($input).$salt)',
                'hash($input).hash($salt)',
                'hash(hash(hash($input)))',
                'hash($salt.$input.$salt)',
                'hash(hash($input.$salt).$salt)',
                'hash($salt.hash($input.$salt).$salt)',
                'hash($salt.hash($salt.$input.$salt).$salt)',
            ]
        }
    },
}
</script>
