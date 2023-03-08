<template>
    <slot/>
</template>

<script setup lang="ts">
import {onMounted, getCurrentInstance, watch} from "vue";
import tippy, {Instance as TippyInstance} from 'tippy.js';
import {useSetting} from '@/helper';
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css';
import 'tippy.js/themes/light.css'

// 提示
const props = defineProps({
    content: {
        type: String,
        default: ""
    }
})
const setting = useSetting()
const instance = getCurrentInstance();
let tooltip: TippyInstance | undefined = undefined;

onMounted(() => {
    if (!instance?.vnode.el?.nextElementSibling) {
        return;
    }
    // 第一个子节点
    tooltip = tippy(instance.vnode.el.nextElementSibling as HTMLElement, {animation: "scale", content: ""})
    update()
})

const update = () => {
    if (!tooltip) {
        return;
    }
    tooltip.setProps({
        content: props.content,
        theme: setting.theme.value === 'dark' ? 'light' : 'dark',
    })
    tooltip[props.content !== "" ? 'enable' : 'disable']()
}

watch(() => {
    return {
        content: props.content,
        theme: setting.theme
    }
}, () => {
    update()
}, {deep: true, immediate: true})
</script>
