<template>
    <div class="tool-armConverter">
        <Tabs v-model="current.operation">
            <TabPane label="ARM to HEX" name="arm_to_hex"/>
            <TabPane label="HEX to ARM" name="hex_to_arm"/>
            <Alert style="padding: 5px;margin-bottom:0" slot="extra">
                {{ $t('armConverter_info_source') }} <a href="https://armconverter.com/" target="_blank">https://armconverter.com/</a>
            </Alert>
        </Tabs>
        <Row :gutter="10">
            <Col span="10">
                <div class="page-option-input-block" style="margin-bottom: 5px">
                    <Input v-model="current.offset" placeholder="0 - for branch and LDR put hex value here">
                        <span slot="prepend">Offset (hex) 0x</span>
                    </Input>
                </div>
                <input-block top="5px">
                    <heightResize :reduce="45" :append="['.page-option-input-block']">
                        <autoHeightTextarea v-if="isArmToHex" v-model="current.asm_input" :placeholder="inputPlaceholder"/>
                        <autoHeightTextarea v-else v-model="current.hex_input" :placeholder="inputPlaceholder"/>
                    </heightResize>
                    <template slot="extra">
                        <Button :loading="loading" type="primary" size="small" @click="convert()">{{ $t('armConverter_convert') }}</Button>
                    </template>
                </input-block>
            </Col>
            <Col span="14">
                <Card dis-hover class="page-option-output-block">
                    <p slot="title">{{ $t('armConverter_output') }}</p>
                    <div slot="extra">
                        <Checkbox :disabled="!isArmToHex" v-model="current.prefix_0x">0x</Checkbox>
                        <Checkbox :disabled="!isArmToHex" v-model="current.swap_endian">GDB/LLDB</Checkbox>
                    </div>
                </Card>
                <heightResize :reduce="45" :append="['.page-option-output-block']" @resize="resize">
                    <input-block :text="'ARM64'+endianPlaceholder" @on-default-right-bottom-click="()=>$copy(outputArm64)">
                        <autoHeightTextarea :value="outputArm64" :height="outputHeight" :placeholder="'ARM64'+endianPlaceholder"/>
                    </input-block>
                    <input-block :text="'ARM'+endianPlaceholder" @on-default-right-bottom-click="()=>$copy(outputArm)">
                        <autoHeightTextarea style="margin-top: 5px" :value="outputArm" :height="outputHeight" :placeholder="'ARM'+endianPlaceholder"/>
                    </input-block>
                    <input-block :text="'ARM Big Endian'" @on-default-right-bottom-click="()=>$copy(outputArmBigEndian)" v-if="!isArmToHex">
                        <autoHeightTextarea style="margin-top: 5px" :value="outputArmBigEndian" :height="outputHeight" :placeholder="'ARM Big Endian'"/>
                    </input-block>
                    <input-block :text="'THUMB'+endianPlaceholder" @on-default-right-bottom-click="()=>$copy(outputThumb)">
                        <autoHeightTextarea style="margin-top: 5px" :value="outputThumb" :height="outputHeight" :placeholder="'THUMB'+endianPlaceholder"/>
                    </input-block>
                    <input-block :text="'THUMB Big Endian'" @on-default-right-bottom-click="()=>$copy(outputThumbBigEndian)" v-if="!isArmToHex">
                        <autoHeightTextarea style="margin-top: 5px" :value="outputThumbBigEndian" :height="outputHeight" :placeholder="'THUMB Big Endian'"/>
                    </input-block>
                </heightResize>
            </Col>
        </Row>
    </div>
</template>
<script>
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";
import axios from "axios";

