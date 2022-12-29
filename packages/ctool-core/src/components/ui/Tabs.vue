<template>
    <div class="ctool-tabs" ref="container" :style="{...(height ? {height:sizeConvert(height)} : {})}">
        <div class="ctool-tabs-header">
            <div class="ctool-tabs-header-item">
                <span v-for="item in lists" :key="item.name" @click="current = item.name">{{ item.label }}</span>
            </div>
            <div class="ctool-tabs-header-fill"><slot name="extra" /></div>
        </div>
        <div class="ctool-tabs-body" :style="{padding:`${padding}`}" v-if="currentIndex !== -1" :class="`ctool-tabs-current-${currentIndex}`">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
// tabs
import {nextTick, onMounted, PropType, watch} from "vue"
import {TabsListsType} from "@/types";
import {heightResizeDispatch} from "@/event";
import {sizeConvert} from "../util";

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    lists: {
        type: Array as PropType<TabsListsType>,
        default: []
    },
    padding: {
        type: String,
        default: "5px"
    },
    height: {
        type: [Number, String],
        default: ""
    },
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const container = $ref<HTMLElement | null>(null)
let currentIndex = $ref(-1)

let current = $ref(props.modelValue)

const update = async () => {
    if (!container) {
        return;
    }
    let index = 0
    for (let i = 0; i < props.lists.length; i++) {
        if (props.lists[i].name === current) {
            index = i
            break
        }
    }
    currentIndex = index
    container.querySelectorAll(".ctool-tabs-header-item > span").forEach((el, key) => {
        el.classList[key === index ? "add" : "remove"]("ctool-tabs-current")
    })
    await nextTick()
    heightResizeDispatch()
}

onMounted(() => {
    update()
})

watch(() => current, (value) => {
    update()
    emit('update:modelValue', value)
})
</script>
<style>
.ctool-tabs {
    background-color: var(--ctool-block-content-bg-color);
    border: 1px solid var(--ctool-border-color);
    border-radius: var(--border-radius);
    width: 100%;
    display: grid;
    grid-template-rows: auto minmax(0px, 1fr);
    height: auto;
}

.ctool-tabs-header {
    background-color: var(--ctool-block-title-bg-color);
    height: 2.2rem;
    display: grid;
    grid-template-columns: auto minmax(0px, 1fr);
}

.ctool-tabs-header-fill {
    height: 100%;
    border-bottom: 1px solid var(--ctool-border-color);
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 10px;
}

.ctool-tabs-header-item > span {
    height: 100%;
    display: inline-flex;
    padding: 0 .9rem;
    border-bottom: 1px solid var(--ctool-border-color);
    font-size: .875rem;
    align-items: center;
    justify-content: center;
    color: var(--ctool-color-secondary);
    font-weight: 500;
    cursor: pointer;
}

.ctool-tabs-header-item > span.ctool-tabs-current {
    border-right: 1px solid var(--ctool-border-color);
    border-left: 1px solid var(--ctool-border-color);
    border-bottom: none;
    color: var(--ctool-primary);
}

.ctool-tabs-header-item > span.ctool-tabs-current:first-child {
    border-left: none;
}

.ctool-tabs-header-item > span:hover {
    color: var(--ctool-primary);
}

.ctool-tabs-current-0 > *:not(:nth-child(1)) {
    display: none !important;
}

.ctool-tabs-current-1 > *:not(:nth-child(2)) {
    display: none !important;
}

.ctool-tabs-current-2 > *:not(:nth-child(3)) {
    display: none !important;
}

.ctool-tabs-current-3 > *:not(:nth-child(4)) {
    display: none !important;
}

.ctool-tabs-current-4 > *:not(:nth-child(5)) {
    display: none !important;
}

.ctool-tabs-current-5 > *:not(:nth-child(6)) {
    display: none !important;
}

.ctool-tabs-current-6 > *:not(:nth-child(7)) {
    display: none !important;
}

.ctool-tabs-current-7 > *:not(:nth-child(8)) {
    display: none !important;
}
</style>
