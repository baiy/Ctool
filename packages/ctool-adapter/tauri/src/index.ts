import {PlatformRuntime} from "ctool-config";

export const runtime = new (class implements PlatformRuntime {
    name = "tauri"

    is() {
        return !!window['__TAURI__'];
    }

    openUrl(url: string) {
        return window['__TAURI__'].shell.open(url);
    }
})
