<template>
    <div
        class="ctool-select"
        :data-size="size"
        :data-type="type"
        :data-disabled="disabled ? 'y' : 'n'"
        :style="style"
        ref="container"
    >
        <details role="list" ref="details">
            <summary aria-haspopup="listbox" role="button" class="ctool-select-summary">{{ placeholderValue }}</summary>
            <ul role="listbox" class="ctool-select-option-hidden" v-if="!dialog">
                <li v-for="item in getOptions" :key="item.value">
                    <a @click="selected = item.value">
                        {{ item.label }}{{ item.description !== "" ? ` - ${item.description}` : "" }}</a
                    >
                </li>
            </ul>
        </details>
        <div class="ctool-select-left">
            <template v-if="label !== '' && type === 'general'">
                <div class="ctool-select-prepend" :class="label !== '' ? `ctool-input-label` : ``">{{ label }}</div>
            </template>
        </div>
        <Modal v-model="dialogShow" :title="label" padding="20px 10px" width="85%" @close="close">
            <Align horizontal="center">
                <Button
                    :type="selected === item.value ? `primary` : `general`"
                    v-for="item in getOptions"
                    :key="item.value"
                    @click="selected = item.value"
                    :text="item.label"
                />
            </Align>
        </Modal>
    </div>
</template>

<script setup lang="ts">
// 下拉菜单
import { PropType, onMounted, StyleValue, onUnmounted, nextTick } from "vue";
import { isNumber, isString } from "lodash";
import { SelectOption, ComponentSizeType, SelectType, SelectValue } from "@/types";
import { sizeConvert, measureTextMaxWidth } from "@/components/util";

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: "__placeholder__",
    },
    placeholder: {
        type: String,
        default: "",
    },
    size: {
        type: String as PropType<ComponentSizeType>,
        default: "default",
    },
    type: {
        type: String as PropType<SelectType>,
        default: "general",
    },
    options: {
        type: Array as PropType<SelectOption>,
        default: [],
    },
    label: {
        type: String,
        default: "",
    },
    width: {
        type: [Number, String],
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    dialog: {
        type: Boolean,
        default: false,
    },
    disabledDialogClickClose: {
        type: Boolean,
        default: false,
    },
    center: {
        type: Boolean,
        default: true,
    },
});
const container = $ref<HTMLElement | null>(null);
let selectLeftWidth = $ref(0);
let menuTextWidth = $ref(0);
let menuPosition = $ref<Record<"top" | "right" | "left" | "bottom", string>>({
    top: "unset",
    right: "unset",
    left: "unset",
    bottom: "unset",
});
let dialogShow = $ref(false);

const emit = defineEmits<{
    (e: "update:modelValue", value: SelectValue): void;
    (e: "change", value: SelectValue): void;
}>();

let selected = $computed({
    get: () => props.modelValue,
    set: value => {
        emit("update:modelValue", value);
        emit("change", value);
        if (props.dialog && props.disabledDialogClickClose) {
            return;
        }
        close();
    },
});

const close = () => {
    container?.querySelector("details")?.removeAttribute("open");
};

const getOptions = $computed(() => {
    let items: Array<{ value: SelectValue; label: string; description: string }> = [];
    for (let item of props.options) {
        if (isNumber(item) || isString(item)) {
            items.push({ value: item, label: `${item}`, description: "" });
        } else {
            items.push({ value: item.value, label: `${item.label}`, description: item.description || "" });
        }
    }
    return items;
});

const placeholderValue = $computed(() => {
    if (selected !== "__placeholder__") {
        return getOptions.filter(item => item.value === selected)[0].label || props.placeholder;
    }
    return props.placeholder;
});

const style = $computed(() => {
    let css: StyleValue = {};
    if (props.center) {
        css["--text-align"] = "center";
    }
    css.width = props.width ? sizeConvert(props.width) : `auto`;
    if (selectLeftWidth) {
        css["--ctool-select-left-padding"] = `${selectLeftWidth}px`;
    }
    if (menuTextWidth) {
        css["--ctool-select-menu-width"] = `${menuTextWidth}px`;
    }
    css["--ctool-select-menu-top"] = menuPosition.top;
    css["--ctool-select-menu-right"] = menuPosition.right;
    css["--ctool-select-menu-left"] = menuPosition.left;
    css["--ctool-select-menu-bottom"] = menuPosition.bottom;
    return css;
});

