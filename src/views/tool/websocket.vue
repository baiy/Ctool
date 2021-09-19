<template>
    <Row :gutter="10">
        <Col span="10">
            <Row :gutter="6">
                <Col span="18">
                    <Input v-model="current.url">
                        <span slot="prepend">
                            <Badge style="margin-left:10px" :status="status ? 'success' : 'error'"/>
                        </span>
                    </Input>
                </Col>
                <Col span="6">
                    <Button long v-if="!status" type="success" @click="handle()">连接</Button>
                    <Button long v-else type="error" @click="handle()">断开</Button>
                </Col>
            </Row>
            <Input style="margin: 10px 0 5px" v-model="sendContent" :rows="14" type="textarea"
                   placeholder="发送内容"></Input>
            <Button type="primary" @click="send()" long>发送</Button>
        </Col>
        <Col span="14">
            <Card>
                <p slot="title">交互内容</p>
                <template slot="extra">
                    <Button style="margin-right: 5px" size="small" type="primary" @click="copyAll()">复制全部</Button>
                    <Button size="small" type="primary" @click="clear()">清空</Button>
                </template>

                <div class="lists-block" id="log" style="height: 300px;overflow: hidden;overflow-y:auto;">
                    <div v-for="(item,key) in lists" :key="key">
                        <div class="item" v-if="item.type === 'send'" style="color:green">
                            你 {{item.time}}
                        </div>
                        <div class="item" v-else-if="item.type === 'accept'" style="color:blue">
                            服务端 {{item.time}}
                        </div>
                        <div class="item" v-else>
                            {{item.time}}
                        </div>
                        <div class="item">
                            <Icon style="cursor: pointer" type="md-copy" @click="copy(item.content)"/>
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
</template>
<script>
    import moment from 'moment'

    export default {
        created() {
            this.current = Object.assign(this.current, this.$getToolData())
        },
        methods: {
            handle() {
                if (this.status) {
                    return this.close();
                }
                return this.connect();
            },
            connect() {
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
                this.ws.close();
            },
            clear() {
                this.lists = [];
            },
            log(content, type = "other") {
                this.lists.push({content, type,time:moment().format("YYYY-MM-DD HH:mm:ss")});
                this.$nextTick(() => {
                    let log = document.getElementById('log');
                    log.scrollTop = log.scrollHeight;
                })
            },
            copy(s) {
                this.$clipboardCopy(s);
            },
            copyAll() {
                this.copy(JSON.stringify(this.lists));
            },
            send() {
                try {
                    if (!this.status) {
                        return this.$Message.error("ws还没有连接，或者连接失败，请检测");
                    }
                    if (!this.sendContent) {
                        return this.$Message.error("发送内容不能为空");
                    }
                    this.ws.send(this.sendContent);
                    this.log(this.sendContent, 'send')
                } catch (e) {
                    this.log('错误异常: ' + e)
                }
            },
            onOpen() {
                this.status = true;
                this.log("连接成功")
            },
            onClose() {
                this.status = false;
                this.log("连接关闭")
            },
            onMessage(evt) {
                this.log(evt.data, 'accept')
            },
            onError(evt) {
                this.log('错误异常: ' + evt.data())
            }
        },
        data() {
            return {
                current: {
                    url: "wss://echo.websocket.org",
                },
                status: false,
                wx: null,
                sendContent: "",
                lists: [],
            }
        },
    }
</script>
<style scoped>
    .lists-block {
        font-size: 12px;
    }
</style>
