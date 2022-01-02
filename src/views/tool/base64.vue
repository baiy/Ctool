<template>
    <heightResize @resize="resize" :reduce="52" ignore>
        <Tabs v-model="current.operation">
            <TabPane :label="$t('base64_encode')" name="encode">
                <div style="position: relative;">
                    <input-block style="margin-bottom: 10px">
                        <autoHeightTextarea :height="height1" v-model="current.encode.input"
                                            :placeholder="$t('base64_input')"/>
                        <template slot="extra">
                            <updateFile @success="handleUpload"/>
                        </template>
                    </input-block>
                    <disableMask v-if="isEncodeUploadFile" @close="encodeUploadFile = {}">
                        {{ this.encodeUploadFile.file.name }}
                    </disableMask>
                </div>
                <input-block>
                    <autoHeightTextarea :height="height2" :value="encodeOutput" :placeholder="$t('base64_output')"/>
                    <template slot="extra">
                        <Checkbox v-model="current.encode.is_url_safe">{{ $t('base64_url_safe') }}</Checkbox>
                    </template>
                </input-block>
            </TabPane>
            <TabPane :label="$t('base64_decode')" name="decode">
                <input-block style="margin-bottom: 10px">
                    <autoHeightTextarea :height="height1" v-model="current.decode.input"
                                        :placeholder="$t('base64_input')"/>
                </input-block>
                <input-block bottom="5px" right="20px">
                    <autoHeightTextarea :class="isDecodeShowBinaryData ? 'tool-monospace-font-family' : ''"
                                        :height="height2"
                                        :value="decodeError ? decodeError : decodeOutput"
                                        :placeholder="$t('base64_output')"/>
                    <template slot="extra">
                        <Button v-if="isExportFile" shape="circle" icon="md-download" @click="exportFile"/>
                        <Button style="margin-left: 10px" v-if="isDecodeIncludeBinaryData" shape="circle"
                                icon="md-settings" @click="decodeSetting=true"/>
                    </template>
                </input-block>
            </TabPane>
        </Tabs>
        <Modal v-model="decodeSetting" :title="$t('base64_setting')" footer-hide width="500" draggable :mask="false">
            <Form :label-width="120">
                <FormItem :label="$t('base64_hex_dump_show_mode')">
                    <RadioGroup v-model="current.decode.show_mode">
                        <Radio label="hex">{{ $t('base64_hex_dump_show_mode_hex') }}</Radio>
                        <Radio label="text">{{ $t('base64_hex_dump_show_mode_text') }}</Radio>
                    </RadioGroup>
                </FormItem>
                <template v-if="isHexShowMode">
                    <Divider plain>{{ $t('base64_hex_dump_setting') }}</Divider>
                    <FormItem :label="$t('base64_hex_dump_format')">
                        <RadioGroup v-model="current.decode.hex_dump_option.format">
                            <Radio label="twos">{{ $t('base64_hex_dump_format_twos') }}</Radio>
                            <Radio label="fours">{{ $t('base64_hex_dump_format_fours') }}</Radio>
                            <Radio label="eights">{{ $t('base64_hex_dump_format_eights') }}</Radio>
                            <Radio label="sixteens">{{ $t('base64_hex_dump_format_sixteens') }}</Radio>
                            <Radio label="none">{{ $t('base64_hex_dump_format_none') }}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem :label="$t('base64_hex_dump_caps')">
                        <RadioGroup v-model="current.decode.hex_dump_option.caps">
                            <Radio label="lower">{{ $t('base64_hex_dump_caps_lower') }}</Radio>
                            <Radio label="upper">{{ $t('base64_hex_dump_caps_upper') }}</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem :label="$t('base64_hex_dump_width')">
                        <InputNumber :min="1" v-model="current.decode.hex_dump_option.width"/>
                    </FormItem>
                </template>
            </Form>
        </Modal>
    </heightResize>
</template>
<script>
import {Base64} from 'js-base64'
import {hexy} from 'hexy'
import mimeType from 'mime-types'
import {fromBuffer as fileTypeFromBuffer} from 'file-type/browser';
import moment from "moment";
import heightResize from "./components/heightResize";
import disableMask from "./components/disableMask.vue";
import autoHeightTextarea from "./components/autoHeightTextarea";
import updateFile from './components/updateFile';

