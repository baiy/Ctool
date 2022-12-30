<template>
    <Tooltip :content="text">
        <slot><Icon @click="click" hover name="question" /></slot>
    </Tooltip>
</template>

<script setup lang="ts">
import {openUrl} from "@/helper/helper"

const props = defineProps({
    link: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: () => {
            return $t('component_click_help')
        }
    }
})
const emit = defineEmits<{ (e: 'click'): void }>()
const click = () => {
    if (props.link !== "") {
        openUrl(props.link)
    }
    emit("click")
}
</script>
