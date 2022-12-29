<template>
    <Suspense>
        <div class="ctool-global">
            <Header/>
            <Content/>
            <Bottom/>
        </div>
    </Suspense>
</template>

<script setup lang="ts">
import Content from '@/block/Content.vue'
import Bottom from '@/block/Bottom.vue'
import Header from '@/block/Header.vue'
import Message from "@/helper/message";
import useSetting from "@/store/setting";
import {onErrorCaptured} from "vue";

// 初始化配置
useSetting()

// 全局错误提示
const globalErrorMessage = (err) => {
    console.log("error:", err)
    const message: string = ("message" in err ? err.message : err).toString()
    Message.closeAll()
    if (message.includes("\n")) {
        Message.error(`${message}`, {duration: 0})
    } else {
        Message.error(message, {duration: 5000})
    }
}

// Uncaught Promise Error
window.addEventListener("unhandledrejection", function (event) {
    event.preventDefault();
    globalErrorMessage(event.reason)
});
onErrorCaptured((err) => {
    globalErrorMessage(err)
    return false
})

</script>
<style>
.ctool-global {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0px, 1fr) auto;
}
</style>

