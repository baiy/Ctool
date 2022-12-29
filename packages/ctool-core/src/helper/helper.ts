import platform from "./platform"

export const openUrl = (url: string = window.location.href) => {
    platform.runtime.openUrl(url)
}

export const optionMap = (items: string[] | number[], prefix = "") => {
    return items.map((item: string | number) => {
        return {value: item, label: $t(`${prefix}${item}`)}
    })
}

