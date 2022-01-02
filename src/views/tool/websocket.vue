<template>
    <div>
        <Input v-model="current.url" class="page-option-block" style="margin-bottom: 10px">
                        <span slot="prepend">
                            <Badge style="margin-left:10px" :status="status ? 'success' : 'error'"/>
                        </span>
            <Button slot="append" v-if="!status" @click="handle()">{{ $t('websocket_connect') }}</Button>
            <Button slot="append" v-else @click="handle()">{{ $t('websocket_close') }}</Button>
        </Input>
        <Row :gutter="10">
            <Col span="10">
                <input-block top="7px" right="7px">
                    <heightResize :append="['.page-option-block']">
                        <autoHeightTextarea v-model="sendContent" :placeholder="$t('websocket_send_content')"/>
                    </heightResize>
                    <template slot="extra">
                        <Button :disabled="!status" type="primary" size="small" @click="send">{{
                                $t('websocket_send')
                            }}
                        </Button>
                    </template>
                </input-block>
            </Col>
            <Col span="14">
                <input-block top="7px" right="7px" :text="$t('websocket_send')" @on-default-right-bottom-click="send">
                    <heightResize :append="['.page-option-block']" @resize="logHeightSet">
                        <Card>
                            <div class="lists-block" id="log"
                                 :style="`height: ${logHeight}px;overflow: hidden;overflow-y:auto;`">
                                <div v-if="lists.length === 0" style="font-size: 14px;color: #999999">
                                    {{ $t('websocket_log_content') }}
                                </div>
                                <div v-else v-for="(item,key) in lists" :key="key">
                                    <div class="item" v-if="item.type === 'send'" style="color:green">
                                        {{ $t('websocket_you') }} {{ item.time }}
                                    </div>
                                    <div class="item" v-else-if="item.type === 'accept'" style="color:blue">
                                        {{ $t('websocket_server') }} {{ item.time }}
                                    </div>
                                    <div class="item" v-else>
                                        {{ item.time }}
                                    </div>
                                    <div class="item">
                                        <Icon style="cursor: pointer" type="md-copy" @click="$copy(item.content)"/>
                                        {{ item.content }}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </heightResize>
                    <template slot="extra">
                        <Button style="margin-right: 5px" size="small" type="primary" @click="copyAll()">
                            {{ $t('websocket_copy') }}
                        </Button>
                        <Button size="small" type="primary" @click="clear()">{{ $t('websocket_clear') }}</Button>
                    </template>
                </input-block>
            </Col>
        </Row>
    </div>
</template>
<script>
import moment from 'moment'
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData()
    },
    methods: {
        handle() {
            if (this.status) {
                return this.close();
            }
            return this.connect();
        },
        connect() {
            if (!this.current.url.trim()) {
                return
            }
            this.$saveToolData(this.current);
            this.log(this.$t('websocket_connect_start', [this.current.url]).toString())
            let websocket = new WebSocket(this.current.url);
            websocket.onopen = (evt) => {
                this.onOpen(evt)
            };
            websocket.onclose = (evt) => {
                this.onClose(evt)
            };
            websocket.onmessage = (evt) => {
                this.onMessage(evt)
            };
            websocket.onerror = (evt) => {
                this.onError(evt)
            };
            this.ws = websocket;
        },
        close() {
            this.log(this.$t('websocket_close_start', [this.current.url]).toString())
            this.ws.close();
        },
        clear() {
            this.lists = [];
        },
        log(content, type = "other") {
            this.lists.push({content, type, time: moment().format("YYYY-MM-DD HH:mm:ss")});
            this.$nextTick(() => {
                let log = document.getElementById('log');
                log.scrollTop = log.scrollHeight;
            })
        },
        copyAll() {
            this.$copy(JSON.stringify(this.lists));
        },
        send() {
            try {
                if (!this.status) {
                    throw new Error(this.$t('websocket_error_connect').toString())
                }
                if (!this.sendContent) {
                    throw new Error(this.$t('websocket_error_content').toString())
                }
                this.ws.send(this.sendContent);
                this.log(this.sendContent, 'send')
            } catch (e) {
                this.log(this.$t('websocket_error', [e.message]).toString())
            }
        },
        onOpen() {
            this.status = true;
            this.log(this.$t('websocket_connect_ok').toString())
        },
        onClose() {
            this.status = false;
            this.log(this.$t('websocket_close_ok').toString())
        },
        onMessage(evt) {
            this.log(evt.data, 'accept')
        },
        onError(evt) {
            this.log(this.$t('websocket_error', [evt.data()]).toString())
        },
        logHeightSet(height) {
            this.logHeight = Math.max(height - 34, 100)
        }
    },
    data() {
        return {
            current: {
                url: "wss://echo.websocket.events",
            },
            status: false,
            wx: null,
            sendContent: "",
            lists: [],
            logHeight: 100,
        }
    },
}
</script>
<style scoped>
.lists-block {
    font-size: 14px;
    line-height: 28px;
}
</style>
