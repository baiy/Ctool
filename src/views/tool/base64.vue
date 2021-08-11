<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('encode')">编码</Button>
                    <Button type="primary" @click="handle('decode')">解码</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUriSafe">Url Safe</Checkbox>
            </FormItem>
            <FormItem style="float: right;">
                <Upload action="#" :before-upload="handleUpload">
                    <Button type="primary" icon="md-arrow-round-up">上传文件</Button>
                </Upload>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
import {Base64} from 'js-base64'
import mimeType from 'mime-types'
import moment from "moment";

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData('input'))
    },
    methods: {
        handle(v) {
            if (this.current.input) {
                if (v === "encode") {
                    this.current.output = Base64.encode(this.current.input, this.current.isUriSafe)
                } else {
                    if (this.current.input.indexOf(',') !== -1) {
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
                console.log(this.current)
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
        }
    },
    data() {
        return {
            current: {
                input: '',
                isFile: false,
                output: '',
                operation: '',
                isUriSafe: false,
            },
        }
    },
}
</script>