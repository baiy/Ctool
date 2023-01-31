<template>
    <Align class="ctool-checkbox" :direction="direction">
        <Bool v-for="key in listKeys" :key="key" :model-value="lists[key].select" :label="lists[key].label" @change="(value)=>update(key,value)" :size="size"
              :border="border"/>
    </Align>
</template>

<script setup lang="ts">
// 多选
import {PropType, watch} from "vue"
import {AlignDirection, ComponentSizeType, CheckboxOption, CheckboxValue} from "@/types";
import {isNumber, isString} from "lodash";

const props = defineProps({
    modelValue: {
        type: Array as PropType<CheckboxValue>,
        default: []
    },
    border: {
        type: Boolean,
        default: false
    },
    direction: {
        type: String as PropType<AlignDirection>,
        default: "horizontal"
    },
    size: {
        type: String as PropType<ComponentSizeType>,
        default: "default"
    },
    options: {
        type: Array as PropType<CheckboxOption>,
        default: []
    },
})

const serializeOptions = $computed(() => {
    let items: Array<{ value: string | number, label: string }> = []
    for (let item of props.options) {
        if (isNumber(item) || isString(item)) {
            items.push({value: item, label: `${item}`})
        } else {
            items.push({value: item.value, label: `${item.label}`})
        }
    }
    return items
})

const emit = defineEmits<{ (e: 'update:modelValue', value: CheckboxValue): void }>()

type ListsValueType = Record<string, { value: string | number, select: boolean, label: string }>

let lists = $ref<ListsValueType>({})

watch(() => {
    return {
        options: serializeOptions,
        values: props.modelValue
    }
}, ({options, values}) => {
    let temp: ListsValueType = {}
    for (let option of options) {
        temp[`${isNumber(option.value) ? 'n_' : 's_'}${option.value}`] = {
            value: option.value,
            select: values.includes(option.value),
            label: option.label
        }
    }
    lists = temp
}, {deep: true, immediate: true})

const listKeys = $computed(() => {
    return Object.keys(lists)
})

const update = (key: string, value: boolean) => {
    lists[key].select = value
    emit('update:modelValue', listKeys.filter(item => lists[item].select).map(key => {
        return lists[key].value
    }) || [])
}
</script>
<style>
</style>
