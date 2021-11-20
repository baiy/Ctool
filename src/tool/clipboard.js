import {Base64} from "js-base64";

// 剪贴板操作
export const copy = (data, successCallback) => {
    try {
        navigator.clipboard.writeText(data).then(function () {
            successCallback && successCallback()
        }, function (e) {
            console.log('copy failed', e)
        });
    } catch (e) {
        console.log('copy error', e)
    }
}

export const paste = async () => {
    return new Promise((resolve) => {
        try {
            navigator.clipboard.readText().then((text) => {
                return resolve(text ? text : "")
            }).catch((e) => {
                console.error(e)
                return resolve("")
            })
        } catch {
            resolve("")
        }
    });
}

export const copyImage = (imageBase64, successCallback = "") => {
    if (imageBase64) {
        try {
            let arr = imageBase64.split(',')
            let mime = arr[0].match(/:(.*?);/)[1];
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

export default {
    copy,
    paste,
    copyImage
}
