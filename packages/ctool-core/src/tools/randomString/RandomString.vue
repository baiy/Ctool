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
                <Input :size="size" v-model="action.current.base" :width="200">
                    <template #append>
                        <Button @click="baseSetting.base = action.current.base;baseSetting.show = true">
                            <Icon hover name="setting" :tooltip="$t('main_ui_setting')" :size="12" />
                        </Button>
                    </template>
                </Input>
                <InputNumber :size="size" v-model="action.current.length" :width="100" :label="$t('randomString_length')"/>
                <InputNumber :size="size" v-model="action.current.amount" :width="100" :label="$t('randomString_amount')"/>
                <Bool :size="size" border v-model="action.current.is_add_quote" :label="$t('randomString_add_quote')" :disabled="action.current.serialize"/>
                <Input :size="size" v-model="action.current.delimiter" :width="120" :label="$t('randomString_delimiter')" :disabled="action.current.serialize"/>
                <Bool :size="size" border v-model="action.current.serialize" :label="$t('uuid_serialize')"/>
                <Button @click="generate" :size="size">
                    <Icon name="refresh" :size="12" />
                </Button>
            </Align>
        </Card>
    </Align>
    <Modal :title="`${$t('main_ui_setting')} ${$t('randomString_chars')}`" v-model="baseSetting.show" footer-type="long" @ok="action.current.base = baseSetting.base;baseSetting.show = false">
        <Align direction="vertical">
            <Textarea v-model="baseSetting.base" :height="300"/>
            <Align horizontal="center">
                <Bool :size="size" border :label="$t('randomString_digital')" :model-value="baseIsExist.digital" @change="setBase('digital')"/>
                <Bool :size="size" border :label="$t('randomString_lowercase')" :model-value="baseIsExist.lowercase" @change="setBase('lowercase')"/>
                <Bool :size="size" border :label="$t('randomString_uppercase')" :model-value="baseIsExist.uppercase" @change="setBase('uppercase')"/>
                <Bool :size="size" border :label="$t('randomString_symbol')" :model-value="baseIsExist.symbol" @change="setBase('symbol')"/>
                <Button :size="size" :text="$t('main_ui_reset')" @click="setBase('reset')"/>
            </Align>
        </Align>
    </Modal>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import {createSerializeOutput, SerializeOutput as SerializeOutputType} from "@/components/serialize";
import Serialize from "@/helper/serialize";
import {onMounted, watch} from "vue";
import {intersection} from "lodash";
import {ComponentSizeType} from "@/types";
import {$computed} from "vue/macros";

const size: ComponentSizeType = "small"

const baseDigital = "0123456789";
const baseLowercase = "abcdefghijklmnopqrstuvwxyz";
const baseUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const baseSymbol = "`~!@#$%^&*()-_=+[{]}|;:',<.>/?";

const action = useAction(await initialize<{
    amount: number,
    length: number,
    delimiter: string,
    serialize: boolean,
    serialize_config: SerializeOutputType,
    is_add_quote: boolean,
    base: string,
    result: string[]
}>({
    amount: 10,
    length: 32,
    delimiter: ",\\n",
    serialize: false,
    serialize_config: createSerializeOutput('json'),
    is_add_quote: false,
    base: `${baseDigital}${baseLowercase}${baseUppercase}`,
    result: []
}))

let baseSetting = $ref<{ base: string, show: boolean }>({base: action.current.base, show: false})

const generate = () => {
    let chars = `${action.current.base}`;
    let randomStringLists: string[] = [];
    for (let i = 0, l = action.current.amount; i < l; i++) {
        let _chars = chars.split(""),
            randomString = "";
        for (let j = 0, k = action.current.length; j < k; j++) {
            if (_chars.length < 1) break;
            let index = Math.floor(Math.random() * _chars.length);
            randomString += _chars[index];
        }
        randomStringLists.push(randomString);
    }
    action.current.result = randomStringLists;
}

const serializeOutput = $computed<Serialize>(() => {
    return Serialize.formObject(action.current.serialize && action.current.result.length > 0 ? {lists: action.current.result} : {})
})

const stringOutput = $computed(() => {
    return (action.current.result as string[]).map(item => {
        return action.current.is_add_quote ? `"${item}"` : item
    }).join(action.current.delimiter.replace(/\\n/g, "\n"))
})

onMounted(() => {
    if (action.current.result.length < 1) {
        generate()
    }
})
watch(() => {
    return {
        amount: action.current.amount,
        length: action.current.length,
        base: action.current.base,
    }
}, () => {
    generate()
})
watch(() => action.current, (current) => {
    if (current.result.length < 1) {
        return;
    }
    action.save()
}, {deep: true, immediate: true})

const setBase = (type: string) => {
    if (type === "reset") {
        baseSetting.base = `${baseDigital}${baseLowercase}${baseUppercase}`
        return;
    }
    let base = `${baseSetting.base}`.split("")
    const chars = ({
        digital: `${baseDigital}`,
        lowercase: `${baseLowercase}`,
        uppercase: `${baseUppercase}`,
        symbol: `${baseSymbol}`,
    }[type] || "").split("")
    if (chars.length > 0) {
        console.log(intersection(base, chars))
        // 判断是否存在
        if (intersection(base, chars).length > 0) {
            base = base.filter((char) => {
                return !chars.includes(char)
            })
        } else {
            base = [...base, ...chars]
        }
    }
    baseSetting.base = [...(new Set(base))].join("")
}

const baseIsExist = $computed(() => {
    let base = `${baseSetting.base}`.split("")
    return {
        digital: intersection(base, baseDigital.split("")).length > 0,
        lowercase: intersection(base, baseLowercase.split("")).length > 0,
        uppercase: intersection(base, baseUppercase.split("")).length > 0,
        symbol: intersection(base, baseSymbol.split("")).length > 0,
    }
})

</script>
