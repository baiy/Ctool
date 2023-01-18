import {MessageType, MessageOption, MessageMethod} from '@/types'
import {h, render, VNode} from 'vue'
import {sum} from 'lodash'
import Message from '@/components/Message.vue'

const containers = new Map<HTMLElement, {
    vNode: VNode,
    attr: {
        type: MessageType,
        info: string,
        offset: number,
        duration: number,
    }
}>();

const closeAll = () => {
    for (let instance of containers.keys()) {
        destroy(instance)
    }
}

const destroy = (container: HTMLElement) => {
    if (!containers.has(container)) {
        return;
    }
    // 关闭
    (containers.get(container)?.vNode as VNode).component?.exposed?.exposeClose();
    // 等待关闭动画完成
    setTimeout(() => {
        // 销毁
        render(null, container);
        // 移除dom
        container.remove()
        containers.delete(container)
    }, 300)
}

const open = (type: MessageType, info: string, {offset = 16, duration = 3000}: MessageOption = {}) => {
    const container = document.createElement("div") as HTMLElement
    document.querySelector('#ctool-append')?.appendChild(container)

    const instance = h(
        Message,
        {
            type,
            info,
            offset: sum([...[...containers].map((item) => {
                return item[1].attr.offset + (item[0].querySelector(".ctool-message")?.clientHeight || 0)
            }), offset]),
            duration,
            close: () => {
                destroy(container)
            }
        }
    );

    // 渲染
    render(instance, container);
    // 打开
    instance.component?.exposed?.open();
    // 保存列表
    containers.set(container, {
        vNode: instance,
        attr: {
            type,
            info,
            offset,
            duration
        },
    })
    // 延迟关闭
    if (duration > 0) {
        setTimeout(() => {
            destroy(container)
        }, duration)
    }
}

const method: MessageMethod = {
    closeAll,
    success(info: string, options?: MessageOption) {
        open('success', info, options)
    },
    error(info: string, options?: MessageOption) {
        open('error', info, options)
    },
    info(info: string, options?: MessageOption) {
        open('info', info, options)
    }
}


export default method
