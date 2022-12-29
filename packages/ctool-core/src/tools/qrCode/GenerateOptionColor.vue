<template>
    <Align>
        <slot></slot>
        <Bool border :size="size" v-model="current.is_gradient" :label="$t('qrCode_generate_option_gradient')" />
        <Color :size="size" v-model="current.simple" v-if="!current.is_gradient" />
        <template v-if="current.is_gradient">
            <Color :size="size" v-model="current.gradient.colorStops[0].color" />
            <Color :size="size" v-model="current.gradient.colorStops[1].color" />
            <Radio :size="size" v-model="current.gradient.type" :options="optionMap(['linear' , 'radial'],'qrCode_generate_option_')" button />
            <InputNumber :size="size" v-model="current.gradient.rotation" :min="0" :max="360" :width="100">
                <template #prepend>
                    {{ $t('qrCode_generate_option_rotation') }}
                </template>
            </InputNumber>
        </template>
    </Align>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {defaultGenerateColor, GenerateColor} from "./util";
import {ComponentSizeType} from "@/types";
import {optionMap} from "@/helper/helper";

const props = defineProps({
    modelValue: {
        type: Object as PropType<GenerateColor>,
        default: () => defaultGenerateColor("#ffffff")
    },
    size: {
        type: String as PropType<ComponentSizeType>,
        default: "default"
    }
})
const emit = defineEmits<{ (e: 'update:modelValue', value: GenerateColor): void }>()

const current:GenerateColor = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})
</script>
