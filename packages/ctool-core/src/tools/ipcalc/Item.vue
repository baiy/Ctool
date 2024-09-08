<template>
    <div style="cursor: pointer" @click="$copy(`${props.value}`)" class="ctool-ipcalc-item">
        <div class="ctool-ipcalc-item-value">{{ props.value }}</div>
        <div class="ctool-ipcalc-item-title" v-if="props.title !== ''">{{ props.title }}</div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    value: {
        type: [String,Number],
        default: ""
    }
})
</script>
<style scoped>
.ctool-ipcalc-item {
    display: inline-block;
    cursor: pointer;
    padding: 5px 16px;
    font-size: .875rem;
}
.ctool-ipcalc-item:hover{
    background-color: var(--primary-focus);
}
.ctool-ipcalc-item-title {
    line-height: 14px;
    font-size: .75rem;
    color: var(--ctool-placeholder-text-color);
}

.ctool-ipcalc-item-value {
    line-height: 18px;
}
</style>
