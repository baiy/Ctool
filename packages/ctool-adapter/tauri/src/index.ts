import {PlatformRuntime} from "ctool-config";

declare global {
    interface Window {
        __TAURI__: {
            shell: {
                open: (url: string) => void
            },
            invoke: (command: string, option?: Record<string, any>) => any
        }
    }
}

export const runtime = new (class implements PlatformRuntime {
    name = "tauri"

    is() {
        return !!window['__TAURI__'];
    }

    openUrl(url: string) {
        return window.__TAURI__.shell.open(url);
    }

    // 开发工具操作
    toggleDevTools() {
        return window['__TAURI__'].invoke('toggle_dev_tools');
    }
})
