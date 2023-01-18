<template>
    <template v-if="$slots.default">
        <slot/>
    </template>
</template>

<script setup lang="ts">
import {onMounted, getCurrentInstance, onUpdated, onUnmounted} from "vue";
import {measureTextMaxWidth} from "@/components/util";
import event from "@/event";

// 提示
const props = defineProps({
    content: {
        type: String,
        default: ""
    }
})

const instance = getCurrentInstance();

const handle = () => {
    if (!instance?.vnode.el?.nextElementSibling || props.content === "") {
        return;
    }
    // 第一个子节点
    const el = instance.vnode.el.nextElementSibling as HTMLElement
    if (props.content === "") {
        el.classList.remove('ctool-tooltip')
        el.removeAttribute('data-tooltip')
        for (let item of [
            '--ctool-tooltip-animation',
            '--ctool-tooltip-top',
            '--ctool-tooltip-right',
            '--ctool-tooltip-left',
            '--ctool-tooltip-bottom',
            '--ctool-tooltip-transform',
        ]) {
            el.style.removeProperty(item)
        }
    }
    el.classList.add('ctool-tooltip')
    el.setAttribute('data-tooltip', props.content)
    const position = calculate(el, props.content)
    for (let key in position) {
        el.style.setProperty(`--ctool-tooltip-${key}`, position[key])
    }
}

const calculate = (el: HTMLElement, content: string) => {
    let position: Record<"animation" | "top" | "right" | "left" | "bottom" | "transform", string> = {
        animation: "",
        top: "unset",
        right: "unset",
        left: "unset",
        bottom: "unset",
        transform: "unset"
    }
    const boundingClientRect = el.getBoundingClientRect()
    // 文字高宽
    const width = measureTextMaxWidth([content], '.875rem') + 20
    // 当前元素
    const currentWidth = boundingClientRect.right - boundingClientRect.left
    const currentHeight = boundingClientRect.bottom - boundingClientRect.top
    const top = boundingClientRect.top
    const bottom = window.innerHeight - boundingClientRect.bottom
    const left = boundingClientRect.left
    const right = window.innerWidth - boundingClientRect.right
    // 上下位置
    if (
        left > ((width - currentWidth) / 2) + 5
        && right > ((width - currentWidth) / 2) + 5
    ) {
        position.left = `${left + (currentWidth / 2)}px`;
        if (top > 50) {
            // 上方
            position.bottom = `${bottom + currentHeight}px`;
            position.transform = `translate(-50%,-0.25rem)`;
            position.animation = "tooltip-slide-top";
        } else {
            // 下方
            position.top = `${top + currentHeight}px`;
            position.transform = `translate(-50%,0.25rem)`;
            position.animation = "tooltip-slide-bottom";
        }
    } else {
        position.top = `${top + (currentHeight / 2)}px`;
        if (left > right) {
            // 左边
            position.right = `${right + currentWidth}px`;
            position.transform = `translate(-0.25rem,-50%)`;
            position.animation = "tooltip-slide-left";
        } else {
            // 右边
            position.left = `${left + currentWidth}px`;
            position.transform = `translate(0.25rem,-50%)`;
            position.animation = "tooltip-slide-right";
        }
    }
    return position;
}

onMounted(() => {
    handle()
    setTimeout(() => handle(), 2000)
    event.addListener('component_resize', handle)
})
onUpdated(() => {
    handle()
    setTimeout(() => handle(), 2000)
})
onUnmounted(() => {
    event.removeListener('component_resize', handle)
})
</script>
<style>
.ctool-tooltip {
    --ctool-tooltip-top: unset;
    --ctool-tooltip-right: unset;
    --ctool-tooltip-left: unset;
    --ctool-tooltip-bottom: unset;
    --ctool-tooltip-transform: unset;
    --ctool-tooltip-animation: unset;
}

.ctool-tooltip[data-tooltip] {
    border-bottom: 0;
}

.ctool-tooltip[data-tooltip]::before {
    position: fixed;
    top: var(--ctool-tooltip-top);
    right: var(--ctool-tooltip-right);
    left: var(--ctool-tooltip-left);
    bottom: var(--ctool-tooltip-bottom);
    transform: var(--ctool-tooltip-transform);
    font-size: .75rem
}

.ctool-tooltip[data-tooltip]:focus::before, .ctool-tooltip[data-tooltip]:hover::before {
    animation-name: var(--ctool-tooltip-animation);
}

.ctool-tooltip[data-tooltip]:hover::after {
    display: none;
}

.ctool-tooltip[data-tooltip]:not(a, button, input) {
    cursor: unset;
}
</style>
