<template>
    <Align direction="vertical">
        <HeightResize :append="['.ctool-barcode-option']" v-slot="{height}" :reduce="5">
            <Card :height="height">
                <div style="display: flex;height: 100%;justify-content: center;align-items: center">
                    <canvas @click="copy" :style="`border: 1px dashed #666;vertical-align: middle;`" ref="container" v-show="valid" style="cursor:pointer"/>
                    <Exception v-if="!valid" :content="$t(`barcode_generate_fail`)"/>
                </div>
            </Card>
        </HeightResize>
        <Card class="ctool-barcode-option">
            <Align horizontal="center">
                <Input v-model="action.current.input" :width="260" :placeholder="$t(`main_ui_input`)">
                    <template #append>
                        <Select v-model="action.current.format" :options="barcodeFormat"/>
                    </template>
                </Input>
                <Color v-model="action.current.background" :label="$t('barcode_background')"/>
                <Color v-model="action.current.line_color" :label="$t('barcode_line_color')"/>
                <InputNumber :width="100" v-model="action.current.width" :min="1" :max="4" :label="$t('barcode_bar_width')"/>
                <InputNumber :width="100" v-model="action.current.height" :min="10" :max="150" :label="$t('barcode_height')"/>
                <InputNumber :width="100" v-model="action.current.margin" :max="25" :label="$t('barcode_margin')"/>
                <Select
                    :label="$t('barcode_text')"
                    v-model="action.current.text_position"
                    :options="['close','top','bottom'].map((item)=>{return {label:$t(`barcode_${item}`),value:item}})"
                />
                <InputNumber :width="100" :disabled="!showText" v-model="action.current.text_margin" :min="-15" :max="40" :label="$t('barcode_margin')"/>
                <Select
                    :label="$t('barcode_text_align')"
                    :disabled="!showText"
                    v-model="action.current.text_align"
                    :options="['left','center','right'].map((item)=>{return {label:$t(`barcode_${item}`),value:item}})"
                />
                <Select :disabled="!showText" v-model="action.current.font" :options="fontFamily" :label="$t('barcode_font')"/>
                <InputNumber :width="100" :disabled="!showText" v-model="action.current.font_size" :min="8" :max="36" :label="$t('barcode_font_size')"/>
                <Bool border :disabled="!showText" v-model="action.current.font_bold" :label="$t('barcode_bold')"/>
                <Bool border :disabled="!showText" v-model="action.current.font_italic" :label="$t('barcode_italic')"/>
            </Align>
        </Card>
    </Align>
</template>

<script lang="ts" setup>
/**
 * @author alvinkwok
 * @date 2021/10/30
 * 基于jsbarcode生成条形码，可以自定义条码各项属性
 * 不支持中文
 */
import JsBarcode from 'jsbarcode'
import {initialize, useAction} from "@/store/action";
import {watch} from "vue";

const action = useAction(await initialize({
    input: "",
    format: "CODE128",
    width: 2,
    height: 50,
    margin: 10,
    background: "#FFFFFF",
    line_color: "#000000",
    text_align: "center",
    text_position: "bottom",
    font: "monospace",
    font_bold: false,
    font_italic: false,
    font_size: 20,
    text_margin: 0
}, {
    paste: (str) => {
        if (str.length > 30) {
            return false
        }
        for (let c of str.split("")) {
            if (c.charCodeAt(0) < 0 || c.charCodeAt(0) > 127) {
                return false
            }
        }
        return true
    }
}))

const showText = $computed(() => {
    return ['top', 'bottom'].includes(action.current.text_position)
})

let valid = $ref(false)
let container = $ref<HTMLCanvasElement | null>(null);

watch(() => {
    return {
        option: action.current,
        container: container
    }
}, ({option, container}) => {
    if (!container) {
        return;
    }
    const barcodeContent = option.input !== "" ? option.input : "Example 1234"
    JsBarcode(container, barcodeContent, {
        format: option.format,
        width: option.width,
        height: option.height,
        margin: option.margin,
        background: option.background,
        lineColor: option.line_color,
        displayValue: showText,
        textPosition: option.text_position,
        textAlign: option.text_align,
        font: option.font,
        fontOptions: [option.font_bold && "bold", option.font_italic && "italic"].filter(item => item !== false).join(" "),
        fontSize: option.font_size,
        textMargin: option.text_margin,
        valid: (result) => {
            valid = result
            if (option.input !== "") {
                action.save()
            }
        }
    })
}, {immediate: true, deep: true})

const copy = () => {
    container && action.success({copy_image: container.toDataURL("image/png"), is_save: false})
}

const barcodeFormat = [
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
]
const fontFamily = [
    "monospace",
    "Sans-serif",
    "Serif",
    "Fantasy",
    "Cursive"
];
</script>
