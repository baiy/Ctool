<template>
    <Select @change="change" center :options="props.options" v-bind="$attrs" />
</template>
<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script setup lang="ts">
// 下拉菜单
import Select from "./Select.vue";
import { SelectOption, SelectValue } from "@/types";
import { PropType } from "vue";

const props = defineProps({
    options: {
        type: Array as PropType<SelectOption>,
        default: [],
    },
});

const emit = defineEmits<{ (e: "select", value: SelectValue): void }>();

const change = (value: string | number) => {
    emit("select", value);
};
</script>