// 边距/菜单位置更新
const update = () => {
    if (!container) {
        return;
    }
    // 根据计算菜单宽度
    menuTextWidth = Math.max(
        measureTextMaxWidth(
            getOptions.map(item => item.label),
            "1rem",
        ),
        container.offsetWidth,
    );

    const boundingClientRect = container.getBoundingClientRect();
    // 菜单位置
    const top = boundingClientRect.top;
    const bottom = window.innerHeight - boundingClientRect.bottom;
    const left = boundingClientRect.left;
    const right = window.innerWidth - boundingClientRect.left - 20;
    const menuHeight = container.querySelector("ul")?.offsetHeight || 0;
    const menuWidth = menuTextWidth || 0;

    const isBottom = bottom > menuHeight || bottom > top;
    const isLeft = right > menuWidth;

    menuPosition.top = isBottom ? `${boundingClientRect.bottom}px` : "unset";
    menuPosition.bottom = isBottom ? `unset` : `calc(100vh - ${boundingClientRect.top}px)`;
    menuPosition.left = isLeft ? `${left}px` : "unset";
    menuPosition.right = isLeft ? `unset` : `${window.innerWidth - boundingClientRect.right}px`;

    // 边距
    selectLeftWidth = (container.querySelector(".ctool-select-left") as HTMLElement).offsetWidth;
};

const toggle = () => {
    if (container?.querySelector("ul")) {
        if (container.querySelector("details")?.open) {
            container.querySelector("ul")?.classList.remove("ctool-select-option-hidden");
            update();
        } else {
            container.querySelector("ul")?.classList.add("ctool-select-option-hidden");
        }
    }
    if (!props.dialog) {
        return;
    }
    dialogShow = !!container?.querySelector("details")?.open;
};
onMounted(async () => {
    await nextTick();
    update();
});
onMounted(() => {
    container?.querySelector("details")?.addEventListener("toggle", toggle);
});
onUnmounted(() => {
    container?.querySelector("details")?.removeEventListener("toggle", toggle);
});
</script>

<style>
.ctool-select {
    --ctool-select-menu-width: 1px;
    --form-element-spacing-vertical: 0.0625rem;
    --form-element-spacing-horizontal: 0.4rem;
    --text-align: unset;
    --ctool-select-left-padding: 0px;
    --ctool-select-menu-top: unset;
    --ctool-select-menu-right: unset;
    --ctool-select-menu-left: unset;
    --ctool-select-menu-bottom: unset;

    position: relative;
    display: inline-flex;
    --height: var(--ctool-form-item-height);
    width: auto;
    height: var(--height);
    font-size: var(--ctool-form-font-size);
}

.ctool-select[data-disabled="y"] {
    --border-color: var(--form-element-disabled-border-color);
}

.ctool-select details {
    width: 100%;
}

.ctool-select details .ctool-select-summary[role="button"] {
    height: 100%;
    width: 100%;
    display: inline-grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    text-align: var(--text-align);
    padding-top: 0;
    padding-bottom: 0;
    font-size: var(--ctool-form-font-size);
    padding-left: calc(var(--ctool-select-left-padding) + var(--form-element-spacing-horizontal)) !important;
    padding-right: var(--form-element-spacing-horizontal);
}

.ctool-select ul[role="listbox"] {
    --ctool-form-font-size: 0.875rem;
    --form-element-spacing-vertical: 0.8rem;
    --form-element-spacing-horizontal: 0.9rem;
    font-size: var(--ctool-form-font-size);
    min-width: calc(var(--ctool-select-menu-width));
    max-height: 12rem;
    overflow-y: auto;
    position: fixed;
    top: var(--ctool-select-menu-top);
    right: var(--ctool-select-menu-right);
    left: var(--ctool-select-menu-left);
    bottom: var(--ctool-select-menu-bottom);
}

.ctool-select ul[role="listbox"].ctool-select-option-hidden {
    right: -100000px;
}

.ctool-select details[role="list"] .ctool-select-summary + ul li a {
    overflow: unset;
    text-overflow: unset;
    cursor: pointer;
}

.ctool-select[data-type="general"] details .ctool-select-summary {
    --background-color: var(--ctool-background-color);
    --border-color: var(--ctool-border-color);
    --color: var(--ctool-color-primary);
}

.ctool-select[data-type="general"] details .ctool-select-summary:is([aria-current], :hover, :active, :focus) {
    --border-color: var(--ctool-primary);
    --color: var(--ctool-primary);
}

.ctool-select[data-type="general"] details .ctool-select-summary[role="button"]::after {
    background-image: var(--icon-chevron);
}

.ctool-select details[role="list"] .ctool-select-summary::after {
    margin-inline-start: 0.2rem;
}

.ctool-select .ctool-select-left {
    position: absolute;
    top: 1px;
    left: 2px;
}

.ctool-select .ctool-select-prepend {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.4rem;
    height: calc(var(--height) - var(--border-width) * 2) !important;
    background-color: var(--ctool-block-title-bg-color);
    color: var(--ctool-info-color);
    border-right: var(--border-width) solid var(--form-element-border-color);
}

.ctool-select details[role="list"][open] .ctool-select-summary::after {
    transform: rotate(180deg);
}
</style>
