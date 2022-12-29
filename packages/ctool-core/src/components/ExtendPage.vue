<template>
    <Teleport to="#ctool-append">
        <Transition name="ctool-extend-page">
            <div class="ctool-extend-page" v-if="show" v-bind="$attrs">
                <slot></slot>
            </div>
        </Transition>
        <Transition name="ctool-extend-page">
            <div class="ctool-extend-page-close" v-if="show">
                <Button :size="'small'" :type="'primary'" @click="close">
                    <Icon name="up" :size="10"/>
                    <span style="margin-left: 5px">{{ $t(`main_ui_close`) }}</span>
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
import {onMounted, onUnmounted, watch} from "vue";
import event,{componentResizeDispatch} from "@/event";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    disableReplace: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

let show = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
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

onMounted(() => {
    event.addListener('extend_page_close', closeExtendPageListener)
})
onUnmounted(() => {
    event.removeListener('extend_page_close', closeExtendPageListener)
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
