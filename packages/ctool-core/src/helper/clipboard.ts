import platform from "./platform";
import { onUnmounted, ref } from "vue";

// 剪贴板权限
export let permission: PermissionState = "denied";

// 初始化剪贴板权限
export const initPermission = async () => {
    return new Promise(resolve => {
        if (platform.isUtools() || platform.isDesktop()) {
            permission = "granted";
            return resolve("");
        }

        // https://github.com/nolanlawson/pinafore/pull/618/files
        if (!navigator.permissions || !navigator.permissions.query) {
            return resolve("");
        }

        navigator.permissions
            //@ts-ignore
            .query({ name: "clipboard-read" })
            .then(result => {
                permission = result.state;
                resolve("");
            })
            .catch(() => {
                resolve("");
            });
    });
};

// 复制文本
export const copy = (data: string, successCallback?: () => void) => {
    try {
        if (data === "") {
            return;
        }
        navigator.clipboard.writeText(data).then(
            () => {
                successCallback && successCallback();
            },
            function (e) {
                console.log("copy failed", e);
            },
        );
    } catch (e) {
        console.log("copy error", e);
    }
};
// 获取剪贴板数据
export const paste = async (force: boolean = false): Promise<string> => {
    return new Promise(resolve => {
        try {
            if (!force && permission !== "granted") {
                return resolve("");
            }
            navigator.clipboard
                .readText()
                .then(text => {
                    return resolve(text ? text : "error");
                })
                .catch(e => {
                    console.error(e);
                    return resolve("");
                });
        } catch {
            resolve("");
        }
    });
};

export const copyImage = (imageBase64: string, successCallback?: () => void) => {
    if (imageBase64) {
        if (permission !== "granted") {
            throw new Error("剪贴板权限不足");
        }

        if (imageBase64.split(",").length < 1) {
            throw new Error("图片格式错误");
        }

        // 图片转png 因为部分图片格式剪贴板展示不支持
        // https://stackoverflow.com/questions/62909538/is-there-any-way-to-copy-image-to-clipboard-with-pure-javascript-without-librari

        const inputImage = new Image();
        inputImage.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = inputImage.width;
            canvas.height = inputImage.height;

            const ctx = canvas.getContext("2d");
            ctx?.drawImage(inputImage, 0, 0, inputImage.width, inputImage.height);

            canvas.toBlob(blob => {
                if (!blob) {
                    throw new Error("Canvas 转换为 Blob 失败");
                }
                let data = [new window.ClipboardItem({ [blob.type]: blob })];
                navigator.clipboard.write(data).then(
                    () => successCallback && successCallback(),
                    e => {
                        throw e;
                    },
                );
            }, "image/png");
        };
        inputImage.src = imageBase64;
    }
};

export const useClipboardPermission = () => {
    let state = ref(permission);
    const timer = setInterval(async () => {
        await initPermission();
        state.value = permission;
        console.log(`clipboard permission check ${state.value}`);
    }, 500);
    onUnmounted(() => {
        clearInterval(timer);
    });
    return { state };
};

export default {
    copy,
    paste,
    copyImage,
};
