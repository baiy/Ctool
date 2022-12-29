<template>
    <HeightResize v-slot="{height}">
        <Table :columns="columns" :lists="getReference()" :height="height"/>
    </HeightResize>
</template>

<script lang="ts" setup>
import {getReference} from "./util";

const columns = $computed(() => {
    return [
        {
            title: $t('regex_reference_name'),
            key: 'name',
            width: 150
        },
        {
            title: $t('regex_reference_text'),
            key: 'text',
            html: true
        }
    ]
})
</script>
