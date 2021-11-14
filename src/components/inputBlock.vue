<template>
    <div style="position: relative;">
        <slot></slot>
        <div :style="extraStyle">
            <slot name="extra">
                <Button v-if="text" :type="type" size="small" @click="buttonClick">{{ text }}</Button>
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
        },
        bottom: {
            type: String,
            default: "4px"
        },
        top: {
            type: String,
            default: ""
        },
        left: {
            type: String,
            default: ""
        },
        right: {
            type: String,
            default: "4px"
        },
        type:{
            type: String,
            default: "primary"
        }

    },
    computed:{
        extraStyle(){
            let css = {
                fixed:"position: absolute",
                zindex:"z-index:100",
                vertical:this.top !== "" ? `top:${this.top}` : `bottom:${this.bottom}`,
                horizontal:this.left !== "" ? `left:${this.left}` : `right:${this.right}`,
            };
            return Object.values(css).join(";")
        }
    },
    methods: {
        buttonClick() {
            this.$emit('on-default-right-bottom-click');
        }
    }
};
</script>
