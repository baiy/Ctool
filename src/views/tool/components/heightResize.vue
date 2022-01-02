<template>
    <div :style="`height:${height}`">
        <slot></slot>
    </div>
</template>
<script>
import {WINDOW_RESIZE} from '../../../tool/event'
function getAbsoluteHeight(select) {
    let el = document.querySelector(select)
    if (el === null) {
        return 0;
    }
    let styles = window.getComputedStyle(el);
    let margin = parseFloat(styles['marginTop']) +
        parseFloat(styles['marginBottom']);
    return Math.ceil(el.offsetHeight + margin);
}

// 窗口高度调整 返回工具页面可操作高度
export default {
    name: 'heightResize',
    props: {
        append: {
            type: Array,
            default: function () {
                return [];
            }
        },
        reduce: {
            type: Number,
            default: 0
        },
        remove: {
            type: Array,
            default: function () {
                return [];
            }
        },
        ignore: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            height: "auto",
        }
    },
    methods: {
        reportWindowSize() {
            this.resize()
        },
        resize() {
            let height = window.innerHeight;
            let defaultBlock = [".tool-select-block", ".tool-category-menu-block", ".ctool-bottom"]
            const filterBlock = defaultBlock.filter((item) => {
                return !this.remove.includes(item)
            }).concat(this.append)
            for (let block of filterBlock) {
                height = height - getAbsoluteHeight(block)
            }
            if (this.reduce > 0){
                height = height - this.reduce
            }
            if (height > 100) {
                height = height - 5
            }
            if (!this.ignore) {
                this.height = height + "px"
            }
            this.$emit('resize', height);
        }
    },
    destroyed() {
        window.removeEventListener(WINDOW_RESIZE, this.reportWindowSize);
    },
    mounted() {
        window.addEventListener(WINDOW_RESIZE, this.reportWindowSize);
        this.resize();
    }
};
</script>

