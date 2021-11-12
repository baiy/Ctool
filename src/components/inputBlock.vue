<template>
    <div style="position: relative;">
        <slot></slot>
        <div class="right-bottom">
            <slot name="extra">
                <Button v-if="text" type="primary" size="small" @click="buttonClick">{{ text }}</Button>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'inputBlock',
    props: {
        text: {
            type: String,
            default: ""
        }
    },
    methods: {
        buttonClick() {
            this.$emit('on-default-right-bottom-click');
        }
    }
};
</script>

<style scoped>
.right-bottom {
    position: absolute;
    bottom: 4px;
    right: 4px;
}
</style>
