import {Base64} from "js-base64";
import platform from "./platform";
import {onUnmounted, ref} from "vue";

// 剪贴板权限
export let permission: PermissionState = "denied"

// 初始化剪贴板权限
export const initPermission = async () => {
    return new Promise((resolve) => {
        if (platform.isUtools() || platform.isDesktop()) {
            permission = "granted"
            return resolve("")
        }

        // https://github.com/nolanlawson/pinafore/pull/618/files
        if (!navigator.permissions || !navigator.permissions.query) {
            return resolve("")
        }

        //@ts-ignore
        navigator.permissions.query({name: 'clipboard-read'}).then((result) => {
            permission = result.state
            resolve("")
        }).catch(() => {
            resolve("")
        })
    })
}

// 复制文本
export const copy = (data: string, successCallback?: () => void) => {
    try {
        if (data === "") {
            return;
        }
        navigator.clipboard.writeText(data).then(() => {
            successCallback && successCallback()
        }, function (e) {
            console.log('copy failed', e)
        });
    } catch (e) {
        console.log('copy error', e)
    }
}
// 获取剪贴板数据
export const paste = async (force: boolean = false): Promise<string> => {
    return new Promise((resolve) => {
        try {
            if (!force && permission !== "granted") {
                return resolve("")
            }
            navigator.clipboard.readText().then((text) => {
                return resolve(text ? text : "error")
            }).catch((e) => {
                console.error(e)
                return resolve("")
            })
        } catch {
            resolve("")
        }
    });
}

export const copyImage = (imageBase64: string, successCallback?: () => void) => {
    if (imageBase64) {
        try {
            if (permission !== "granted") {
                return;
            }
            let arr = imageBase64.split(',')
            if (arr.length < 1) {
                return;
            }
            const temp = arr[0].match(/:(.*?);/) || []
            let mime = temp.length > 1 ? temp[1] : "";
            if (!mime) {
                return;
            }
            let data = [new window.ClipboardItem({
                [mime]: new Blob([Base64.toUint8Array(arr[1])], {type: mime})
            })];
            navigator.clipboard.write(data).then(function () {
                successCallback && successCallback()
            }, function (e) {
                console.log('copy image failed', e)
            });
        } catch (e) {
            console.log('copy image error', e)
        }
    }
}


export const useClipboardPermission = () => {
    let state = ref(permission)
    const timer = setInterval(async () => {
        await initPermission()
        state.value = permission
        console.log(`clipboard permission check ${state.value}`)
    }, 500)
    onUnmounted(() => {
        clearInterval(timer)
    })
    return {state}
}

export default {
    copy,
    paste,
    copyImage
}
