import {PlatformRuntime, StorageInterface, Storage, toolExists, getTool} from "ctool-config";
import storageUtools from "./storage"

export const runtime = new (class implements PlatformRuntime {
    name = "utools"

    is() {
        return navigator.userAgent.includes("uTools");
    }

    openUrl(url: string) {
        return window.utools.shellOpenExternal(url)
    }

    storage(): StorageInterface {
        return storageUtools;
    }

    getLocale() {
        return "zh_CN"
    }

    entry(storage: Storage) {
        return new Promise<void>((resolve) => {
            window.utools.onPluginEnter(({code, type, payload}) => {
                window.utools.showMainWindow()
                if (!code.includes("ctool-")) {
                    return resolve()
                }
                const [_, _tool, _feature] = code.split('-')
                if (!toolExists(_tool)) {
                    return resolve()
                }

                const tool = getTool(_tool)
                if (!tool.existFeature(_feature)) {
                    return resolve()
                }
                const feature = tool.getFeature(_feature)

                // 输入框数据写入临时存储
                if (["over", "regex"].includes(type) && payload !== "") {
                    storage.setNoVersion('_temp_storage', payload, 10)
                }
                window.location.hash = `#${feature.getRouter()}?input=_temp_storage`
                resolve()
            })
        })
    }
})
