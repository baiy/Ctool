<template>
    <div class="tool-disable-mask">
        <div>
            <div style="line-height: 24px;word-break:break-all;background-color: #fff;padding: 5px 10px;margin: 0 10px">
                <slot></slot>
            </div>
            <div style="text-align: center;margin-top: 10px" v-if="!disableClose">
                <Icon type="md-close-circle" style="cursor: pointer;" size="30" color="#FFF" @click="close" />
            </div>
        </div>

    </div>
</template>
<script>

export default {
    props:{
        disableClose: {
            type: Boolean,
            default: false
        },
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
};
</script>
<style scoped>
.tool-disable-mask{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(55, 55, 55, 0.2);
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
}
</style>

