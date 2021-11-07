<template>
    <div>
        <div style="height: 250px;line-height: 250px;text-align: center;vertical-align: middle;">
            <canvas @click="saveImage" :style="`border: ${canvasBorder};vertical-align: middle;`" ref="barcode"
                    class="barcode" v-show="!validStr"></canvas>
            <p style="color: red" v-show="validStr">{{ validStr }}</p>
        </div>
        <div id="barcode-setting">
            <Row :gutter="10">
                <Col span="12">
                    <Form :label-width="80">
                        <FormItem label="内容">
                            <Input v-model="current.text">
                                <Select v-model="current.format" slot="append" style="width: 100px">
                                    <Option v-for="type in barcodeFormat" :key="type" :value="type">{{ type }}</Option>
                                </Select>
                            </Input>
                        </FormItem>
                        <Row>
                            <Col span="12">
                                <FormItem label="背景">
                                    <ColorPicker recommend v-model="current.background"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="线条颜色">
                                    <ColorPicker recommend v-model="current.lineColor"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="条码宽">
                            <Row>
                                <Col span="21">
                                    <Slider v-model="current.width" :min="1" :max="4"></Slider>
                                </Col>
                                <Col span="3">
                                    <span style="float: right">{{ this.current.width }}</span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="条码高">
                            <Row>
                                <Col span="21">
                                    <Slider v-model="current.height" :min="10" :max="150"></Slider>
                                </Col>
                                <Col span="3">
                                    <span style="float: right">{{ this.current.height }}</span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="外边距">
                            <Row>
                                <Col span="21">
                                    <Slider v-model="current.margin" :min="0" :max="25"></Slider>
                                </Col>
                                <Col span="3">
                                    <span style="float: right">{{ this.current.margin }}</span>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Col>
                <Col span="12">
                    <Form :label-width="80">
                        <FormItem label="文本显示">
                            <RadioGroup v-model="current.textPosition" type="button">
                                <Radio label="close">
                                    <span>隐藏</span>
                                </Radio>
                                <Radio label="top">
                                    <span>上方</span>
                                </Radio>
                                <Radio label="bottom">
                                    <span>下方</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="水平位置">
                            <RadioGroup v-model="current.textAlign" type="button">
                                <Radio :disabled="!showText" label="left">
                                    <span>居左</span>
                                </Radio>
                                <Radio :disabled="!showText" label="center">
                                    <span>居中</span>
                                </Radio>
                                <Radio :disabled="!showText" label="right">
                                    <span>居右</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="字体">
                            <Row :gutter="10">
                                <Col span="12">
                                    <Select :disabled="!showText" v-model="current.font">
                                        <Option v-for="font in fontFamily" :key="font" :value="font">{{ font }}</Option>
                                    </Select>
                                </Col>
                                <Col span="12">
                                    <CheckboxGroup v-model="current.fontOptions">
                                        <Checkbox :disabled="!showText" label="bold">
                                            <span>粗体</span>
                                        </Checkbox>
                                        <Checkbox :disabled="!showText" label="italic">
                                            <span>斜体</span>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="大小">
                            <Row>
                                <Col span="22">
                                    <Slider :disabled="!showText" v-model="current.fontSize" :min="8"
                                            :max="36"></Slider>
                                </Col>
                                <Col span="2">
                                    <span style="float: right">{{ this.current.fontSize }}</span>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem label="外边距">
                            <Row>
                                <Col span="22">
                                    <Slider :disabled="!showText" v-model="current.textMargin" :min="-15"
                                            :max="40"></Slider>
                                </Col>
                                <Col span="2">
                                    <span style="float: right">{{ this.current.textMargin }}</span>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
/**
 * @author alvinkwok
 * @date 2021/10/30
 * 基于jsbarcode生成条形码，可以自定义条码各项属性
 * 不支持中文
 */
import JsBarcode from 'jsbarcode'

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("text"))
    },
    computed: {
        showText() {
            return ['top', 'bottom'].includes(this.current.textPosition)
        },
        canvasBorder() {
            if (this.current.background.toUpperCase() === "#FFFFFF") {
                return "1px dashed #666"
            }
            return "1px dashed #fff";
        }
    },
    mounted() {
        this.generate()
    },
    watch: {
        current: {
            handler() {
                this.generate()
            },
            deep: true
        }
    },
    methods: {
        generate() {
            // 处理字体样式
            let fontOptions = this.current.fontOptions.join(" ")
            const barcodeContent = this.current.text ? this.current.text : "Example 1234"
            JsBarcode(this.$refs.barcode, barcodeContent, {
                format: this.current.format,
                width: this.current.width,
                height: this.current.height,
                margin: this.current.margin,
                background: this.current.background,
                lineColor: this.current.lineColor,
                displayValue: this.showText,
                textPosition: this.current.textPosition,
                textAlign: this.current.textAlign,
                font: this.current.font,
                fontOptions: fontOptions,
                fontSize: this.current.fontSize,
                textMargin: this.current.textMargin,
                valid: (valid) => {
                    this.validStr = !valid ? `"${barcodeContent}" 无效的条码内容` : "";
                    if (!this.validStr && this.current.text) {
                        this.$saveToolData(this.current)
                    }
                }
            })
        },
        saveImage() {
            if (!this.validStr && this.current.text) {
                this.$clipboardCopyImages(this.$refs.barcode.toDataURL("image/png"), true)
            }
        }
    },
    data() {
        return {
            current: {
                text: "",
                format: "CODE128",
                width: 2,
                height: 50,
                margin: 10,
                background: "#FFFFFF",
                lineColor: "#000000",
                textAlign: "center",
                textPosition: "bottom",
                font: "monospace",
                fontOptions: [],
                fontSize: 20,
                textMargin: 0
            },
            validStr: '',
            // 条码格式
            barcodeFormat: [
                "CODE128",
                "CODE128A",
                "CODE128B",
                "CODE128C",
                "EAN13",
                "EAN8",
                "UPC",
                "CODE39",
                "ITF14",
                "ITF",
                "MSI",
                "MSI10",
                "MSI11",
                "MSI1010",
                "MSI1110",
                "pharmacode",
            ],
            fontFamily: [
                "monospace",
                "Sans-serif",
                "Serif",
                "Fantasy",
                "Cursive"
            ],
            barcodeBase64: "",
        }
    },
}
</script>

<style scoped>
/**iview原来的formitem太高了，在浏览器直接使用插件时会被撑开，因此需要压缩下高度**/
#barcode-setting .ivu-form-item {
    margin-bottom: 2px;
}
</style>
