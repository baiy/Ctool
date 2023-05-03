<template>
    <div class="ctool-crontab-generate-layout" @click="emit('select',name)">
        <Icon hover v-if="modelValue === name" :size="14" color="var(--primary)" name="checked"/>
        <Icon hover v-else :size="14" color="var(--ctool-border-color)" name="unchecked"/>
        <span>{{ $t(`crontab_generate_${name}`) }}</span>
        <div><slot></slot></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    }
})

const emit = defineEmits<{ (e: 'select', value: string): void }>()

</script>
