<template>
    <div class="ctool-table" :style="style">
        <table role="grid">
            <thead>
            <tr>
                <th v-for="column in columns" :style="{...(column.width ? {width: sizeConvert(column.width)} : {})}">{{ column.title }}</th>
                <template v-if="$slots.default">
                    <th :style="{...(actionWidth ? {width: sizeConvert(actionWidth)} : {})}">
                        <Align horizontal="center">
                            {{ $t(`main_ui_op`) }}
                        </Align>
                    </th>
                </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(items,index) in lists">
                <template v-if="$slots.column">
                    <slot :row="items" :index="index" name="column"/>
                </template>
                <template v-else v-for="column in columns">
                    <td v-if="column.html" v-html="items[column.key]"/>
                    <td v-else>{{ items[column.key] }}</td>
                </template>
                <template v-if="$slots.default">
                    <td>
                        <Align horizontal="center">
                            <slot :row="items" :index="index"/>
                        </Align>
                    </td>
                </template>

            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
// 简单表格
import {TableConfig, TableLists} from "@/types"
import {PropType, StyleValue} from "vue";
import {sizeConvert} from "@/components/util";

const props = defineProps({
    columns: {
        type: Array as PropType<TableConfig>,
        default: []
    },
    lists: {
        type: Array as PropType<TableLists>,
        default: []
    },
    height: {
        type: [String, Number],
        default: ""
    },
    actionWidth: {
        type: [String, Number],
        default: ""
    },
    border: {
        type: Boolean,
        default: false
    }
})

const style = $computed(() => {
    let css: StyleValue = {}
    if (css.height) {
        css.height = sizeConvert(props.height)
    }
    if (props.border) {
        css['--ctool-table-border-width'] = "1px"
    }
    return css
})
</script>
<style>
.ctool-table {
    --ctool-table-border-width: 0;
    height: auto;
    width: 100%;
    border: var(--ctool-table-border-width) solid var(--ctool-border-color);
    overflow-y: auto;
    --font-size:.875rem;
}

.ctool-table table {
    height: 100%;
    width: 100%;
    margin-bottom: 0;
    position: relative;
}

.ctool-table th, .ctool-table td {
    padding: .4rem .8rem;
}

.ctool-table th {
    position: sticky;
    top: 0;
    background-color: var(--ctool-block-title-bg-color);
}

.ctool-table table[role=grid] tbody tr:hover {
    background-color: var(--primary-focus);
}

.ctool-table table tbody tr:last-child td {
    border-bottom: none;
}
</style>
