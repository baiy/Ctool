<template>
    <Display position="top-right" toggle>
        <Display position="bottom-right" :style="style" toggle>
            <Textarea v-if="['http_query_string','csv'].includes(current.type)" v-model="current.value"
                      :placeholder="getPlaceholder"/>
            <Editor v-else disable-line-numbers v-model="current.value" :lang="current.type" height="100%" :placeholder="getPlaceholder"/>
            <template #extra>
                <template v-if="current.type === 'csv'">
                    <Align>
                        <Select
                            size="small"
                            v-if="csvKeyedKey.length > 0"
                            v-model="current.option.csv.keyed_key"
                            :options="csvKeyedKey.map((label,value)=>{return {value,label};})"
                        />
                        <Select
                            size="small"
                            v-model="current.option.csv.type"
                            :options="csvTableKeyedType.map((item)=>{
                                return {value:item,label:$t(`component_serialize_csv_table_${item}`)}
                            })"
                        />
                    </Align>
                </template>
                <template v-if="current.type === 'html_table'">
                    <Align>
                        <Select
                            size="small"
                            v-if="tableKeyedKey.length > 0"
                            v-model="current.option.html_table.keyed_key"
                            :options="tableKeyedKey.map((label,value)=>{return {value,label};})"
                        />
                        <Select
                            size="small"
                            v-model="current.option.html_table.type"
                            :options="csvTableKeyedType.map((item)=>{
                                return {value:item,label:$t(`component_serialize_csv_table_${item}`)}
                            })"
                        />
                    </Align>
                </template>
                <template v-if="current.type === 'properties'">
                    <Bool size="small" v-model="current.option.properties.convertToJsonTree" border :label="$t(`component_serialize_properties_convert_to_json_tree`)"/>
                </template>
                <template v-if="current.type === 'xml'">
                    <Input size="small" v-model="current.option.xml.attribute_prefix" :label="$t(`component_serialize_xml_attribute_prefix`)"/>
                </template>
            </template>
        </Display>
        <template #extra>
            <Select
                size="small"
                :model-value="current.type"
                @change="(value)=>{current.type = value;current.value = ``;current.serialization = Serialize.empty()}"
                v-if="typeLists.length > 1"
                :options="typeLists.map((item)=>{
                    return {
                        value:item,
                        label:getDisplayName(item)
                    }
                })"
            />
        </template>
    </Display>
</template>

<script setup lang="ts">
import {SerializeInput, createSerializeInput} from "./index"
import {csvTableKeyedType} from "./input"
import {serializeInputEncoderLists, SerializeInputEncoderType} from "@/types"
import {nextTick, PropType, StyleValue, toRaw, watch} from "vue"
import Serialize from "@/helper/serialize"
import {debounce} from "lodash";
import {sizeConvert} from "@/components/util";
import {getDisplayName} from "@/helper/code";

const props = defineProps({
    modelValue: {
        type: Object as PropType<SerializeInput>,
        default: () => createSerializeInput()
    },
    height: {
        type: [String, Number],
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    },
    allow: {
        type: Array as PropType<SerializeInputEncoderType[]>,
        default: () => serializeInputEncoderLists
    }
})

const typeLists = $computed(() => {
    return serializeInputEncoderLists.filter((item) => {
        return props.allow.includes(item)
    });
})

const emit = defineEmits<{ (e: 'update:modelValue', modelValue: SerializeInput): void }>()

let current = $ref(toRaw(props.modelValue))

const getPlaceholder = $computed(() => {
    if (props.placeholder !== "") {
        return props.placeholder
    }
    return `${$t('main_ui_input')} ${getDisplayName(current.type)}`
})


const csvKeyedKey = $computed(() => {
    if (current.type !== "csv" || current.option.csv.type !== "keyed") {
        return [];
    }
    if (current.serialization.isError() || current.serialization.isEmpty()) {
        return [];
    }
    // @ts-ignore
    return Object.keys(current.serialization.content()[0] || {}) || []
})

const tableKeyedKey = $computed(() => {
    if (current.type !== "html_table" || current.option.html_table.type !== "keyed") {
        return [];
    }
    if (current.serialization.isError() || current.serialization.isEmpty()) {
        return [];
    }
    // @ts-ignore
    return Object.keys(current.serialization.content()[0] || {}) || []
})

// 更新
const transform = debounce(async () => {
    if (current.value === "") {
        return current.serialization = Serialize.empty()
    }
    try {
        switch (current.type) {
            case "json":
                return current.serialization = Serialize.formJson(current.value)
            case "http_query_string":
                return current.serialization = Serialize.formQueryString(current.value)
            case "csv":
                return current.serialization = Serialize.formCsv(current.value, current.option.csv)
            case "html_table":
                return current.serialization = Serialize.formTable(current.value, current.option.html_table)
            case "xml":
                return current.serialization = Serialize.formXml(current.value, current.option.xml)
            case "yaml":
                return current.serialization = Serialize.formYaml(current.value)
            case "php_array":
                return current.serialization = Serialize.formPhpArray(current.value)
            case "php_serialize":
                return current.serialization = Serialize.formPhpSerialize(current.value)
            case "toml":
                return current.serialization = Serialize.formToml(current.value)
            case "properties":
                return current.serialization = Serialize.formProperties(current.value, current.option.properties)
        }
        throw new Error("error type")
    } catch (e) {
        return current.serialization = Serialize.fromError($error(e))
    }
}, 200)

watch(() => {
    return {
        type: current.type,
        value: current.value,
        option: current.option,
    }
}, () => {
    transform()
}, {immediate: true, deep: true})

watch(() => current.serialization, () => emit('update:modelValue', toRaw(current) as SerializeInput), {immediate: true, deep: true})

watch(() => {
    return {
        type: props.modelValue.type,
        value: props.modelValue.value,
        option: props.modelValue.option,
    }
}, async () => {
    await nextTick()
    current = toRaw(props.modelValue)
}, {deep: true})

const style = $computed(() => {
    let css: StyleValue = {}
    if (props.height) {
        css.height = sizeConvert(props.height)
    }
    return css
})
</script>
