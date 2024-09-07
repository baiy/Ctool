import { LocaleLists } from "@/types";
import Runtime from "./runtime";

class Platform {
    private readonly _runtime = new Runtime;

    get name() {
        return this.runtime.name();
    }

    isChrome(): boolean {
        return this.name === "chrome";
    }

    isEdge(): boolean {
        return this.name === "edge";
    }

    isChromium(): boolean {
        return this.isChrome() || this.isEdge();
    }

    isFirefox(): boolean {
        return this.name === "firefox";
    }

    isUtools(): boolean {
        return this.name === "utools";
    }

    isWeb(): boolean {
        return this.name === "web";
    }

    isDesktop(): boolean {
        return ["tauri"].includes(this.name);
    }

    getLocale(): LocaleLists {
        // link https://www.ruanyifeng.com/blog/2008/02/codes_for_language_names.html
        const locale = (this.runtime.getLocale() || "").trim();
        return locale === "zh" || locale.indexOf("zh-") === 0 || locale.indexOf("zh_") === 0 ? "zh_CN" : "en";
    }

    get runtime() {
        return this._runtime;
    }
}

export default new Platform;
