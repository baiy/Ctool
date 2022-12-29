import {PlatformRuntime} from "ctool-config";

export const runtime = new (class implements PlatformRuntime {
    name = "edge"

    is() {
        return navigator.userAgent.includes("Edg") && !!window.chrome?.tabs;
    }

    openUrl(url: string) {
        return chrome.tabs.create({url: url});
    }

    getLocale() {
        return chrome.i18n.getUILanguage() || ""
    }
})
