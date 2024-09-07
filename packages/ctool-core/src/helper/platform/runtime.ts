import { PlatformRuntime, Storage, Initializer } from "@/types";
import { runtime as web } from "./platformRuntimeDefault";
import { runtime as edge } from "ctool-adapter-edge";
import { runtime as chrome } from "ctool-adapter-chrome";
import { runtime as firefox } from "ctool-adapter-firefox";
import { runtime as utools } from "ctool-adapter-utools";
import { runtime as tauri } from "ctool-adapter-tauri";
import { Router } from "vue-router";
// 适配平台
const platforms = [edge, chrome, firefox, utools, tauri];

export default class {
    private readonly platformRuntime: PlatformRuntime;

    constructor() {
        for (let platform of platforms) {
            if (platform.is()) {
                this.platformRuntime = platform;
                return;
            }
        }
        this.platformRuntime = web;
    }

    name() {
        return this.platformRuntime.name;
    }

    webSecurity() {
        return this.platformRuntime.webSecurity?.() || false;
    }

    openUrl(url: string) {
        return this.platformRuntime.openUrl(url);
    }

    // 平台入口
    initialize(storage: Storage, router: Router) {

        const initializer: Initializer = {
            storage(): Storage {
                return storage;
            },
            push(path: string, query: Record<string, string | number> = {}) {
                void router.push({ path, query });
            },
        };

        this.platformRuntime.initialize?.(initializer);
    }

    get storage() {
        return this.platformRuntime.storage?.() || web.storage();
    }

    call<T = any>(method: string, ...param: any[]): T {
        return this.platformRuntime[method]?.(...param);
    }

    getLocale() {
        return this.platformRuntime.getLocale?.() || web.getLocale();
    }
}
