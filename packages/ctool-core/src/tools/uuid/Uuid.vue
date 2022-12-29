<template>
    <Align direction="vertical">
        <HeightResize v-slot="{height}" :reduce="5" :append="['.ctool-page-option']">
            <Editor disableLineNumbers v-if="!action.current.serialize" :model-value="stringOutput" :height="`${height}px`" :placeholder="$t('main_ui_output')"/>
            <SerializeOutput
                v-else
                v-model="action.current.serialize_config"
                :allow="['json','xml', 'yaml', 'toml', 'properties', 'php_array']"
                :height="height"
                :content="serializeOutput"
            />
        </HeightResize>
        <Card class="ctool-page-option">
            <Align horizontal="center">
                <InputNumber v-model="action.current.amount" :label="$t('uuid_amount')" :width="110"/>
                <Bool border :label="$t('uuid_serialize')" v-model="action.current.serialize"/>
                <Input v-model="action.current.delimiter" :label="$t('uuid_delimiter')" :width="150" :disabled="action.current.serialize"/>
                <Bool border :label="$t('uuid_is_add_quote')" v-model="action.current.is_add_quote" :disabled="action.current.serialize"/>
                <Bool border :label="$t('uuid_hyphens')" v-model="action.current.hyphens"/>
                <Bool border :label="$t('uuid_is_upper')" v-model="action.current.isUpper"/>
                <Bool border :label="$t('uuid_uint8_array')" v-model="action.current.uint8_array"/>
            </Align>
        </Card>
    </Align>
</template>

<script lang="ts" setup>
import {parse as uuidParse, v4 as uuidV4} from './util';
import {initialize, useAction} from "@/store/action";
import Serialize from "@/helper/serialize";
import {onMounted, watch} from "vue";
import {SerializeOutput as SerializeOutputType, createSerializeOutput} from "@/components/serialize";

const action = useAction(await initialize<{
    amount: number,
    delimiter: string,
    serialize: boolean,
    serialize_config: SerializeOutputType,
    hyphens: boolean,
    is_add_quote: boolean,
    isUpper: boolean,
    uint8_array: boolean,
    result: string[]
}>({
    amount: 10,
    delimiter: ",\\n",
    serialize: false,
    hyphens: true,
    is_add_quote: false,
    isUpper: false,
    uint8_array: false,
    serialize_config: createSerializeOutput('json'),
    result: []
}))

const handle = () => {
    let result: string[] = [];
    for (let i = 0, l = action.current.amount; i < l; i++) {
        result.push(uuidV4());
    }
    action.current.result = result
}

const output = $computed(() => {
    if (action.current.result.length < 1) {
        return "";
    }
    return action.current.result.map((item) => {
        if (action.current.uint8_array) {
            item = "[" + uuidParse(item).toString() + "]"
        }
        if (!action.current.hyphens) {
            item = item.replace(/-/g, "")
        }
        item = action.current.isUpper ? item.toUpperCase() : item.toLowerCase()
        if (!action.current.serialize && action.current.is_add_quote) {
            item = `"${item}"`
        }
        return item
    })
})

const serializeOutput = $computed<Serialize>(() => {
    return Serialize.formObject(action.current.serialize && action.current.result.length > 0 ? {lists: output} : {})
})

const stringOutput = $computed(() => {
    return (output as string[]).join(action.current.delimiter.replace(/\\n/g, "\n"))
})

onMounted(() => {
    if (action.current.result.length < 1) {
        handle()
    }
})
watch(() => action.current.amount, () => {
    handle()
})
watch(() => action.current, (current) => {
    if (current.result.length < 1) {
        return;
    }
    action.save()
}, {deep: true, immediate: true})
</script>
