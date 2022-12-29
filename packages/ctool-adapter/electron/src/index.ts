import {PlatformRuntime} from "ctool-config";

declare global {
    interface Window {
        ctoolDesktopBridge: {
            openUrl: (url: string) => void,
            toggleDevTools: () => void
        }
    }
}

export const runtime = new (class implements PlatformRuntime {
    name = "electron"

    is() {
        if (navigator.userAgent.includes("uTools")) {
            return false
        }
        return navigator.userAgent.includes("Electron");
    }

    openUrl(url: string) {
        return window.ctoolDesktopBridge.openUrl(url);
    }

    toggleDevTools() {
        return window.ctoolDesktopBridge.toggleDevTools()
    }
})
