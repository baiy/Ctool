<template>
    <Upload style="display: inline-block" action="#" :before-upload="handleUpload" :format="format" :showUploadList="false">
        <Button shape="circle" icon="md-cloud-upload"/>
        <template v-if="!disablePaste">
            <pasteClipboardFlie v-if="type==='file'" @on-paste-file="handleUpload"/>
            <pasteClipboardFlie v-if="type==='image'" @on-paste-image="handleUpload"/>
        </template>
    </Upload>
</template>
<script>
import pasteClipboardFlie from './pasteClipboardFlie';

export default {
    components: {
        pasteClipboardFlie,
    },
    props: {
        disablePaste: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "file" // file,image
        }
    },
    computed: {
        format() {
            if (this.type === "image") {
                return ['jpg', 'jpeg', 'png']
            }
            return [];
        }
    },
    methods: {
        handleUpload(file) {
            this.$emit('success', file)
        }
    }
};
</script>

