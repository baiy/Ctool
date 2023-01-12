<template>
    <Display position="bottom-right" :style="style">
        <Textarea :model-value="error" v-if="error !== ''"/>
        <template v-else>
            <Textarea :model-value="result" :placeholder="placeholder" v-if="['text', 'base64', 'hex', 'hex_dump'].includes(current.type)"/>
            <Card v-else height="100%">
                <Align direction="vertical" horizontal="center" vertical="center">
                    <img
                        v-if="current.type === 'image'"
                        @click="$copy(result)"
                        :src="result"
                        style="cursor:pointer;border: 1px dashed #666;max-width: 80%;max-height: 80%;"
                    />
                    <template v-if="['image','down'].includes(current.type)">
                        <span style="font-size: .75rem;color: var(--ctool-placeholder-text-color);">{{ content.name() }}</span>
                        <Button size="small" type="primary" @click="down">{{ $t(`main_ui_down`) }}</Button>
                    </template>
                </Align>
            </Card>
        </template>
        <template #extra>
            <Align>
                <template v-if="current.type === 'base64'">
                    <Bool size="small" v-model="current.option.base64.is_url_safe" border :label="$t(`component_content_output_url_safe`)"
                          :disabled="current.option.base64.data_url_show"/>
                    <Bool size="small" v-model="current.option.base64.data_url_show" border :label="$t(`component_content_output_data_url`)"/>
                </template>
                <template v-if="current.type === 'text'">
                    <Select
                        v-if="encoding && current.type === 'text'"
                        size="small"
                        :options="[
                            {
                                label:`${$t('component_content_output_analyse_encoding')}: ${analyseEncoding}`,
                                value:`analyse`
                            },
                            ...encodings
                            ]"
                        v-model="current.option.text.encoding"
                    />
                </template>
                <template v-if="current.type === 'hex'">
                    <template v-if="current.option.hex.type === 'dump'">
                        <Select
                            :label="$t(`component_content_output_hex_dump_format`)"
                            size="small"
                            v-model="current.option.hex.format" :options="hexFormat"
                        />
                        <InputNumber
                            size="small"
                            v-model="current.option.hex.width"
                            :max="60"
                            :min="1"
                            :width="90"
                            :label="$t(`component_content_output_hex_dump_width`)"
                        />
                    </template>
                    <Select
                        :label="$t(`component_content_output_hex_caps`)"
                        size="small"
                        v-model="current.option.hex.caps" :options="hexCaps"
                    />
                    <Select
                        :label="$t(`component_content_output_hex_type`)"
                        size="small"
                        v-model="current.option.hex.type" :options="hexType"
                    />
                </template>
                <Select
                    size="small"
                    v-model="current.type"
                    v-if="typeLists.length > 1"
                    :options="typeLists.map((item)=>{return {value:item,label:$t(`component_content_type_${item}`)}})"
                />
            </Align>
        </template>
    </Display>
</template>

<script setup lang="ts">
import {TextOutput, createTextOutput} from "./index"
import {nextTick, PropType, StyleValue, watch} from "vue"
import Text, {encodings, Encoding} from "@/helper/text"
import {textOutputEncoderLists, TextOutputEncoderType} from "@/types"
import {sizeConvert} from "@/components/util";

const props = defineProps({
    modelValue: {
        type: Object as PropType<TextOutput>,
        default: () => createTextOutput()
    },
    height: {
        type: [String,Number],
        default: ""
    },
    placeholder: {
        type: String,
        default: () => {
            return $t("main_ui_output")
        }
    },
    allow: {
        type: Array as PropType<TextOutputEncoderType[]>,
        default: () => textOutputEncoderLists
    },
    content: {
        type: Object as PropType<Text>,
        default: () => Text.empty()
    },
    encoding: {
        type: Boolean,
        default: false
    }

})
const emit = defineEmits<{ (e: 'update:modelValue', modelValue: TextOutput): void, (e: 'success'): void }>()


let exception = $ref("")

const current: TextOutput = $computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


const typeLists = $computed(() => {
    return textOutputEncoderLists.filter((item) => props.allow.includes(item));
})

const success = () => emit("success")
const down = () => {
    exception = ""
    try {
        const content: Text = props.content
        content.toDown()
        success()
    } catch (e) {
        exception = $error(e)
    }
}

const error = $computed(() => {
    if (props.content.isEmpty()) {
        return ""
    }
    if (props.content.isError()) {
        return `${props.content.toString()}`
    }
    if (exception !== "") {
        return `${exception}`
    }
    return ""
})

let result = $ref("")

let analyseEncoding = $ref<Encoding>("utf-8")

watch(() => {
    return {
        data: props.content,
        type: current.type,
        option: current.option,
        isEncoding: props.encoding,
    }
}, async ({data, type, option, isEncoding}) => {
    await nextTick()
    exception = ""
    if (data.isError() || data.isEmpty()) {
        result = ""
        return
    }
    try {
        let r: string = "";
        switch (type) {
            case "text":
                analyseEncoding = data.analyseEncoding()
                if (!isEncoding) {
                    r = data.toString()
                } else {
                    r = data.toString(option.text.encoding === "analyse" ? analyseEncoding : option.text.encoding)
                }
                break;
            case "base64":
                r = data.toBase64(
                    option.base64.is_url_safe,
                    option.base64.data_url_show
                )
                break;
            case "hex":
                r = data.toHex(option.hex)
                break;
            case "image":
                if(!data.isImage()){
                    throw new Error("Not Image File")
                }
                r = data.toDataUrl()
                break;
        }
        if (r !== "") {
            success()
            result = r
        }
    } catch (e) {
        exception = $error(e)
    }
}, {immediate: true, deep: true})

const style = $computed(() => {
    let css: StyleValue = {}
    if (props.height) {
        css.height = sizeConvert(props.height)
    }
    return css
})

const hexType = [
    {value: 'hex', label: $t(`component_content_output_hex_hex`)},
    {value: 'dump', label: $t(`component_content_output_hex_dump`)}
]

const hexCaps = [
    {value: 'lower', label: $t(`component_content_output_hex_lower`)},
    {value: 'upper', label: $t(`component_content_output_hex_upper`)}
]

const hexFormat = [
    {value: 'twos', label: $t(`component_content_output_hex_dump_format_twos`)},
    {value: 'fours', label: $t(`component_content_output_hex_dump_format_fours`)},
    {value: 'eights', label: $t(`component_content_output_hex_dump_format_eights`)},
    {value: 'sixteens', label: $t(`component_content_output_hex_dump_format_sixteens`)},
    {value: 'none', label: $t(`component_content_output_hex_dump_format_none`)}
]
</script>
