<template>
    <Align horizontal="center" class="ctool-page-option" :bottom="'default'">
        <Input size="large" :width="400" v-model="action.current.input" :label="$t('ipcalc_ip')"/>
        <HelpTip link="https://www.npmjs.com/package/ip6"/>
    </Align>
    <Align direction="vertical" v-if="error === ''">
        <Card :title="$t('ipcalc_ip_info')" padding="0">
            <div style="display: grid;grid-template-columns: 1fr 1fr;">
                <Item :title="$t(`ipcalc_ip_info_full`)" :value="normalize"/>
                <Item :title="$t(`ipcalc_ip_info_short`)" :value="abbreviate"/>
            </div>
            <template #extra>{{ action.current.input }}</template>
        </Card>
        <Card :title="$t('ipcalc_network_info')" padding="0">
            <div style="display: grid;grid-template-columns: 1fr 1fr 1fr;">
                <Item :title="$t(`ipcalc_network_info_size`)" :value="`${ipRange.size}`"/>
                <Item :title="$t(`ipcalc_network_info_first`)" :value="ipRange.start"/>
                <Item :title="$t(`ipcalc_network_info_last`)" :value="ipRange.end"/>
            </div>
            <template #extra>
                <Align>
                    <Select size="small" :options="mask0Lists" v-model="action.current.mask0"/>
                    <Select size="small" :options="mask1Lists" v-model="action.current.mask1"/>
                    <Bool type="primary" size="small" v-model="action.current.abbr" :label="$t(`ipcalc_short`)" border/>
                    <Button type="primary" size="small" :text="$t('ipcalc_subnet')" @click="showSubnet = true"/>
                </Align>
            </template>
        </Card>
        <Card :title="$t('ipcalc_ip_info_ptr')">
            <Item :value="ptr"/>
            <template #extra>
                <Select size="small" :options="maskPtrLists" v-model="action.current.maskPtr"/>
            </template>
        </Card>
    </Align>
    <HeightResize :append="['.ctool-page-option']" v-if="error !== ''">
        <Exception :content="error"/>
    </HeightResize>
    <ExtendPage v-model="showSubnet">
        <Card :title="`${action.current.input} ${$t('ipcalc_subnet')}`" padding="0">
            <HeightResize v-slot="{height}" :reduce="35">
                <SerializeOutput
                    disabledBorder
                    v-model="action.current.subnetOption"
                    :allow="['json','xml','yaml','toml','php_array','properties','text']"
                    :content="subnet"
                    :height="height"
                />
            </HeightResize>
            <template #extra>
                <Align>
                    <InputNumber size="small" :width="120" v-model="action.current.limit" :label="$t('ipcalc_limit')"/>
                    <Bool type="primary" size="small" v-model="action.current.abbr" :label="$t(`ipcalc_short`)" border/>
                    <Bool type="primary" size="small" v-model="action.current.random" :label="$t(`ipcalc_random`)" border/>
                </Align>
            </template>
        </Card>
    </ExtendPage>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import util from './utilV6';
import {watch} from 'vue';
import {range} from 'lodash';
import {SelectOption} from "@/types";
import {createSerializeOutput} from "@/components/serialize";
import Item from "./Item.vue";

const action = useAction(await initialize({
    input: "2404:68::",
    mask0: 32,
    mask1: 64,
    limit: 100,
    abbr: false,
    random: false,
    maskPtr: 32,
    subnetOption: createSerializeOutput("text")
}, {
    paste: (input: string) => {
        try {
            util.validate(input)
        } catch (e) {
            return false
        }
        return true
    }
}))

let error = $ref("")
let showSubnet = $ref(false)

watch(() => {
    return {input: action.current.input.trim()}
}, () => {
    error = ""
    try {
        if (action.current.input.trim() === "") {
            throw new Error("Input Empty")
        }
        util.validate(action.current.input)
    } catch (e) {
        error = $error(e)
    }
})

watch(() => {
    return {
        current: action.current
    }
}, () => {
    if (action.current.input.trim() === "") {
        return;
    }
    action.save()
}, {deep: true, immediate: true})


const normalize = $computed(() => {
    return util.normalize(action.current.input.trim())
})

const abbreviate = $computed(() => {
    return util.abbreviate(action.current.input.trim())
})

const subnet = $computed(() => {
    return util.subnet(action.current.input.trim(), action.current.mask0, action.current.mask1, action.current.limit, action.current.abbr, action.current.random)
})

const ipRange = $computed(() => {
    return util.range(action.current.input.trim(), action.current.mask0, action.current.mask1, action.current.abbr)
})

const ptr = $computed(() => {
    return util.ptr(action.current.input.trim(), action.current.maskPtr)
})

const mask0Lists = range(0, 128).map(item => {
    return {
        value: item,
        label: `/${item}`
    }
})

const maskPtrLists = range(0, 129, 4).map(item => {
    return {
        value: item,
        label: `/${item}`
    }
})

const mask1Lists = $computed<SelectOption>(() => {
    const lists = range(action.current.mask0 + 1, 129)
    if (!lists.includes(action.current.mask1)) {
        lists.push(action.current.mask1)
    }
    return lists.map(item => {
        return {
            value: item,
            label: `/${item}`
        }
    })
})
</script>
