<template>
    <div class="ctool-align" :style="style">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
// 子元素排列组件 控制子元素 对齐/间距/排列方式/(顶|低)部边距
import {PropType, StyleValue} from "vue";
import {AlignSize, AlignDirection, AlignHorizontal, AlignVertical} from "@/types";
import {sizeConvert} from "@/components/util";

const props = defineProps({
    // 子元素间隔大小
    gap: {
        type: [String, Number] as PropType<AlignSize>,
        default: "default"
    },
    // 顶部 margin
    top: {
        type: [String, Number] as PropType<AlignSize>,
        default: "none"
    },
    // 顶部 margin
    bottom: {
        type: [String, Number] as PropType<AlignSize>,
        default: "none"
    },
    // 子元素排列方式
    direction: {
        type: String as PropType<AlignDirection>,
        default: "horizontal"
    },
    // 水平对齐
    horizontal: {
        type: String as PropType<AlignHorizontal>,
        default: "none"
    },
    // 垂直对齐
    vertical: {
        type: String as PropType<AlignVertical>,
        default: "none"
    },
    width: {
        type: [Number, String],
        default: ""
    },
    height: {
        type: [Number, String],
        default: ""
    },
})


const sizeLists = {small: "3px", large: "10px", default: "5px"}

const style = $computed(() => {
    let css: StyleValue = {
        display:"inline-flex",
        gap:props.gap === "none" ? "unset" : sizeConvert(props.gap, sizeLists),
        marginTop: props.top === "none" ? "unset" : sizeConvert(props.top, sizeLists),
        marginBottom: props.bottom === "none" ? "unset" : sizeConvert(props.bottom, sizeLists),
        justifyContent:"unset",
        flexWrap:"wrap",
        alignItems:"unset",
        flexDirection:props.direction === "horizontal" ? "row" : "column",
        height:"unset",
        width:"unset",
    }

    const justify = {
        "left": "flex-start",
        "top": "flex-start",
        "right": "flex-end",
        "bottom": "flex-end",
        "center": "center"
    }

    if (props.direction === "horizontal") {
        // @ts-ignore
        css.justifyContent = justify[props.horizontal] ?? "unset"
        css.alignItems = justify[props.vertical] ?? "center"
    }
    if (props.direction === "vertical") {
        // @ts-ignore
        css.alignItems = justify[props.horizontal] ?? "unset"
        css.justifyContent = justify[props.vertical] ?? "unset"
    }

    if (
        props.horizontal === "center"
        || props.direction === "vertical"
    ) {
        css.width = '100%';
    }
    if (
        props.vertical === "center"
    ) {
        css.height = '100%';
    }
    if (props.width !== "") {
        css.width = sizeConvert(props.width);
    }
    if (props.height !== "") {
        css.height = sizeConvert(props.height);
    }
    return css
})
</script>
