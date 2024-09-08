<template>
    <div class="ctool-textarea" :style="{height:sizeConvert(height)}" :data-disabled="disabled ? 'y' : 'n'">
        <Display
            :enable="floatButtonText !== ''"
            :position="floatPosition"
            :type="floatType"
            :text="floatButtonText"
            @click="clickFloatText"
            style="height: 100%"
        >
            <textarea
                :style="{resize: `none`}"
                :disabled="disabled"
                :readonly="readonly"
                :placeholder="placeholder"
                v-model="current"
            />
        </Display>
    </div>
</template>
<script setup lang="ts">
import {PropType, onMounted} from "vue"
import {ButtonType, DisplayPosition} from "@/types";
import {sizeConvert} from "@/components/util";
import event from "@/event";

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    },
    height: {
        type: [Number, String],
        default: ""
    },
    copy: {
        type: [Boolean, String],
        default: false
    },
    floatText: {
        type: String,
        default: ""
    },
    floatPosition: {
        type: String as PropType<DisplayPosition>,
        default: "bottom-right"
    },
    floatType: {
        type: String as PropType<ButtonType>,
        default: "primary"
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    disableClear: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void, (e: 'clickFloatText'): void }>()

let current = $computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

onMounted(() => {
    (!props.disableClear) && event.addListener('content_clear', () => current = "")
})

const clickFloatText = () => {
    if (props.floatText !== "") {
        return emit('clickFloatText')
    }
    if (props.copy !== false) {
        return $copy(current)
    }
}

const floatButtonText: string = $computed(() => {
    if (props.floatText !== "") {
        return props.floatText
    }
    if (props.copy !== false) {
        return props.copy === true ? $t('main_ui_copy') : props.copy
    }
    return ""
})
</script>
<style>
.ctool-textarea {
    width: 100%;
    height: 100%;
    --form-element-spacing-vertical: 5px;
    --form-element-spacing-horizontal: 10px;
}

.ctool-textarea textarea {
    height: 100%;
}
</style>
