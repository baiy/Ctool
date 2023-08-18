import { createApp } from "vue";
import { pinia } from "@/helper/pinia";
import platform from "@/helper/platform";
import storage from "@/helper/storage";
import ctool from "@/helper/plugin";
import router from "@/helper/router";
import "@/statics/style.css";
import Tool from "@/Tool.vue";
import ContextMenu from "@imengyu/vue3-context-menu";
import { initPermission as initClipboardPermission } from "@/helper/clipboard";

(async () => {
    await initClipboardPermission();
    if (document.body.clientWidth > 850 || platform.isUtools() || platform.isWeb() || platform.isDesktop()) {
        const page = document.getElementById("ctool");
        if (page) {
            page.style.width = "auto";
            page.style.height = "auto";
        }
    }
    const app = createApp(Tool);
    app.use(pinia).use(router).use(ctool).use(ContextMenu);
    await platform.runtime.entry(() => {
        app.mount("#app");
    }, storage);
})();
