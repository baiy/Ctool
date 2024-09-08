<template>
    <div class="ctool-upload" v-if="mode.includes('button')">
        <Button :size="size" :disabled="disabled" type="primary" @click="fileInput?.click()">
            <Icon name="upload"/>
            <span style="margin-left: 5px" v-if="buttonType === 'text'">{{ $t(`component_upload_${type}`) }}</span>
        </Button>
    </div>
    <div style="display: none">
        <input ref="fileInput" :disabled="disabled" type="file" :accept="accept" @change="handleUpload"/>
    </div>
</template>

<script setup lang="ts">
import {PropType, onMounted, onUnmounted} from "vue";
import {UploadFileType, UploadFileMode, UploadFileButtonType, ComponentSizeType} from "@/types"

const emit = defineEmits<{ (e: 'update:modelValue', value: string | File): void, (e: 'success', content: File): void }>()
const props = defineProps({
    modelValue: {
        type: [String, Object] as PropType<string | File>,
        default: ""
    },
    type: {
        type: String as PropType<UploadFileType>,
        default: "file"
    },
    mode: {
        type: Array as PropType<(UploadFileMode)[]>,
        default: ["button", "paste"]
    },
    buttonType: {
        type: String as PropType<(UploadFileButtonType)>,
        default: "icon"
    },
    size: {
        type: String as PropType<(ComponentSizeType)>,
        default: "default"
    },
    disabled: {
        type: Boolean,
        default: false
    },
})

const fileInput = $ref<HTMLInputElement | null>(null)

const accept = $computed(() => {
    if (props.type === "image") {
        return "image/*"
    }
    return "*"
})

const success = (file: File) => {
    emit('success', file)
    emit('update:modelValue', file)
}

const handleUpload = () => {
    if (!fileInput || !fileInput.files) {
        return;
    }
    success(fileInput.files[0])
    return false
}
const paste = (_event: Event) => {
    const event = _event as ClipboardEvent
    if (!event.clipboardData || props.disabled) {
        return;
    }
    let items = event.clipboardData.items;
    let types = event.clipboardData.types || [];
    if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
            const file = items[i].getAsFile();
            if (types[i] === 'Files' && file) {
                if (props.type === "image") {
                    if (items[i].type.indexOf('image') !== -1) {
                        success(file)
                    }
                } else {
                    success(file)
                }
            }
        }
    }
}
onMounted(() => {
    window.addEventListener("paste", paste);
})
onUnmounted(() => {
    window.removeEventListener("paste", paste);
})

</script>
<style>
.ctool-upload {
    display: inline-flex;
}
</style>
