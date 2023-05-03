<template>
    <Align direction="vertical" gap="large">
        <Option v-model="optionType" v-if="type==='second'" name="ignore" @select="(value)=>select(value)"/>
        <Option v-model="optionType" name="any" @select="(value)=>select(value)">
            <code>*</code>
        </Option>
        <Option v-model="optionType" name="scope" @select="(value)=>select(value)">
            <Align>
                <InputNumber size="small" v-model="optionValue.scope.start" :min="scope[0]" :max="scope[1]" :step="1"/>
                <code>-</code>
                <InputNumber size="small" v-model="optionValue.scope.end" :min="scope[0]" :max="scope[1]" :step="1"/>
            </Align>
        </Option>
        <Option v-model="optionType" name="interval" @select="(value)=>select(value)">
            <Align>
                <Input size="small" v-model="optionValue.interval.start"/>
                <code>/</code>
                <InputNumber size="small" v-model="optionValue.interval.step" :min="interval[0]" :max="interval[1]" :step="1"/>
            </Align>
        </Option>
        <Option v-model="optionType" name="list" @select="(value)=>select(value)">
            <Checkbox :options="list" v-model="optionValue.list"/>
        </Option>
    </Align>
</template>

<script lang="ts" setup>
import {watch, PropType} from 'vue';
import {range} from 'lodash';
import Align from "@/components/Align.vue";
import Option from "./Option.vue";
import Checkbox from "@/components/ui/Checkbox.vue";
import Input from "@/components/ui/Input.vue";
import InputNumber from "@/components/ui/InputNumber.vue";
import {ItemType, OptionType, OptionValue} from "./type";

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    type: {
        type: String as PropType<ItemType>,
        default: "minute"
    }
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

let optionType = $ref<OptionType>(props.type === "second" ? "ignore" : "any")

let optionValue = $ref<OptionValue>({
    any: "*",
    scope: {
        start: 2,
        end: 5,
    },
    interval: {
        start: "*",
        step: 5
    },
    list: []
})

const select = (value: any) => {
    optionType = value
}

const scope = $computed<[number, number]>(() => {
    if (props.type === "hour") {
        return [0, 23]
    }
    if (props.type === "day") {
        return [1, 31]
    }
    if (props.type === "month") {
        return [1, 12]
    }
    if (props.type === "week") {
        return [0, 7]
    }
    return [0, 59]
})
const interval = $computed<[number, number]>(() => {
    if (props.type === "hour") {
        return [2, 23]
    }
    if (props.type === "day") {
        return [2, 31]
    }
    if (props.type === "month") {
        return [2, 12]
    }
    if (props.type === "week") {
        return [2, 7]
    }
    return [0, 59]
})

const list = $computed(() => {
    if (props.type === "hour") {
        return range(0, 24)
    }
    if (props.type === "day") {
        return [...range(1, 32), 'L']
    }
    if (props.type === "month") {
        return range(1, 13)
    }
    if (props.type === "week") {
        return [...range(0, 8), ...range(1, 8).map(i => `${i}L`)]
    }
    return range(0, 60)
})

watch(() => {
    return {
        type: optionType,
        value: optionValue
    }
}, ({type, value}) => {
    if (type === "ignore") {
        return emit("update:modelValue", "")
    }
    if (type === "scope") {
        return emit("update:modelValue", `${value.scope.start}-${value.scope.end}`)
    }
    if (type === "interval") {
        let start = value.interval.start.trim()
        return emit("update:modelValue", `${["0", "*", ""].includes(start) ? "*" : value.interval.start}/${value.interval.step}`)
    }
    if (type === "list" && value.list.length > 0) {
        return emit("update:modelValue", value.list.join(","))
    }
    emit("update:modelValue", "*")
}, {deep: true})
</script>
