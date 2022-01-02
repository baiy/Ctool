<template>
    <Form inline :style="style" class="option-block">
        <slot></slot>
    </Form>
</template>
<script>
export default {
    name: 'optionBlock',
    props: {
        center: {
            type: Boolean,
            default: false
        },
        disablePadding: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        style() {
            let css = {
                padding: !this.disablePadding ? "10px 0" : "0",
            };
            if (this.center) {
                css.textAlign = "center"
            }
            return css;
        }
    }
};
</script>

<style>
.option-block .ivu-form-item {
    margin-bottom: 0;
}
</style>
