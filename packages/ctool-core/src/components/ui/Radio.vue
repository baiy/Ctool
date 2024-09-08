<template>
    <div class="ctool-radio">
        <Button :size="size" :disabled="disabled" v-for="item in getOptions" :type="getButtonType(item.value)"
                @click="select(item.value)">{{ item.label }}
        </Button>
    </div>
</template>

<script setup lang="ts">
// 单选
import { PropType } from "vue";
import { isNumber, isString } from "lodash";
import { ComponentSizeType, RadioOption, RadioValue } from "@/types";

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: "",
    },
    options: {
        type: Array as PropType<RadioOption>,
        default: [],
    },
    size: {
        type: String as PropType<ComponentSizeType>,
        default: "default",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{
    (e: "update:modelValue", value: RadioValue): void,
    (e: "change", value: RadioValue): void
}>();

let current = $computed({
    get: () => props.modelValue,
    set: (value) => {
        emit("update:modelValue", value);
        emit("change", value);
    },
});

const getOptions = $computed(() => {
    let items: Array<{ value: RadioValue, label: string }> = [];
    for (let item of props.options) {
        if (isNumber(item) || isString(item)) {
            items.push({ value: item, label: `${item}` });
        } else {
            items.push({ value: item.value, label: `${item.label}` });
        }
    }
    return items;
});

const getButtonType = (value: RadioValue) => {
    return value === current ? "primary" : "general";
};

const select = (value: string | number) => {
    current = value;
};
</script>
<style>
.ctool-radio {
    display: inline-block;
}

.ctool-radio .ctool-button:not(:first-of-type,:last-of-type) button {
    border-radius: 0;
}

.ctool-radio .ctool-button:not(:last-child) {
    margin-right: -1px;
}

.ctool-radio .ctool-button button:is(:active,:focus,:hover) {
    z-index: 1;
}

.ctool-radio .ctool-button:first-of-type button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.ctool-radio .ctool-button:last-of-type button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>
