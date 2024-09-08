<template>
    <Suspense>
        <div class="ctool-global">
            <SimpleHeader v-if="storeSetting.items.layout === `simple`" />
            <ComplexHeader v-else />
            <Content />
            <SimpleBottom v-if="storeSetting.items.layout === `simple`" />
            <ComplexBottom v-else />
        </div>
    </Suspense>
</template>

<script setup lang="ts">
import Content from "@/block/Content.vue";
import Message from "@/helper/message";

import SimpleHeader from "@/block/layout/simple/Header.vue";
import SimpleBottom from "@/block/layout/simple/Bottom.vue";
import ComplexHeader from "@/block/layout/complex/Header.vue";
import ComplexBottom from "@/block/layout/complex/Bottom.vue";
import useSetting, { useTheme } from "@/store/setting";
import { nextTick, onErrorCaptured, onMounted, watch } from "vue";
import { isObject } from "lodash";
import platform from "@/helper/platform";
import storage from "@/helper/storage";
import { useRouter } from "vue-router";

// 初始化配置
const storeSetting = useSetting();
const router = useRouter();
// 初始化主题
useTheme();

watch(
    () => {
        return {
            layout: storeSetting.items.layout,
        };
    },
    async () => {
        await nextTick();
        window.dispatchEvent(new Event("resize"));
    },
);

// 全局错误提示
const globalErrorMessage = (err: any) => {
    console.log("error:", err);
    const message: string = (isObject(err) && "message" in err ? err.message : err).toString();
    Message.closeAll();
    if (message.includes("\n")) {
        Message.error(`${message}`, { duration: 0 });
    } else {
        Message.error(message, { duration: 5000 });
    }
};

// Uncaught Promise Error
window.addEventListener("unhandledrejection", function(event) {
    event.preventDefault();
    globalErrorMessage(event.reason);
});

// Uncaught Error
window.addEventListener("error", event => {
    event.preventDefault();
    globalErrorMessage(event.error);
});

onErrorCaptured(err => {
    globalErrorMessage(err);
    return false;
});

onMounted(() => {
    platform.runtime.initialize(storage, router);
});
</script>
<style>
.ctool-global {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0px, 1fr) auto;
}
</style>
