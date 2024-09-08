<template>
    <Tabs
        v-model="current"
        padding="20px 10px 0 20px"
        :lists="[
            {name:`second`,label:$t('crontab_generate_second')},
            {name:`minute`,label:$t('crontab_generate_minute')},
            {name:`hour`,label:$t('crontab_generate_hour')},
            {name:`day`,label:$t('crontab_generate_day')},
            {name:`month`,label:$t('crontab_generate_month')},
            {name:`week`,label:$t('crontab_generate_week')},
        ]"
    >
        <Item type="second" v-model="items.second" />
        <Item type="minute" v-model="items.minute" />
        <Item type="hour" v-model="items.hour" />
        <Item type="day" v-model="items.day" />
        <Item type="month" v-model="items.month" />
        <Item type="week" v-model="items.week" />
    </Tabs>
</template>

<script lang="ts" setup>
import "./style.css";
import Tabs from "@/components/ui/Tabs.vue";
import Item from "./Item.vue";
import { watch } from "vue";
import { ItemType } from "./type";

const modelValue = defineModel<string>({
    default:""
});

let current = $ref<ItemType>("minute");
let items = $ref({
    second: "",
    minute: "*",
    hour: "*",
    day: "*",
    month: "*",
    week: "*",
});
watch(() => {
    return { items };
}, ({ items }) => {
    modelValue.value = [
        ...(items.second !== "" ? [items.second] : []),
        items.minute,
        items.hour,
        items.day,
        items.month,
        items.week,
    ].join(" ");
}, { immediate: true, deep: true });
</script>