export default {
    components: {
        updateFile,
        heightResize,
        disableMask,
        autoHeightTextarea
    },
    created() {
        this.$initToolData()
    },
    computed: {
        isEncodeUploadFile() {
            return "file" in this.encodeUploadFile
        },
        encodeOutput() {
            // 上传文件
            if (this.isEncodeUploadFile) {
                return this.encodeUploadFile.base64
            }

            let input = this.current.encode.input.trim();
            if (!input) {
                return "";
            }
            return this.encode(input, {is_url_safe: this.current.encode.is_url_safe})
        },
        decodeOutput() {
            try {
                let input = this.decodeBase64Data
                if (!input) {
                    return "";
                }
                // 二进制数据
                if (this.isDecodeShowBinaryData) {
                    return this.decodeBinaryData(
                        Buffer.from(input.buffer),
                        this.current.decode.hex_dump_option
                    )
                }
                return new TextDecoder().decode(input)
            } catch (e) {
                return this.$t('base64_error', [e.message()])
            }
        },
        decodeBase64Data() {
            let input = this.current.decode.input.trim()
            return this.decode(this.isDecodeFile ? input.split(',')[1] : input)
        },
        isDecodeFile() {
            let input = this.current.decode.input.trim()
            return input.indexOf('data:') === 0 && input.indexOf(",") > 4
        },
        isDecodeShowBinaryData() {
            return this.isDecodeIncludeBinaryData && this.isHexShowMode
        },
        isDecodeIncludeBinaryData() {
            return this.decodeBase64Data && this.decodeBase64Data.includes(0)
        },
        isExportFile() {
            return this.isDecodeIncludeBinaryData || this.isDecodeFile
        },
        isHexShowMode() {
            return this.current.decode.show_mode === "hex"
        }
    },
    watch: {
        current: {
            handler(val) {
                if (
                    (val.operation === "encode" && !val.encode.input)
                    || (val.operation === "decode" && !val.decode.input)
                ) {
                    return;
                }
                this.$saveToolData(val)
            },
            deep: true
        }
    },
    methods: {
        handleUpload(file) {
            this.current.operation = "encode"
            let r = new FileReader()
            r.readAsDataURL(file)
            r.onloadend = () => {
                this.encodeUploadFile = {file: file, base64: r.result}
            }
        },
        encode(data, {is_url_safe = false} = {}) {
            return Base64.encode(data, is_url_safe)
        },
        decode(data) {
            try {
                this.decodeError = "";
                if (!data) {
                    return false;
                }
                if (!Base64.isValid(data)) {
                    throw "input error"
                }
                return Base64.toUint8Array(data)
            } catch (e) {
                this.decodeError = this.$t('base64_error', [e.toString()]).toString()
                return false;
            }
        },
        decodeBinaryData(buffer, option) {
            return hexy(buffer, option)
        },
        async exportFile() {
            if (!this.isExportFile) {
                return;
            }
            let mime = "";
            let extension = "";
            if (this.isDecodeFile) {
                // Data URLs
                let arr = this.current.decode.input.trim().split(',')
                mime = arr[0].match(/:(.*?);/)[1]
                extension = mimeType.extension(mime) ? `.${mimeType.extension(mime)}` : ""
            } else {
                let type = await fileTypeFromBuffer(this.decodeBase64Data)
                if (type) {
                    mime = type.mime;
                    extension = type.ext ? `.${type.ext}` : "";
                }
            }
            let objectUrl = window.URL.createObjectURL(new Blob([this.decodeBase64Data], {type: mime}));
            let aEle = document.createElement("a");
            aEle.download = `ctool-base64-decode-${moment().unix()}${extension}`;
            aEle.href = objectUrl;
            aEle.click();
            aEle.remove();
            window.URL.revokeObjectURL(objectUrl);
        },
        resize(height) {
            this.height1 = Math.min(160, Math.ceil(height / 2))
            this.height2 = height - this.height1 - 10
        }
    },
    data() {
        return {
            current: {
                encode: {
                    input: '',
                    is_url_safe: false,
                },
                decode: {
                    input: '',
                    show_mode: "hex",
                    hex_dump_option: {
                        format: "twos",
                        caps: "lower",
                        width: 16,
                    }
                },
                operation: 'encode',
            },
            decodeSetting: false,
            decodeError: "",
            encodeUploadFile: {},
            height1: 100,
            height2: 100
        }
    },
}
</script>
