import {PlatformRuntime} from "ctool-config";

export const runtime = new (class implements PlatformRuntime {
    name = "chrome"

    is() {
        if (navigator.userAgent.includes("Edg")) {
            return false
        }
        return navigator.userAgent.includes("Chrome") && !!window.chrome?.tabs;
    }

    openUrl(url: string) {
        return chrome.tabs.create({url: url});
    }

    getLocale() {
        return chrome.i18n.getUILanguage() || ""
    }
})
