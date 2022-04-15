<template>
    <div>
        <Row :gutter="8" style="margin-bottom: 10px">
            <Col span="8" offset="3">
                <Input v-model="current.ip">
                        <span slot="prepend">
                            {{ $t('ipcalc_ip') }}
                        </span>
                </Input>
            </Col>
            <Col span="6">
                <Input v-model="current.mask">
                    <span slot="prepend">{{ $t('ipcalc_mask') }}</span>
                    <Button slot="append" icon="md-settings" @click="maskSet"/>
                </Input>
            </Col>
            <Col span="3">
                <Tooltip transfer placement="top" :content="$t('ipcalc_format')" :delay="300">
                    <Icon type="ios-help-circle-outline" size="22" style="margin-top: 4px;cursor: pointer" @click="show_input_format = true" />
                </Tooltip>

            </Col>
        </Row>
        <div v-if="error" style="margin-top: 50px;text-align: center">
            <Tag color="error"> {{ error }}</Tag>
        </div>
        <div class="tool-ipcalc" v-if="ipcalc && !error">
            <Card :title="$t('ipcalc_ip_info')">
                <span slot="extra">{{ current.ip }}</span>
                <CellGroup @on-click="(name)=>$copy(ip[name])">
                    <Row>
                        <Col span="7">
                            <Cell name="ip" :title="ip.ip" :label="$t('ipcalc_ip_info_ip10')"/>
                        </Col>
                        <Col span="7">
                            <Cell name="long" :title="ip.long" :label="$t('ipcalc_ip_info_long')"/>
                        </Col>
                        <Col span="10">
                            <Cell name="ip8" :title="ip.ip8" :label="$t('ipcalc_ip_info_ip8')"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="7">
                            <Cell name="ip16" :title="ip.ip16" :label="$t('ipcalc_ip_info_ip16')"/>
                        </Col>
                        <Col span="10">
                            <Cell name="ip2" :title="ip.ip2" :label="$t('ipcalc_ip_info_ip2')"/>
                        </Col>
                    </Row>
                </CellGroup>
            </Card>
            <Card :title="$t('ipcalc_mask_info')" style="margin: 5px 0">
                <span slot="extra">{{ current.mask }}</span>
                <CellGroup @on-click="(name)=>$copy(mask[name])">
                    <Row>
                        <Col span="6">
                            <Cell name="bit" :title="mask.bit" :label="$t('ipcalc_mask')"/>
                        </Col>
                        <Col span="6">
                            <Cell name="mask" :title="mask.mask" :label="$t('ipcalc_mask_info_mask')"/>
                        </Col>
                        <Col span="6">
                            <Cell name="long" :title="mask.long" :label="$t('ipcalc_mask_info_long')"/>
                        </Col>
                        <Col span="6">
                            <Cell name="opposite" :title="mask.opposite" :label="$t('ipcalc_mask_info_opposite')"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <Cell name="mask8" :title="mask.mask8" :label="$t('ipcalc_mask_info_mask8')"/>
                        </Col>
                        <Col span="6">
                            <Cell name="mask16" :title="mask.mask16" :label="$t('ipcalc_mask_info_mask16')"/>
                        </Col>
                        <Col span="12">
                            <Cell name="mask2" :title="mask.mask2" :label="$t('ipcalc_mask_info_mask2')"/>
                        </Col>
                    </Row>
                </CellGroup>
            </Card>
            <Card :title="$t('ipcalc_network_info')">
                <a href="#" slot="extra" @click.prevent="networkExport">{{ $t("ipcalc_network_export") }}</a>
                <CellGroup @on-click="(name)=>$copy(network[name])">
                    <Row>
                        <Col span="7">
                            <Cell name="available" :title="`${network.available}`"
                                  :label="$t('ipcalc_network_info_available')"/>
                        </Col>
                        <Col span="7">
                            <Cell name="size" :title="`${network.size}`" :label="$t('ipcalc_network_info_size')"/>
                        </Col>
                        <Col span="10">
                            <Cell name="base" :title="`${network.base}`" :label="$t('ipcalc_network_info_base')"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="7">
                            <Cell name="first" :title="`${network.first}`" :label="$t('ipcalc_network_info_first')"/>
                        </Col>
                        <Col span="7">
                            <Cell name="last" :title="`${network.last}`" :label="$t('ipcalc_network_info_last')"/>
                        </Col>
                        <Col span="10">
                            <Cell name="broadcast" :title="`${network.broadcast}`"
                                  :label="$t('ipcalc_network_info_broadcast')"/>
                        </Col>
                    </Row>
                </CellGroup>
            </Card>
        </div>
        <Modal
            v-model="show_input_format"
            :title="`${$t('ipcalc_format')}`"
            :width="780"
            footer-hide
        >
            <div class="tool-ipcalc">
                <Card :title="$t('ipcalc_ip')" style="margin-bottom: 10px">
                    <CellGroup>
                        <Row>
                            <Col span="6">
                                <Cell title="192.168.0.1" :label="$t('ipcalc_ip_info_ip10')"/>
                            </Col>
                            <Col span="6">
                                <Cell title="3232235521" :label="$t('ipcalc_ip_info_long')"/>
                            </Col>
                            <Col span="6">
                                <Cell title="0300.0250.0000.0001" :label="$t('ipcalc_ip_info_ip8')"/>
                            </Col>
                            <Col span="6">
                                <Cell title="0xC0.0xA8.0x00.0x01" :label="$t('ipcalc_ip_info_ip16')"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="15">
                                <Cell title="0b11000000.0b10101000.0b00000000.0b00000001" :label="$t('ipcalc_ip_info_ip2')"/>
                            </Col>
                        </Row>
                    </CellGroup>
                </Card>
                <Card :title="$t('ipcalc_mask')">
                    <CellGroup>
                        <Row>
                            <Col span="6">
                                <Cell title="24" :label="$t('ipcalc_mask')"/>
                            </Col>
                            <Col span="6">
                                <Cell title="255.255.255.0" :label="$t('ipcalc_mask_info_mask')"/>
                            </Col>
                            <Col span="6">
                                <Cell title="4294967040" :label="$t('ipcalc_mask_info_long')"/>
                            </Col>
                            <Col span="6">
                                <Cell title="0377.0377.0377.0000" :label="$t('ipcalc_mask_info_mask8')"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="6">
                                <Cell title="0xFF.0xFF.0xFF.0x00" :label="$t('ipcalc_mask_info_mask16')"/>
                            </Col>
                            <Col span="15">
                                <Cell title="0b11111111.0b11111111.0b11111111.0b00000000"
                                      :label="$t('ipcalc_mask_info_mask2')"/>
                            </Col>
                        </Row>
                    </CellGroup>
                </Card>
            </div>
        </Modal>
        <Modal
            v-model="export_show"
            :title="$t('ipcalc_network_export')"
            :width="260"
            footer-hide
        >
            <Input :rows="15" :value="export_data" type="textarea"></Input>
        </Modal>
    </div>
