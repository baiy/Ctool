<template>
    <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;gap: .5rem">
        <Icon :name="content !== '' ? `error` : `empty`" size="2rem" style="color:var(--ctool-info-color);"/>
        <div style="color:var(--ctool-info-color);font-size: .875rem">{{ props.content ? props.content : $t(`main_ui_null`) }}</div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    content: {
        type: String,
        default: ""
    }
})
</script>
