<template>
    <div class="ctool-crontab-generate-layout" @click="emit('select',props.name)">
        <Icon hover v-if="modelValue === props.name" :size="14" color="var(--primary)" name="checked" />
        <Icon hover v-else :size="14" color="var(--ctool-border-color)" name="unchecked" />
        <span>{{ $t(`crontab_generate_${props.name}`) }}</span>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        default: "",
    },
});

const modelValue = defineModel<string>({
    default: "",
});


const emit = defineEmits<{ (e: "select", value: string): void }>();

</script>
