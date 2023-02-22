import {PlatformRuntime} from "ctool-config";
import storage from "./storage";
import {registerSW} from 'virtual:pwa-register'

let updateSw: (reloadPage?: boolean) => Promise<void> | undefined
// let pwaInstaller: any = null
let pwaIsNeedRefresh: boolean = false

export const runtime = new (class implements PlatformRuntime {
    name = "web"

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

    async pwaRefresh() {
        await updateSw?.(true)
    }

    async pwaIsNeedRefresh() {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                console.log(`pwa is need refresh: ${pwaIsNeedRefresh}`)
                resolve(pwaIsNeedRefresh)
            }, 10000)
        })
    }

    // pwaInstall() {
    //     if (pwaInstaller) {
    //         pwaInstaller.prompt()
    //         pwaInstaller.userChoice.then((choiceResult) => {
    //             console.log(choiceResult)
    //             console.log(choiceResult.outcome); // either "accepted" or "dismissed"
    //         }, () => {
    //         })
    //         pwaInstaller = null
    //     }
    // }

    async entry() {
        // window.addEventListener("beforeinstallprompt", (event) => {
        //     pwaInstaller = event
        // })
        updateSw = registerSW({
            immediate: true,
            onNeedRefresh() {
                pwaIsNeedRefresh = true
            }
        })
    }
})
