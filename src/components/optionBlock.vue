<template>
    <Form inline style="padding: 10px 0" class="option-block">
        <slot></slot>
    </Form>
</template>
<script>
    export default {
        name: 'optionBlock'
    };
</script>

<style>
    .option-block .ivu-form-item{
        margin-bottom: 0;
    }
</style>
