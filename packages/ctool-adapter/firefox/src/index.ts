import {PlatformRuntime} from "ctool-config";

export const runtime = new (class implements PlatformRuntime {
    name = "firefox"

    is() {
        return navigator.userAgent.includes("Firefox") && !!window.browser?.tabs;
    }

    openUrl(url: string) {
        return browser.tabs.create({url: url});
    }

    getLocale() {
        return browser.i18n.getUILanguage() || ""
    }
})
