<template>
    <div class="ctool-card" :style="style">
        <div class="ctool-card-header" v-if="title !== ''">
            <div class="ctool-card-title">{{ title }}</div>
            <div class="ctool-card-extra">
                <slot name="extra"></slot>
            </div>
        </div>
        <div class="ctool-card-body" :style="{padding:`${padding}`}" ref="body">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import {sizeConvert} from "../util"
import {StyleValue, onMounted, onUnmounted} from "vue";
import {componentResizeDispatch} from "@/event";

const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    padding: {
        type: String,
        default: "5px"
    },
    height: {
        type: [Number, String],
        default: ""
    }
})
const body = $ref<HTMLElement | null>(null)

onMounted(() => {
    body?.addEventListener('scroll', componentResizeDispatch)
})

onUnmounted(() => {
    body?.removeEventListener('scroll', componentResizeDispatch)
})

const style = $computed(() => {
    let css: StyleValue = {}
    if (props.height) {
        css.height = sizeConvert(props.height)
    }
    if (props.title === "") {
        css.gridTemplateRows = 'minmax(0px, 1fr)'
    }
    return css
})
</script>
<style>
.ctool-card {
    width: 100%;
    background-color: var(--ctool-block-content-bg-color);
    border: 1px solid var(--ctool-border-color);
    border-radius: var(--border-radius);
    display: grid;
    grid-template-rows: auto minmax(0px, 1fr);
    height: auto;
}

.ctool-card-header {
    padding: 0 5px 0 10px;
    background-color: var(--ctool-block-title-bg-color);
    border-bottom: 1px solid var(--ctool-border-color);
    display: flex;
    height: 2.2rem;
    justify-content: space-between;
    align-items: center;
}

.ctool-card-title, .ctool-card-extra {
    font-size: .875rem;
}

.ctool-card-body {
    overflow-y: auto;
}
</style>
