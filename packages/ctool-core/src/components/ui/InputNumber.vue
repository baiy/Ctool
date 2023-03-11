<template>
    <Input v-model="current" type="number" :max="max" :min="min" :step="step">
        <template #prepend v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </template>
        <template #append v-if="$slots.append">
            <slot name="append"></slot>
        </template>
        <template #suffix v-if="$slots.suffix">
            <slot name="suffix"></slot>
        </template>
        <template #prefix v-if="$slots.prefix">
            <slot name="prefix"></slot>
        </template>
    </Input>
</template>

<script setup lang="ts">
import {toNumber} from "lodash";

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    },
    step: {
        type: [Number, String],
        default: "any"
    },
    min: {
        type: [Number, Boolean],
        default: 0
    },
    max: {
        type: [Number, Boolean],
        default: false
    }
})

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void, (e: 'change', value: number): void }>()

const current = $computed({
    get: () => `${props.modelValue}`,
    set: (value) => {
        const _value = toNumber(`${value}`)
        emit('update:modelValue', _value)
        emit('change', _value)
    }
})
</script>
<style>
.ctool-input input[type="number"] {
    text-align: center;
}
</style>
