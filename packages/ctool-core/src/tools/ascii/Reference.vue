<template>
    <HeightResize v-slot="{height}">
        <Table :columns="columns" :lists="lists" :height="height"/>
    </HeightResize>
</template>

<script lang="ts" setup>
import {asciiMap, asciiHidden, convent} from "./util";

type RowType = {
    dec: string
    hex: string
    oct: string
    bin: string
    str: string
    is_visible: string
    explain: string
}
const lists = $computed(() => {
    let data: RowType[] = []
    for (let i in asciiMap) {
        const isVisible = !(asciiMap[i] in asciiHidden)
        data.push({
            dec: `${i}`,
            hex: convent(i, 'dec', 'hex'),
            oct: convent(i, 'dec', 'oct'),
            bin: convent(i, 'dec', 'bin'),
            str: asciiMap[i],
            is_visible: isVisible ? $t('ascii_yes') : $t('ascii_no'),
            explain: isVisible ? "" : asciiHidden[asciiMap[i]]
        })
    }
    return data
})
const columns = [
    {
        title: $t('ascii_input_dec'),
        key: 'dec',
        width: 70
    },
    {
        title: $t('ascii_input_hex'),
        key: 'hex',
        width: 90
    },
    {
        title: $t('ascii_input_oct'),
        key: 'oct',
        width: 70
    },
    {
        title: $t('ascii_input_bin'),
        key: 'bin',
        width: 95
    },
    {
        title: $t('ascii_input_str'),
        key: 'str',
        width: 70
    },
    {
        title: $t('ascii_is_visible'),
        key: 'is_visible',
        width: 90
    },
    {
        title: $t('ascii_description'),
        key: 'explain',
    }
]
</script>
