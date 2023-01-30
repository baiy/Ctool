<template>
    <div
        class="ctool-bool"
        :data-size="size"
        :data-border="border ? 'y' : 'n'"
        :data-checked="checked ? 'y' : 'n'"
        :data-disabled="disabled ? 'y' : 'n'"
    >
        <label :for="key">
            <input type="checkbox" :id="key" :name="key" :disabled="disabled" v-model="checked"/>{{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
// 是否选中
import {PropType} from "vue"
import {ComponentSizeType} from "@/types";
import {uuid} from "@/helper/util";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    border: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    size: {
        type: String as PropType<ComponentSizeType>,
        default: "default"
    },
    label: {
        type: String,
        default: ""
    },
})

const key = `ctool-bool-key-${uuid()}`

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void, (e: 'change', value: boolean): void }>()

const checked = $computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
        emit('change', value)
    }
})
</script>
<style>
.ctool-bool {
    --height: 2;
    --font-size: 0.875;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: calc(1rem * var(--height));
    box-sizing: border-box;
    cursor: pointer;
}

.ctool-bool[data-disabled="y"][data-border="y"] label {
    color: unset;
}

.ctool-bool:hover, .ctool-bool[data-checked="y"] {
    --color: var(--ctool-primary);
}

.ctool-bool input {
    --border-width: 1px !important;
    border-radius: 0;
}

.ctool-bool input:hover {
    --border-color: var(--ctool-primary);
}

.ctool-bool[data-disabled="y"] input[type="checkbox"] {
    --background-color: var(--form-element-disabled-background-color);
}

.ctool-bool label {
    cursor: pointer;
    font-size: calc(1rem * var(--font-size));
    color: var(--color);

}

.ctool-bool[data-border="y"] {
    border: 1px solid var(--ctool-border-color);
    padding: 0 calc(.8rem * var(--font-size));
    border-radius: var(--border-radius);
    background-color: var(--ctool-background-color);
}

.ctool-bool[data-border="y"][data-checked="y"]:not([data-disabled="y"]), .ctool-bool[data-border="y"]:hover {
    border: 1px solid var(--ctool-primary);
}

.ctool-bool[data-size="small"] {
    --font-size: 0.75;
    --height: 1.5;
}

.ctool-bool[data-size="large"] {
    --font-size: 1;
    --height: 2.5;
}

.ctool-bool input {
    height: calc(1rem * var(--font-size));
    width: calc(1rem * var(--font-size));
}
</style>
