<template>
    <Align direction="vertical">
        <Input v-model="action.current.url" class="ctool-page-option">
            <template #prepend>
                <Align horizontal="center" vertical="center" :width="20">
                    <div
                        :style="{backgroundColor:state.status ? '#19be6b' : '#ed4014'}"
                        style="border-radius: 50%;height: 7px;width: 7px;display: inline-block"
                    ></div>
                </Align>
            </template>
            <template #append>
                <Button @click="connect()" :text="$t('websocket_connect')" v-if="!state.status"/>
                <Button @click="close()" :text="$t('websocket_close')" v-else/>
            </template>
        </Input>
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
                        <Bool size="small" v-model="action.current.keepScroll" border :label="$t(`tool_keepScroll`)" @change="action.save()"/>
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
    url: "wss://echo.websocket.events",
    keepScroll: true
}, {
    paste: (str) => /^ws/.test(str)
}))

const state = $ref<{
    status: boolean,
    ws: WebSocket | null,
    send_content: string,
    logs: { content: string, type: string, time: string }[]
}>({
    status: false,
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
    if (!action.current.url.trim()) {
        return
    }
    // ws://127.0.0.1:23451/
    action.save()
    log($t('websocket_connect_start', [action.current.url]))
    let websocket = new WebSocket(action.current.url);
    websocket.onopen = () => {
        state.status = true;
        log($t('websocket_connect_ok'))
    };
    websocket.onclose = () => {
        state.status = false;
        log($t('websocket_close_ok'))
    };
    websocket.onmessage = (evt) => {
        log(evt.data, 'accept')
    };
    websocket.onerror = (evt) => {
        log($t('websocket_error', [evt]))
    };
    state.ws = websocket;
}

const close = () => {
    if (!state.status) {
        return;
    }
    log($t('websocket_close_start', [action.current.url]))
    state.ws?.close();
}

const send = () => {
    if (!state.status) {
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
