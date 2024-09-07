<template>
    <div :style="`height:${height}`" class="ctool-height-resize" v-if="slotHeight > 0">
        <slot :height="slotHeight" :small="small" :large="large"></slot>
    </div>
</template>
<script setup lang="ts">
import event, { mainToolHeight } from "@/event";
import { onMounted, PropType, onUnmounted, watch, nextTick, onUpdated } from "vue";
import { debounce } from "lodash";
const props = defineProps({
    append: {
        type: Array as PropType<string[]>,
        default: [],
    },
    reduce: {
        type: Number,
        default: 0,
    },
    fatherHeight: {
        type: Number,
        default: 0,
    },
    remove: {
        type: Array as PropType<string[]>,
        default: [],
    },
    ignore: {
        type: Boolean,
        default: false,
    },
});

let height = $ref("auto");
let slotHeight = $ref(0);

// 上下布局高度
// small Math.min(160, Math.ceil(height * 0.4))
// large height - small
let small = $ref(100);
let large = $ref(100);

const emit = defineEmits<{ (e: "resize", height: number): void }>();

const getAbsoluteHeight = (select: string) => {
    let el = document.querySelector<HTMLElement>(select);
    if (!el) {
        return 0;
    }
    let styles = window.getComputedStyle(el);
    return Math.ceil(el.offsetHeight + parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]));
};

const resize = debounce(function () {
    let current: number = props.fatherHeight || mainToolHeight;
    let defaultFilterBlock: string[] = props.fatherHeight ? [] : [];
    const filterBlock = defaultFilterBlock
        .filter(item => {
            return !props.remove.includes(item);
        })
        .concat(props.append || []);
    for (let block of filterBlock) {
        current = current - getAbsoluteHeight(block);
    }
    if (props.reduce > 0) {
        current = current - props.reduce;
    }
    if (!props.ignore) {
        height = `${current}px`;
    }
    slotHeight = current;
    small = Math.min(160, Math.ceil(current * 0.4));
    large = current - small;
    emit("resize", current);
    event.dispatch("component_resize");
}, 300);

const windowResize = async () => {
    await nextTick();
    resize();
};
onMounted(() => {
    event.addListener("window_height_resize", windowResize);
    resize();
});
onUnmounted(() => {
    event.removeListener("window_height_resize", windowResize);
});
onUpdated(() => {
    windowResize();
});

watch(() => {
    return {
        append: props.append,
        ignore: props.ignore,
        reduce: props.reduce,
        remove: props.remove,
        fatherHeight: props.fatherHeight,
    };
}, windowResize);
</script>
<style>
.ctool-height-resize {
    width: 100%;
}
</style>
