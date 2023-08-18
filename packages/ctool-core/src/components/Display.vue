<template>
    <template v-if="is">
        <div class="ctool-display" v-bind="$attrs">
            <slot></slot>
            <div :style="extraStyle" style="display: inline-flex">
                <span
                    ref="extra"
                    :class="[
                        `ctool-display-extra`,
                        `ctool-display-extra-${position}`,
                        position.includes('right') ? 'ctool-display-extra-right' : '',
                        position.includes('left') ? 'ctool-display-extra-left' : '',
                        `ctool-display-extra-${isShowExtra ? 'show' : 'hide'}`,
                    ]"
                >
                    <template v-if="isToggle && position.includes('right')">
                        <Tooltip
                            :content="
                                $t(isShowExtra ? 'component_display_fold_option' : 'component_display_expand_option')
                            "
                        >
                            <div class="ctool-display-toggle" @click="extraToggle">
                                <Icon :size="10" :name="'toggle'" hover />
                            </div>
                        </Tooltip>
                    </template>
                    <template v-if="isShowExtra">
                        <slot name="extra">
                            <Button v-if="text !== ''" :type="type" size="small" @click="click">{{ text }}</Button>
                        </slot>
                    </template>
                    <template v-if="isToggle && position.includes('left')">
                        <Tooltip
                            :content="
                                $t(isShowExtra ? 'component_display_fold_option' : 'component_display_expand_option')
                            "
                        >
                            <div class="ctool-display-toggle" @click="extraToggle">
                                <Icon :size="10" :name="'toggle'" hover />
                            </div>
                        </Tooltip>
                    </template>
                </span>
            </div>
        </div>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>
<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
// 悬浮显示组件
import { PropType, onUpdated, onMounted, StyleValue, useSlots } from "vue";
import { ButtonType, DisplayPosition } from "@/types";

const slots = useSlots();
const props = defineProps({
    position: {
        type: String as PropType<DisplayPosition>,
        default: "bottom-right",
    },
    toggle: {
        type: Boolean,
        default: false,
    },
    bottom: {
        type: Number,
        default: 5,
    },
    left: {
        type: Number,
        default: 5,
    },
    right: {
        type: Number,
        default: 5,
    },
    top: {
        type: Number,
        default: 5,
    },
    text: {
        type: String,
        default: "",
    },
    enable: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String as PropType<ButtonType>,
        default: "primary",
    },
});

const emit = defineEmits<{ (e: "click"): void }>();

let extra = $ref<HTMLElement | null>(null);
let extraWidth = $ref(0);
let extraHeight = $ref(0);

const updateExtraSize = () => {
    if (extra) {
        extraWidth = extra.offsetWidth;
        extraHeight = extra.offsetHeight;
    }
};
onUpdated(() => {
    updateExtraSize();
});
onMounted(() => {
    updateExtraSize();
});

const extraStyle = $computed(() => {
    const css: StyleValue = {
        position: "absolute",
        backgroundColor: `var(--el-bg-color)`,
    };
    switch (props.position) {
        case "bottom-left":
            css.bottom = `${props.bottom}px`;
            css.left = `${props.left}px`;
            break;
        case "bottom-center":
            css.bottom = `${props.bottom}px`;
            css.left = `calc(50% - ${extraWidth / 2}px)`;
            break;
        case "top-right":
            css.top = `${props.top}px`;
            css.right = `${props.right}px`;
            break;
        case "top-left":
            css.top = `${props.top}px`;
            css.left = `${props.left}px`;
            break;
        case "top-center":
            css.top = `${props.top}px`;
            css.left = `calc(50% - ${extraWidth / 2}px)`;
            break;
        case "left-center":
            css.left = `${props.left}px`;
            css.top = `calc(50% - ${extraHeight / 2}px)`;
            break;
        case "right-center":
            css.right = `${props.right}px`;
            css.top = `calc(50% - ${extraHeight / 2}px)`;
            break;
        case "center":
            css.left = `calc(50% - ${extraWidth / 2}px)`;
            css.top = `calc(50% - ${extraHeight / 2}px)`;
            break;
        default:
            css.bottom = `${props.bottom}px`;
            css.right = `${props.right}px`;
    }
    return css;
});

const click = () => {
    emit("click");
};

const is = $computed(() => {
    return props.enable && (props.text !== "" || !!slots.extra);
});

let isShowExtra = $ref(true);

const extraToggle = () => {
    isShowExtra = !isShowExtra;
};

const isToggle = $computed(() => {
    return props.toggle && is && extraWidth > 0;
});
</script>
<style>
.ctool-display {
    position: relative;
    display: block;
    width: 100%;
}

.ctool-display .ctool-display-extra {
    display: inline-flex;
    align-items: center;
}

.ctool-display-toggle {
    cursor: pointer !important;
    height: 100%;
    width: 24px;
    display: inline-flex;
    align-items: center;
}

.ctool-display .ctool-display-extra-right .ctool-display-toggle {
    justify-content: right;
}

.ctool-display .ctool-display-extra-left .ctool-display-toggle {
    justify-content: left;
}

.ctool-display
    :is(.ctool-display-extra-hide.ctool-display-extra-right, .ctool-display-extra-show.ctool-display-extra-left)
    .ctool-display-toggle
    .ctool-icon {
    transform: rotate(180deg);
}

.ctool-display .ctool-display-extra-hide .ctool-display-toggle {
    width: unset;
    height: unset;
}
</style>
