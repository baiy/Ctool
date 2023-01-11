<template>
    <Tooltip :content="tooltip">
        <i :class="classes" :style="{...(size ? {'--font-size':isNumber(size) ? `${size}px` : `${size}`} : {})}" v-bind="$attrs">
            <template v-if="IconComponent !== null">
                <IconComponent @click="click" :style="style"/>
            </template>
        </i>
    </Tooltip>
</template>
<script lang="ts">
export default {
    inheritAttrs: false
}
</script>
<script setup lang="ts">
import {load, IconType} from "@/helper/icon"
import {computed, PropType, StyleValue, watch} from "vue";
import {isNumber} from "lodash";
import Tooltip from "./Tooltip.vue";

const props = defineProps({
    name: {
        type: String as PropType<IconType>,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    reverse: {
        type: Boolean,
        default: false
    },
    hover: {
        type: Boolean,
        default: false
    },
    highlight: {
        type: Boolean,
        default: false
    },
    size: {
        type: [String, Number],
        default: 0
    },
    tooltip: {
        type: String,
        default: ""
    },
    rotate: {
        type: Number,
        default: 0
    },
})

let IconComponent: any = $ref(null)

watch(() => props.name, async (name) => {
    IconComponent = await load(name)
}, {immediate: true})

const style = computed(() => {
    const css: StyleValue = {}
    if (props.color) {
        css.color = props.color
    }
    if (props.rotate) {
        css.transform = `rotate(${props.rotate}deg)`
    }
    return css;
})

const classes = computed(() => {
    let lists: string[] = ["ctool-icon"];
    if (props.reverse) {
        lists.push('ctool-icon-reverse')
    }
    if (props.hover) {
        lists.push('ctool-icon-hover')
    }
    if (props.highlight) {
        lists.push('ctool-icon-highlight')
    }
    return lists
})

const emit = defineEmits<{ (e: 'click'): void }>()

const click = () => {
    emit('click')
}

</script>
<style>
.ctool-icon {
    --font-size: 1rem;
    fill: currentColor;
    width: var(--font-size);
    height: var(--font-size);
    display: inline-flex;
    overflow: visible;
    box-sizing: content-box;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, -webkit-box-shadow, transform, -webkit-transform, filter, backdrop-filter;
    transition-duration: .15s;
}

.ctool-icon-reverse {
    color: var(--background-color)
}

.ctool-icon-hover {
    cursor: pointer !important;
}

.ctool-icon-hover:hover,.ctool-icon-highlight {
    color: var(--primary)
}
</style>
