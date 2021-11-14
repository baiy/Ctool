<template>
    <heightResize ignore :append="['.page-option-block']" @resize="resize">
        <input-block bottom="0px" right="10px">
            <autoHeightTextarea :height="height1" v-model="current.input" :placeholder="$t('base64_input')" />
            <Upload slot="extra" action="#" :before-upload="handleUpload">
                <Button size="small" type="primary" icon="ios-cloud-upload-outline">{{ $t('base64_upload_file') }}</Button>
            </Upload>
        </input-block>
        <option-block class="page-option-block">
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">{{ $t('base64_encode') }}</Button>
                    <Button type="primary" @click="handle('decode')">{{ $t('base64_decode') }}</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUriSafe">{{ $t('base64_url_safe') }}</Checkbox>
            </FormItem>
        </option-block>
        <input-block right="10px">
            <pasteClipboardFlie @on-paste-file="handleUpload">
                <autoHeightTextarea :height="height2" :value="current.output" :placeholder="$t('base64_output')" />
            </pasteClipboardFlie>
        </input-block>
    </heightResize>
</template>
<script>
import {Base64} from 'js-base64'
import mimeType from 'mime-types'
import moment from "moment";
import pasteClipboardFlie from "./components/pasteClipboardFlie";
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";
export default {
    components: {
        pasteClipboardFlie,
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData('input'))
    },
    methods: {
        handle(v) {
            if (this.current.input) {
                if (v === "encode") {
                    this.current.output = Base64.encode(this.current.input, this.current.isUriSafe)
                } else {
                    if (this.current.input.trim().indexOf('data:') === 0) {
                        // 文件 base64 内容
                        this.exportFile();
                    }
                    else{
                        this.current.output = Base64.decode(this.current.input)
                    }
                }
                this.current.operation = v
                this.$clipboardCopy(this.current.output)
                this.$saveToolData(this.current)
            }
        },
        handleUpload(file) {
            let r = new FileReader()
            r.readAsDataURL(file)
            r.onloadend = () => {
                this.current.output = r.result
            }
            return false
        },
        exportFile() {
            let arr = this.current.input.split(','), mime = arr[0].match(/:(.*?);/)[1];
            let objectUrl = window.URL.createObjectURL(new Blob([new Blob([Base64.toUint8Array(arr[1])], {type: mime})], {type: mime}));
            let aEle = document.createElement("a");
            aEle.download = `ctools-base64-decode-${moment().unix()}` + (mimeType.extension(mime) ? `.${mimeType.extension(mime)}` : "");
            aEle.href = objectUrl;
            aEle.click();
            aEle.remove();
            window.URL.revokeObjectURL(objectUrl);
        },
        resize(height){
            this.height1 = Math.min(160,Math.ceil(height/2))
            this.height2 = height - this.height1
        }
    },
    data() {
        return {
            current: {
                input: '',
                output: '',
                operation: '',
                isUriSafe: false,
            },
            height1:100,
            height2:100
        }
    },
}
</script>
