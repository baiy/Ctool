<template>
    <div class="ctool-input" :style="style" :data-size="size" :data-disabled="disabled ? 'y' : 'n'">
        <input
            ref="container"
            v-model="content"
            :placeholder="placeholder"
            :style="inputStyle"
            :disabled="disabled"
            :readonly="readonly"
            :type="type"
            v-bind="$attrs"
        />
        <div class="ctool-input-left" ref="inputLeft">
            <template v-if="$slots.prefix || label !== '' || $slots.prepend">
                <div
                    class="ctool-input-prepend"
                    v-if="$slots.prepend || label !== ''"
                    :class="label !== '' ? `ctool-input-label` : ``"
                >
                    <slot name="prepend">{{ label }}</slot>
                </div>
                <div class="ctool-input-prefix" v-if="$slots.prefix">
                    <slot name="prefix"></slot>
                </div>
            </template>
        </div>
        <div class="ctool-input-right" ref="inputRight">
            <template v-if="$slots.suffix || $slots.append">
                <div class="ctool-input-suffix" v-if="$slots.suffix">
                    <slot name="suffix"></slot>
                </div>
                <div class="ctool-input-append" v-if="$slots.append">
                    <slot name="append"></slot>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, PropType, StyleValue } from "vue";
import { sizeConvert } from "../util";
import { ComponentSizeType } from "@/types";
import event from "@/event";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    width: {
        type: [Number, String],
        default: "",
    },
    size: {
        type: String as PropType<ComponentSizeType>,
        default: "default",
    },
    label: {
        type: String,
        default: "",
    },
    type: {
        type: String as PropType<"text" | "number">,
        default: "text",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    center: {
        type: Boolean,
        default: false,
    },
    disableClear: {
        type: Boolean,
        default: false,
    },
});

const container = $ref<HTMLInputElement | null>(null);
const inputLeft = $ref<HTMLElement | null>(null);
const inputRight = $ref<HTMLElement | null>(null);

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "load", value: HTMLInputElement): void;
    (e: "change", value: string): void;
}>();

let content = $computed({
    get: () => props.modelValue,
    set: value => {
        emit("update:modelValue", value);
        emit("change", value);
    },
});

let inputLeftWidth = $ref(0);
let inputRightWidth = $ref(0);

const style = $computed(() => {
    let css: StyleValue = {};
    if (props.width !== "") {
        css.width = sizeConvert(props.width);
    }
    if (inputLeftWidth) {
        css["--ctool-input-left-padding"] = `${inputLeftWidth}px`;
    }
    if (inputRightWidth) {
        css["--ctool-input-right-padding"] = `${inputRightWidth}px`;
    }
    return css;
});

const inputStyle = $computed(() => {
    let css: StyleValue = {};
    if (props.center) {
        css["text-align"] = "center";
    }
    return css;
});

onMounted(() => {
    updatePadding();
    event.addListener("component_resize", updatePadding);
    !props.disableClear && event.addListener("content_clear", () => (content = ""));
    if (container) {
        emit("load", container as HTMLInputElement);
    }
});
onUpdated(() => {
    updatePadding();
});
onUnmounted(() => {
    event.removeListener("component_resize", updatePadding);
});
const updatePadding = () => {
    if (!inputLeft || !inputRight) {
        return;
    }
    inputLeftWidth = inputLeft.offsetWidth;
    inputRightWidth = inputRight.offsetWidth;
};
</script>
<style>
.ctool-input {
    --height: var(--ctool-form-item-height);
    --ctool-input-left-padding: 0px;
    --ctool-input-right-padding: 0px;
    --ctool-input-prepend-padding: 0.4rem;
    --ctool-input-append-padding: 0.4rem;
    --form-element-spacing-vertical: 0.0625rem;
    --form-element-spacing-horizontal: 0.4rem;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    width: 100%;
    font-size: var(--ctool-form-font-size);
}

.ctool-input :is(.ctool-input-append, .ctool-input-prepend):has(.ctool-select, .ctool-button) {
    --ctool-input-prepend-padding: 0;
    --ctool-input-append-padding: 0;
}

.ctool-input[data-size="small"] {
    --form-element-spacing-vertical: 0rem;
}

.ctool-input[data-size="large"] {
    --form-element-spacing-vertical: 0.25rem;
}

.ctool-input > input {
    font-size: var(--ctool-form-font-size);
    box-sizing: border-box;
    padding-left: calc(var(--ctool-input-left-padding) + var(--form-element-spacing-horizontal)) !important;
    padding-right: calc(var(--ctool-input-right-padding) + var(--form-element-spacing-horizontal)) !important;
    height: calc(var(--height)) !important;
}

.ctool-input-append,
.ctool-input-suffix,
.ctool-input-prepend,
.ctool-input-prefix {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: calc(var(--height) - var(--border-width) * 2) !important;
}

.ctool-input-append,
.ctool-input-prepend {
    background-color: var(--ctool-block-title-bg-color);
    color: var(--ctool-info-color);
}

.ctool-input-prepend {
    padding: 0 var(--ctool-input-prepend-padding);
    border-right: var(--border-width) solid var(--form-element-border-color);
}

.ctool-input-append {
    padding: 0 var(--ctool-input-append-padding);
    border-left: var(--border-width) solid var(--form-element-border-color);
}

.ctool-input-prefix {
    padding-right: 0;
}

.ctool-input-suffix {
    padding-left: 0;
}

.ctool-input-suffix,
.ctool-input-prefix {
    color: var(--form-element-placeholder-color);
    padding: 0 0.4rem;
}

.ctool-input-left,
.ctool-input-right {
    position: absolute;
    top: 1px;
}

.ctool-input-left {
    left: 2px;
}

.ctool-input-right {
    right: 2px;
}

:is(.ctool-input-append, .ctool-input-prepend) :is(.ctool-select, .ctool-button) {
    --height: calc(var(--ctool-form-item-height) - 2px);
    --border-width: 0px;
}
</style>
