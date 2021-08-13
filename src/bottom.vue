<template>
    <div v-show="show" class="ctool-bottom">
        <div class="ctool-bottom-block">
            <notice-block/>
        </div>
    </div>
</template>

<script>
import Notice from './components/notice'

export default {
    name: "bottom",
    components: {
        "notice-block": Notice
    },
    data() {
        return {show: false}
    },
    methods: {
        setShow() {
            this.show = true
        }
    }
}
</script>

<style scoped>
.ctool-bottom {
    width: 100%;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    left: 0;
    height: 30px;
    overflow: hidden;
    border-top: 1px solid #dcdee2;
    background: #FFF;
}

.ctool-bottom-block {
    height: 28px;
    line-height: 28px;
    overflow: hidden;
}
</style>