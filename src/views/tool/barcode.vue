<template>
  <div>
    <Row>
      <Col span="12">
        <Card>
          <Form :label-width="100">
            <FormItem label="条码内容">
              <Input v-model="current.text">
                <Select v-model="current.format" slot="append" style="width: 100px">
                  <Option v-for="type in barcodeFormat" :key="type" :value="type">{{ type }}</Option>
                </Select>
              </Input>
            </FormItem>
            <FormItem label="条码宽" class="line-item">
              <Row>
                <Col span="22">
                  <Slider v-model="current.width" :min="0" :max="4"></Slider>
                </Col>
                <Col span="2">
                  <span style="float: right">{{ this.current.width }}</span>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="条码高" class="line-item">
              <Row>
                <Col span="22">
                  <Slider v-model="current.height" :min="10" :max="150"></Slider>
                </Col>
                <Col span="2">
                  <span style="float: right">{{ this.current.height }}</span>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="条码外边距" class="line-item">
              <Row>
                <Col span="22">
                  <Slider v-model="current.margin" :min="0" :max="25"></Slider>
                </Col>
                <Col span="2">
                  <span style="float: right">{{ this.current.margin }}</span>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="背景" class="line-item">
              <Input type="text" id="backgroundInput" v-model="current.background.hex"
                     @on-focus="openBackgroundPicker($event)"></Input>
              <chrome-picker v-show="showBackgroundPicker" id="backgroundPicker" style="position: fixed;z-index: 1000"
                             v-model="current.background"
                             @input="updateBackground"/>
            </FormItem>
            <FormItem label="线条颜色" class="line-item">
              <Input type="text" id="lineColorInput" v-model="current.lineColor.hex"
                     @on-focus="openLineColorPicker"></Input>
              <chrome-picker v-show="showLineColoePicker" id="lineColorPicker" style="position: fixed;z-index: 1000"
                             v-model="current.lineColor"
                             @input="updateLineColor"/>
            </FormItem>
            <FormItem label="显示文本" class="line-item">
              <RadioGroup v-model="current.showText" type="button">
                <Radio label="true">
                  <span>显示</span>
                </Radio>
                <Radio label="false">
                  <span>隐藏</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <div v-if="this.current.showText === 'true'">
              <FormItem label="字体位置" class="line-item">
                <RadioGroup v-model="current.textAlign" type="button">
                  <Radio label="left">
                    <span>居左</span>
                  </Radio>
                  <Radio label="center">
                    <span>居中</span>
                  </Radio>
                  <Radio label="right">
                    <span>居右</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="字体" class="line-item">
                <Select v-model="current.font">
                  <Option v-for="font in fontFamily" :key="font" :value="font">{{ font }}</Option>
                </Select>
              </FormItem>
              <FormItem label="字体样式" class="line-item">
                <CheckboxGroup v-model="current.fontOptions">
                  <Checkbox label="bold">
                    <span>粗体</span>
                  </Checkbox>
                  <Checkbox label="italic">
                    <span>斜体</span>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem label="字体大小" class="line-item">
                <Row>
                  <Col span="22">
                    <Slider v-model="current.fontSize" :min="8" :max="36"></Slider>
                  </Col>
                  <Col span="2">
                    <span style="float: right">{{ this.current.fontSize }}</span>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="字体外边距" class="line-item">
                <Row>
                  <Col span="22">
                    <Slider v-model="current.textMargin" :min="-15" :max="40"></Slider>
                  </Col>
                  <Col span="2">
                    <span style="float: right">{{ this.current.textMargin }}</span>
                  </Col>
                </Row>
              </FormItem>
            </div>
          </Form>
        </Card>
      </Col>
      <Col span="12">
        <Card>
          <div>
            <canvas id="barcode"></canvas>
            <p style="color: red">{{ validStr }}</p>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
/**
 * @author alvinkwok
 * @date 2021/10/30
 * 基于jsbarcode生成条形码，可以自定义条码各项属性
 * 不支持中文
 * 颜色选择器采用vue-color
 */
import JsBarcode from 'jsbarcode'
import {Chrome} from 'vue-color'

export default {
  created() {
    this.current = Object.assign(this.current, this.$getToolData("content"))
  },
  components: {
    'chrome-picker': Chrome,
  },
  mounted() {
    // 加载颜色选择器消失的事件
    this.loadEvent()
    // 生成默认的条形码
    this.generate()
  },
  beforeDestroy() {
    // 移除挂载时添加的事件
    document.removeEventListener('click', () => {
    }, true)
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
    /**
     * 检查
     * @param event
     * @param id
     * @returns {boolean}
     */
    checkNodeContainsId(event, id) {
      // 检查目标元素及目标元素上层是否存在指定id元素
      let et = event.target
      while (et && et.id !== undefined) {
        // 检查当前元素上是否存在指定
        if (et.id === id) {
          return true
        }
        et = et.parentNode
      }
    },
    loadEvent() {
      let _this = this
      document.addEventListener('click', (e) => {
        // 如果点击的区域不是输入框或者是背景色选择器则将背景选择器隐藏
        if (!_this.checkNodeContainsId(e, 'backgroundInput') && !_this.checkNodeContainsId(e, 'backgroundPicker')) {
          _this.showBackgroundPicker = false
        }
        // 同理
        if (!_this.checkNodeContainsId(e, 'lineColorInput') && !_this.checkNodeContainsId(e, 'lineColorPicker')) {
          _this.showLineColoePicker = false
        }
      })
    },
    openBackgroundPicker() {
      this.showBackgroundPicker = true
      this.showLineColoePicker = false
    },
    updateBackground(val) {
      this.current.background = val
    },
    openLineColorPicker() {
      this.showLineColoePicker = true
      this.showBackgroundPicker = false
    },
    updateLineColor(val) {
      this.current.lineColor = val
    },
    closeColorPicker() {
      this.showLineColoePicker = false
      this.showBackgroundPicker = false
    },

    generate() {
      let _this = this;
      // 处理字体样式
      let fontOptions = this.current.fontOptions.join(" ")
      JsBarcode("#barcode", this.current.text, {
        format: this.current.format,//选择要使用的条形码类型
        width: this.current.width,
        height: this.current.height,
        margin: this.current.margin,
        background: this.current.background.hex,
        lineColor: this.current.lineColor.hex,
        displayValue: this.current.showText,//是否在条形码下方显示文字
        textPosition: "bottom",//设置文本的垂直位置
        textAlign: this.current.textAlign,
        font: this.current.font,
        fontOptions: fontOptions,
        fontSize: this.current.fontSize,
        textMargin: this.current.textMargin,
        valid: function (valid) {
          // 显示条码内容无效
          if (!valid) {
            _this.validStr = "无效的条码内容"
          } else {
            _this.validStr = ""
          }
        }
      })
    },
  },
  data() {
    return {
      current: {
        text: "Test 123456789",
        format: "CODE128",
        width: 2,
        height: 50,
        margin: 10,
        background: {
          hex: '#FFFFFF',
        },
        lineColor: {
          hex: '#000000',
        },
        showText: "true",
        textAlign: "center",
        font: "monospace",
        fontOptions: [],
        fontSize: 20,
        textMargin: 0
      },
      validStr: '',
      // 背景色选择器控制开关
      showBackgroundPicker: false,
      // 线条颜色选择器控制开关
      showLineColoePicker: false,
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
      ]

    }
  },
}
</script>

<style scoped>
/**iview原来的formitem太高了，在浏览器直接使用插件时会被撑开，因此需要压缩下高度**/
.line-item {
  margin-top: -20px;
}
</style>