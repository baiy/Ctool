<template>
    <div :style="style" class="ctool-message" ref="container">
        <Transition name="ctool-message">
            <div class="ctool-message-block" v-if="show" :class="`ctool-message-${type}`">
                <Icon :name="type" style="margin-right: 5px"/>
                <div class="ctool-message-content">
                    <template v-if="!info.includes(`\n`)">
                        {{ info }}
                    </template>
                    <pre v-else><code>{{ info }}</code></pre>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
// 消息提示
import {PropType, StyleValue, onMounted, onUnmounted} from "vue";
import {MessageType} from '@/types'
import Icon from './ui/Icon.vue'
import {sizeConvert} from './util'

const props = defineProps({
    type: {
        type: String as PropType<MessageType>,
        default: 'info'
    },
    info: {
        type: String,
        default: ""
    },
    offset: {
        type: Number,
        default: 0
    },
    close: {
        type: Function,
        default() {
        }
    }
})

const container = $ref<HTMLDialogElement | null>(null)

let show = $ref(false)

const open = () => {
    show = true
}

const exposeClose = () => {
    show = false
}

const style = $computed(() => {
    const css: StyleValue = {
        "--position-top": sizeConvert(props.offset)
    }
    return css
})

const clickClose = (event: MouseEvent) => {
    if (!container?.contains(event.target as any)) {
        props.close()
    }
}

onMounted(() => {
    setTimeout(() => document.addEventListener('click', clickClose), 100)
})

onUnmounted(() => {
    document.removeEventListener('click', clickClose);
})

defineExpose({open, exposeClose});
</script>
<style>

.ctool-message {
    --position-top: 150px;
    position: fixed;
    top: var(--position-top);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
}

.ctool-message-block {
    display: flex;
    gap: 5px;
    align-items: center;
    width: fit-content;
    max-width: calc(100vw - 3rem);
    font-size: .875rem;
    line-height: 1rem;
    color: var(--ctool-message-color);
    background-color: var(--ctool-message-background-color);
    border: 1px solid var(--ctool-message-border-color);
    border-radius: var(--border-radius);
    padding: .85rem 1.2rem;
}

.ctool-message-block .ctool-message-content {
    max-height: calc(100vh - 6rem);
    line-height: 24px;
    overflow-y: auto;
}

.ctool-message pre, .ctool-message pre > code {
    color: currentColor;
    background-color: transparent;
}

.ctool-message-success {
    --ctool-message-color: var(--ctool-primary);
    --ctool-message-border-color: #e1f3d8;
    --ctool-message-background-color: #edfcf7;
}

[data-theme="dark"] .ctool-message-success {
    --ctool-message-border-color: #25371c;
    --ctool-message-background-color: #002421;
}

.ctool-message-error {
    --ctool-message-color: #f56c6c;
    --ctool-message-border-color: #fde2e2;
    --ctool-message-background-color: #fef0f0;
}

[data-theme="dark"] .ctool-message-error {
    --ctool-message-border-color: #412626;
    --ctool-message-background-color: #2b1d1d;
}

.ctool-message-info {
    --ctool-message-color: #909399;
    --ctool-message-border-color: #e9e9eb;
    --ctool-message-background-color: #f4f4f5;
}

[data-theme="dark"] .ctool-message-info {
    --ctool-message-color: #909399;
    --ctool-message-border-color: #2d2d2f;
    --ctool-message-background-color: #202121;
}

.ctool-message-enter-active, .ctool-message-leave-active {
    transition: all 0.3s ease-in-out;
}

.ctool-message-enter-from, .ctool-message-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
