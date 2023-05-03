import {debug} from "@/helper/util"
import {throttle, isArray} from "lodash"

const events = [
    // 显示主题变化
    'theme_change',
    // 切换显示语言
    'locale_change',
    // 窗口高度调整
    'window_height_resize',
    // 组件尺寸更新
    'component_resize',
    // 关闭非当前需要打开扩展页面
    'extend_page_close',
    // 历史变更
    'history_change',
    // 工具切换
    'tool_change',
    // 打开设置页面
    'open_setting',
    // 页面内容一建清空
    'content_clear'
] as const

type Event = typeof events[number]
const eventName = (name: Event) => `ctool_${name}`

type Listener = () => void

const event = {
    dispatch(name: Event, option: any = "") {
        debug(`dispatch event:${name}${option ? ` option ${option}` : ""}`)
        window.dispatchEvent(new CustomEvent(eventName(name)))
    },
    addListener(name: Event | Event[], listener: Listener) {
        if (isArray(name)) {
            for (let item of name) {
                this.addListener(item, listener)
            }
            return;
        }
        window.addEventListener(eventName(name), listener)
    },
    removeListener(name: Event | Event[], listener: Listener) {
        if (isArray(name)) {
            for (let item of name) {
                this.removeListener(item, listener)
            }
            return;
        }
        window.removeEventListener(eventName(name), listener)
    }
}

// 获取操作区域高度
const getMainOperateHeight = () => {
    let el = document.querySelector<HTMLElement>('.ctool-main-tool')
    if (!el) {
        return window.innerHeight;
    }
    let styles = window.getComputedStyle(el);
    return Math.ceil(el.clientHeight - (parseFloat(styles['paddingTop']) + parseFloat(styles['paddingBottom'])));
}

export let mainToolHeight = getMainOperateHeight()
export const heightResizeDispatch = throttle(function () {
    event.dispatch('window_height_resize')
    componentResizeDispatch()
}, 500)

export const componentResizeDispatch = throttle(function () {
    event.dispatch('component_resize')
}, 500)

window.addEventListener("resize", () => {
    const temp = getMainOperateHeight();
    if (mainToolHeight !== temp) {
        mainToolHeight = temp
        heightResizeDispatch()
    }
    componentResizeDispatch()
});

export default event




