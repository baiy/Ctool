import {PlatformRuntime} from "ctool-config";
import storage from "./storage";

export const runtime = new (class implements PlatformRuntime {
    name = "web"

    webSecurity() {
        return true
    }

    is() {
        return true
    }

    openUrl(url: string) {
        return window.open(url);
    }

    getLocale() {
        return navigator.language
    }

    storage() {
        return storage
    }

})
