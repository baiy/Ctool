import {iconData, iconType} from "@/buildDataTemp";

const lists: Record<string, VNode> = {}

import {h, VNode} from 'vue'

const svg = (name: iconType) => {
    let [left, top, right, bottom] = iconData[name].box
    left = Math.ceil(left)
    top = Math.ceil(top)
    right = Math.ceil(right - left)
    bottom = Math.ceil(bottom - top)
    return h(
        'svg',
        {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: `${left} ${top} ${right} ${bottom}`,
            'data-icon': name
        },
        iconData[name].data.map(path => {
            return h('path', {d: path})
        })
    )
}

export const all = Object.keys(iconData) as iconType[]

export type IconType = iconType

export const load = async (name: iconType) => {
    if (!(name in lists)) {
        if (!(name in iconData)) {
            throw new Error(`icon [${name}] not found`)
        }
        lists[name] = svg(name)
    }
    return lists[name]
}
