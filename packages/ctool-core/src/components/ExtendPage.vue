<template>
    <Teleport to="#ctool-append">
        <Transition name="ctool-extend-page">
            <div class="ctool-extend-page" :style="style" v-if="show" v-bind="$attrs">
                <slot></slot>
            </div>
        </Transition>
        <Transition name="ctool-extend-page">
            <div class="ctool-extend-page-close" v-if="show">
                <Button :size="'small'" :type="'primary'" @click="close">
                    <Icon name="up" :size="10"/>
                    <span style="margin-left: 5px">{{ closeTextI18n }}</span>
                </Button>
            </div>
        </Transition>
    </Teleport>
</template>
<script lang="ts">
import Event from "@/event";

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        Event.dispatch('extend_page_close')
    }
});

export default {
    inheritAttrs: false
}

</script>
<script setup lang="ts">
// 扩展页面 用于临时内容展示
import {onMounted, onUnmounted, StyleValue, watch} from "vue";
import event, {componentResizeDispatch} from "@/event";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    disableReplace: {
        type: Boolean,
        default: false
    },
    offset: {
        type: Number,
        default: 0
    },
    closeText:{
        type: String,
        default: ''
    }
})
let closeI18n = $ref($t(`main_ui_close`));
event.addListener("locale_change", () => {
    closeI18n = $t(`main_ui_close`)
});
const closeTextI18n = $computed(() => {
    return props.closeText || closeI18n
})
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

let show = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

let top = $ref(document.querySelector<HTMLElement>('.ctool-header')?.offsetHeight || 33)
let bottom = $ref(document.querySelector<HTMLElement>('.ctool-bottom')?.offsetHeight || 33)

const style = $computed(() => {
    const css: StyleValue = {
        "top": `${top + props.offset}px`,
        "height": `calc(100vh - ${top + bottom + props.offset}px)`,
    }
    return css
})

let isCurrentOpen = false;

watch(() => show, (is) => {
    if (is && !props.disableReplace) {
        isCurrentOpen = true;
        event.dispatch('extend_page_close')
    }
    if (is) {
        setTimeout(() => {
            componentResizeDispatch()
        }, 600)
    }
}, {immediate: true})

const close = () => show = false

const closeExtendPageListener = () => {
    if (isCurrentOpen) {
        isCurrentOpen = false
        return;
    }
    close()
}

const resize = () => {
    top = document.querySelector<HTMLElement>('.ctool-header')?.offsetHeight || 33
    bottom = document.querySelector<HTMLElement>('.ctool-bottom')?.offsetHeight || 33
}

onMounted(() => {
    event.addListener('extend_page_close', closeExtendPageListener)
    event.addListener("window_height_resize", resize)
})
onUnmounted(() => {
    event.removeListener('extend_page_close', closeExtendPageListener)
    event.removeListener("window_height_resize", resize)
})
</script>

<style>
.ctool-extend-page {
    position: fixed;
    box-sizing: border-box;
    padding: 5px;
    top: 33px;
    left: 0;
    width: 100%;
    height: calc(100vh - 66px);
    background-color: var(--background-color);
    overflow-y: auto;
}

.ctool-extend-page-close {
    --close-width: 80px;
    position: fixed;
    bottom: 3px;
    width: var(--close-width);
    left: calc(100vw / 2 - (var(--close-width) / 2));
    display: inline-flex;
}

.ctool-extend-page-enter-active, .ctool-extend-page-leave-active {
    transition: all 0.3s ease-in-out;
}

.ctool-extend-page-enter-from, .ctool-extend-page-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