export default {
    components: {
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData()
    },
    computed: {
        isArmToHex() {
            return this.current.operation === 'arm_to_hex';
        },
        endianPlaceholder() {
            return this.isArmToHex && this.current.swap_endian ? " Big Endian" : ""
        },
        inputPlaceholder() {
            if (this.isArmToHex) {
                return "Input Assembly code:\nNOP\nRET\nB #0x1018DE444\nMOV X0, #0x11FE00000000\nBEQ #0x10020C\nCBNZ R0, #0x682C4"
            }
            return "Input Hex code:\n40000494\nC0035FD6\nF0 B5 03 AF81b0"
        },
        outputArm64() {
            return this.convertResult('arm64')
        },
        outputArm() {
            return this.convertResult('arm')
        },
        outputThumb() {
            return this.convertResult('thumb')
        },
        outputArmBigEndian() {
            return this.convertResult('armbe')
        },
        outputThumbBigEndian() {
            return this.convertResult('thumbbe')
        },
        outputHeight() {
            return this.isArmToHex ? (this.pageOutputHeight - 10) / 3 : (this.pageOutputHeight - 20) / 5
        },
        response(){
            return this.isArmToHex ? this.current.asm_response : this.current.hex_response
        }
    },
    methods: {
        resize(height) {
            this.pageOutputHeight = height;
        },
        convert() {
            this.loading = true
            try {
                let data = {};
                if (this.isArmToHex) {
                    if (!this.current.asm_input){
                        throw new Error("input error")
                    }
                    data = {
                        "asm": this.current.asm_input,
                        "offset": this.current.offset,
                        "arch": ["arm64", "arm", "thumb"]
                    };
                    this.current.asm_response = ""
                } else {
                    if (!this.current.hex_input){
                        throw new Error("input error")
                    }
                    data = {
                        "hex": this.current.hex_input,
                        "offset": this.current.offset,
                        "arch": ["arm64", "arm", "armbe", "thumb", "thumbbe"]
                    };
                    this.current.hex_response = ""
                }
                this.request(data)
            } catch (error) {
                this.loading = false
                return this.$Message.error(
                    this.$t('armConverter_error', [error.message]).toString()
                )
            }

        },
        request(data) {
            axios({
                url: 'https://www.baiy.org/chrome_tool/armconverter/',
                method: 'post',
                data: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }).then(({data}) => {
                if (data.code !== 0) {
                    return this.$Message.error(
                        this.$t('armConverter_error', [data.info]).toString()
                    )
                }
                if (this.isArmToHex){
                    this.current.asm_response = data.data["hex"]
                }
                else{
                    this.current.hex_response = data.data["asm"]
                }
                this.$saveToolData(this.current);
            }).catch((error) => {
                return this.$Message.error(
                    this.$t('armConverter_error', [error.message]).toString()
                )
            }).then( ()=> {
                this.loading = false
            });
        },
        convertResult(field) {
            if (!this.response || !(field in this.response)) {
                return "";
            }
            let text = this.response[field][1]
            if (
                !this.isArmToHex
                || (!this.current.prefix_0x && !this.current.swap_endian)
            ) {
                return text;
            }
            const size = {
                arm64: 4,
                arm: 4,
                armbe: 4,
                thumb: 2,
                thumbbe: 2
            }
            // prefix_0x && swap_endian
            return text.split('\n').map((line) => {
                return this.swap(line, size[field], this.current.prefix_0x ? "0x" : "")
            }).join('\n');
        },
        swap(text, size, prefix) {
            if (!text || text.startsWith('#')) {
                // this is an error, not actual code
                return text;
            }
            if (!this.current.swap_endian) {
                return prefix + text;
            }
            const size_chars = size * 2;
            let result = '';
            for (let i = 0; i < text.length; i += size_chars) {
                const chunk = text.slice(i, i + size_chars);
                for (let j = chunk.length; j > 0; j -= 2) {
                    result += chunk.slice(j - 2, j);
                }
            }
            return prefix + result;
        }
    },
    data() {
        return {
            current: {
                operation: "arm_to_hex",
                asm_input: "",
                hex_input: "",
                offset: "",
                asm_response: "",
                hex_response: "",
                prefix_0x: false,
                swap_endian: false
            },
            loading:false,
            pageOutputHeight: 100
        }
    },
}


</script>
<style>
.tool-armConverter .ivu-tabs-bar {
    margin-bottom: 8px;
}

.tool-armConverter .ivu-card-head {
    line-height: 31px;
    height: 31px;
    padding: 0 16px;
}

.tool-armConverter .ivu-card-head p {
    line-height: 31px;
    height: 31px;
    font-weight: normal;
    color: #515a6e;
}

.tool-armConverter .ivu-card-extra {
    top: 3px;
}

.tool-armConverter .ivu-card-bordered {
    border-bottom: none;
}

.tool-armConverter .ivu-card-body {
    padding: 0;
}

.tool-armConverter .ivu-card {
    margin-bottom: 5px;
}
</style>
