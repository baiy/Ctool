<template>
    <Tooltip :content="text">
        <slot>
            <Icon @click="click" hover :name="icon" :size="iconSize"/>
        </slot>
    </Tooltip>
</template>

<script setup lang="ts">
import {openUrl} from "@/helper/helper"
import {PropType} from "vue";
import {IconType} from "@/helper/icon"

const props = defineProps({
    link: {
        type: String,
        default: ""
    },
    icon: {
        type: String as PropType<IconType>,
        default: "question"
    },
    iconSize: {
        type: [String, Number],
        default: 14
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
