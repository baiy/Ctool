<template>
    <div style="display: inline">
        <slot></slot>
    </div>
</template>
<script>
// 粘贴时 获取剪贴板图片
export default {
    name: 'pasteClipboardFlie',
    methods: {
        reader(event) {
            if (!("clipboardData" in event)){
                return
            }
            let items = event.clipboardData && event.clipboardData.items;
            let types = event.clipboardData.types || [];
            if (items && items.length) {
                for (let i = 0; i < items.length; i++) {
                    if( types[i] === 'Files' ){
                        // 触发粘贴文件事件
                        this.$emit('on-paste-file', items[i].getAsFile());
                        if (items[i].type.indexOf('image') !== -1) {
                            // 触发粘贴文件事件 输出图片base64
                            this.$emit('on-paste-image', items[i].getAsFile());
                        }
                        return
                    }
                }
            }
        }
    },
    destroyed() {
        window.removeEventListener("paste", this.reader);
    },
    mounted() {
        window.addEventListener("paste", this.reader);
    }
};
</script>