</template>

<script>
import ipcalc, {getMaskBitByAvailable} from "./library/ipcalc"
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
    computed: {
        ip() {
            const ipInfo = this.ipcalc.ipInfo()
            return {
                ip: ipInfo.ip,
                long: ipInfo.long,
                ip2: ipInfo.ip2,
                ip8: ipInfo.ip8,
                ip16: ipInfo.ip16,
            }
        },
        mask() {
            const maskInfo = this.ipcalc.maskInfo()
            return {
                bit: maskInfo.bit,
                long: maskInfo.long,
                mask: maskInfo.mask,
                mask2: maskInfo.mask2,
                mask8: maskInfo.mask8,
                mask16: maskInfo.mask16,
                opposite: maskInfo.opposite,
            }
        },
        network() {
            return {
                available: this.ipcalc.available(),
                size: this.ipcalc.size(),
                base: this.ipcalc.base(),
                first: this.ipcalc.first(),
                last: this.ipcalc.last(),
                broadcast: this.ipcalc.broadcast(),
            }
        }
    },
    watch: {
        current: {
            handler() {
                this.init()
            },
            deep: true
        }
    },
    methods: {
        init() {
            this.error = "";
            try {
                this.ipcalc = new ipcalc(this.current.ip, this.current.mask)
                this.$saveToolData(this.current)
            } catch (e) {
                this.error = e.message
            }
        },
        networkExport() {
            this.export_data = ""
            this.ipcalc.netmask.forEach((ip, long, index) => {
                this.export_data = `${this.export_data ? this.export_data+"\n" : ""}${index+1}: ${ip}`
            })
            this.export_show = true
        },
        maskSet() {
            let input = 254
            this.$Modal.confirm({
                title: this.$t('ipcalc_mask_set_title'),
                onOk: () => {
                    try {
                        this.current.mask = getMaskBitByAvailable(input)
                    } catch (e) {
                        this.$Message.error(e.message)
                    }
                },
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: input,
                            autofocus: true,
                        },
                        on: {
                            input: (val) => {
                                input = val
                            }
                        }
                    })
                }
            })
        }
    },
    data() {
        return {
            current: {
                ip: "192.168.0.1",
                mask: "24",
            },
            ipcalc: new ipcalc(),
            error: "",
            show_input_format: false,
            export_show:false,
            export_data:""
        }
    }
}
</script>
<style>
.tool-ipcalc .ivu-card-head {
    padding: 5px 10px;
}

.tool-ipcalc .ivu-card-body {
    padding: 0 0;
}

.tool-ipcalc .ivu-card-extra {
    top: 4px;
}

.tool-ipcalc .ivu-cell {
    padding: 7px 16px;
}

.tool-ipcalc .ivu-cell-title {
    line-height: 18px;
    font-size: 16px;
}
</style>
