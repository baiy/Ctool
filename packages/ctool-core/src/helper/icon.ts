import {iconViewBox as viewBox, iconType} from "@/buildDataTemp";

const lists: Record<string, VNode> = {}

import {h, VNode} from 'vue'

const svg = (name: string, paths: string[]) => {
    let [left, top, right, bottom] = viewBox[name]
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
        paths.map(path => {
            return h('path', {d: path})
        })
    )
}

export const all = Object.keys(viewBox) as iconType[]

export type IconType = iconType

export const load = async (name: iconType) => {
    if (!(name in lists)) {
        let paths: string[] | string = await import(/* @vite-ignore */ `../statics/icon/${name}.ts`).then(m => m.default)
        if (!Array.isArray(paths)) {
            paths = [paths]
        }
        if (!(name in viewBox)) {
            throw new Error(`icon [${name}] not found`)
        }
        lists[name] = svg(name, paths)
    }
    return lists[name]
}
