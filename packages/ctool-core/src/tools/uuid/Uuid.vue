<template>
    <Align direction="vertical">
        <HeightResize v-slot="{height}" :reduce="5" :append="['.ctool-page-option']">
            <SerializeOutput
                v-model="action.current.outputOption"
                :allow="['json','xml', 'yaml', 'toml', 'properties', 'php_array','text']"
                :height="height"
                :content="output"
            />
        </HeightResize>
        <Card class="ctool-page-option">
            <Align horizontal="center">
                <InputNumber v-model="action.current.amount" :label="$t('uuid_amount')" :width="110"/>
                <Bool border :label="$t('uuid_hyphens')" v-model="action.current.hyphens"/>
                <Bool border :label="$t('uuid_is_upper')" v-model="action.current.isUpper"/>
                <Bool border :label="$t('uuid_uint8_array')" v-model="action.current.uint8_array"/>
                <Button @click="handle">
                    <Icon name="refresh"/>
                </Button>
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
    outputOption: SerializeOutputType,
    hyphens: boolean,
    is_add_quote: boolean,
    isUpper: boolean,
    uint8_array: boolean,
    result: string[]
}>({
    amount: 10,
    hyphens: true,
    is_add_quote: false,
    isUpper: false,
    uint8_array: false,
    outputOption: createSerializeOutput('text'),
    result: []
}))

const handle = () => {
    let result: string[] = [];
    for (let i = 0, l = action.current.amount; i < l; i++) {
        result.push(uuidV4());
    }
    action.current.result = result
}

const output = $computed<Serialize>(() => {
    if (action.current.result.length < 1) {
        return Serialize.empty();
    }
    return Serialize.formObject(
        action.current.result.map((item) => {
            if (action.current.uint8_array) {
                item = "[" + uuidParse(item).toString() + "]"
            }
            if (!action.current.hyphens) {
                item = item.replace(/-/g, "")
            }
            return action.current.isUpper ? item.toUpperCase() : item.toLowerCase()
        })
    )
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
