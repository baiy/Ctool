<template>
    <Align direction="vertical">
        <div v-row="`16-8-auto`" class="ctool-page-option">
            <Input v-model="action.current.input">
                <template #prepend>
                    <Align horizontal="center" vertical="center" :width="20">
                        <div class="ctool-websocket-status" :class="[`ctool-websocket-status-${state.status}`]"></div>
                    </Align>
                </template>
                <template #suffix>
                    <Bool :size="'small'" v-model="retry" :label="$t('websocket_reconnect')"/>
                </template>
            </Input>
            <Input v-model="action.current.protocols" :label="$t('websocket_protocols')">
                <template #suffix>
                    <HelpTip :text="$t('websocket_protocols_tip')"/>
                </template>
            </Input>
            <Button @click="connect()" :text="$t('websocket_connect')" v-if="state.status === 'close'"/>
            <Button @click="close()" :text="$t('websocket_close')" v-else/>
        </div>
        <HeightResize v-slot="{height}" ignore :reduce="5" :append="['.ctool-page-option']" v-row="`40-60`">
                <Textarea
                    :height="height"
                    v-model="state.send_content"
                    :float-text="$t('websocket_send')"
                    :float-position="'top-right'"
                    @clickFloatText="send"
                    :placeholder="`${$t(`main_ui_input`)}${$t('websocket_send_content')}`"
                />
            <Card :title="$t(`websocket_log_content`)" :height="height" class="ctool-websocket-logs">
                <template #extra>
                    <Align>
                        <Button :size="'small'" :type="'primary'" :text="$t(`main_ui_copy`)" @click="()=>$copy(JSON.stringify(state.logs))"/>
                        <Button :size="'small'" :type="'danger'" :text="$t(`main_ui_clear`)" @click="state.logs = []"/>
                        <Bool size="small" v-model="action.current.keepScroll" border :label="$t('websocket_keep_scroll')" @change="action.save()"/>
                    </Align>
                </template>
                <Align v-if="state.logs.length < 1" horizontal="center" vertical="center">
                    <Exception/>
                </Align>
                <Align v-else direction="vertical">
                    <div v-for="item in state.logs" class="ctool-websocket-logs-item">
                        <div class="ctool-websocket-logs-top">
                            <div class="ctool-websocket-logs-type" :class="`ctool-websocket-logs-type-${item.type}`">
                                <template v-if="item.type === 'send'">{{ $t('websocket_client') }}：</template>
                                <template v-else-if="item.type === 'accept'">{{ $t('websocket_server') }}：</template>
                                <template v-else>{{ $t('websocket_tips') }}：</template>
                            </div>
                            <div class="ctool-websocket-logs-time">{{ item.time }}</div>
                            <Icon :size="12" name="copy" :tooltip="$t(`main_ui_copy`)" hover @click="$copy(item.content)"/>
                        </div>
                        <pre class="ctool-websocket-logs-content"><code>{{ item.content }}</code></pre>
                    </div>
                </Align>
            </Card>
        </HeightResize>
    </Align>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import dayjs from "dayjs";
import {nextTick} from "vue";

const action = useAction(await initialize({
    input: "wss://echo.websocket.events",
    keepScroll: true,
    protocols: "",
}, {
    paste: (str) => /^ws/.test(str)
}))

let retry = $ref(false)
let retryTimes = 0
let reconnecting = false
let retryTimer: any = undefined

const state = $ref<{
    status: "close" | "open" | "connecting",
    ws: WebSocket | null,
    send_content: string,
    logs: { content: string, type: string, time: string }[]
}>({
    status: "close",
    ws: null,
    send_content: "",
    logs: []
})
const log = async (content, type = "other") => {
    state.logs.push({content, type, time: dayjs().format("HH:mm:ss")});
    await nextTick()

    if (action.current.keepScroll) {
        const container = document.querySelector('.ctool-websocket-logs .ctool-card-body');
        if (container) {
            container.scrollTop = container.scrollHeight
        }
    }
}
const connect = () => {
    if (!action.current.input.trim() || state.status !== "close") {
        return
    }
    state.status = "connecting"
    // ws://127.0.0.1:23451/
    action.save()
    log($t('websocket_connect_start', [action.current.input]))
    try {
        let websocket = new WebSocket(action.current.input, action.current.protocols !== '' ? action.current.protocols.split(',') : undefined);
        console.log(websocket)
        websocket.addEventListener('open', (event) => {
            console.log(event)
            state.status = "open";
            resetRetry()
            log($t('websocket_connect_ok'))
        })
        websocket.addEventListener('close', (event) => {
            console.log(event)
            state.status = "close";
            log($t('websocket_close_ok'))
            if (retry) {
                if (reconnecting) {
                    return;
                }
                reconnecting = true
                retryTimer = setInterval(() => {
                    if (state.status !== 'close') {
                        return;
                    }
                    retryTimes = retryTimes + 1
                    log(`${$t('websocket_reconnect')} ${retryTimes}`)
                    connect()
                }, 3000)
            }
        })
        websocket.addEventListener('message', (event) => {
            console.log(event)
            log(event.data, 'accept')
        })
        websocket.addEventListener('error', (event) => {
            console.log(event)
            log('Websocket Error')
        })
        state.ws = websocket;
    } catch (e) {
        console.log(e)
        log($error(e))
    }
}

const close = () => {
    retry = false
    resetRetry()
    log($t('websocket_close_start', [action.current.input]))
    state.ws?.close();
}

const resetRetry = () => {
    retryTimes = 0
    reconnecting = false
    clearInterval(retryTimer);
}

const send = () => {
    if (state.status !== 'open') {
        throw new Error($t('websocket_error_connect'))
    }
    if (state.send_content === "") {
        throw new Error($t('websocket_error_content'))
    }
    try {
        state.ws?.send(state.send_content);
        log(state.send_content, 'send')
    } catch (e) {
        log($error(e))
    }
}
</script>

<style scoped>
.ctool-websocket-status.ctool-websocket-status-close {
    background-color: var(--ctool-contrast);
}

.ctool-websocket-status.ctool-websocket-status-open {
    background-color: var(--ctool-primary);
}

.ctool-websocket-status.ctool-websocket-status-connecting {
    background-color: #ff9900;
}

.ctool-websocket-status {
    border-radius: 50%;
    height: 7px;
    width: 7px;
    display: inline-block
}

.ctool-websocket-logs-content {
    padding: 5px 10px;
    word-wrap: break-word;
    white-space: normal;
}

.ctool-websocket-logs-item {
    width: 100%;
}

.ctool-websocket-logs-top {
    display: flex;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
    line-height: 1.5rem;
}

.ctool-websocket-logs-time {
    display: inline-flex;
    font-size: .75rem;
    color: #8d9095;
}

.ctool-websocket-logs-type {
    display: inline-flex;
    font-size: .75rem;
    text-align: center;
}

.ctool-websocket-logs-type-accept {
    color: var(--ctool-primary);
}

.ctool-websocket-logs-type-send {
    color: var(--ctool-contrast);
}
</style>
