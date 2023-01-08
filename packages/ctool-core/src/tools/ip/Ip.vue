<template>
    <div style="height: 100%;display: flex;justify-content: center;align-items: center">
        <Align :width="600" direction="vertical">
            <div style="display: grid;grid-template-columns: 1fr 80px;column-gap: 5px">
                <Display :type="'general'" :text="action.current.input === '' ? $t('ip_local') : ''" @click="local" position="right-center">
                    <Input v-model="action.current.input" size="large" :placeholder="$t('ip_input')"/>
                </Display>
                <Button type="primary" :loading="isLoading" size="large" @click="query">{{ $t('ip_query') }}</Button>
            </div>
            <div v-if="!isResult" style="text-align: center">
                <Link href="https://geojs.io/">{{ $t('ip_info_source') }}: https://geojs.io/</Link>
            </div>
            <SerializeOutput
                v-if="isResult"
                :allow="['json','xml','yaml','toml','php_array','properties','http_query_string']"
                :content="outputSerialize"
                :height="300"
                v-model="action.current.option"
                @success="action.save()"
            />
        </Align>
    </div>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import Serialize from "@/helper/serialize";
import {createSerializeOutput, SerializeOutput as SerializeOutputType} from "@/components/serialize";
import axios from "axios";
import {isArray} from "lodash";

// IPv4、IPv6
const ipReg = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/ig;

const action = useAction(await initialize<{ input: string, option: SerializeOutputType, result: Record<string, any> | "" }>({
    input: "",
    option: createSerializeOutput('json'),
    result: ""
}, {paste: (input) => ipReg.test(input) || input === "localhost"}))

let isLoading = $ref(false)

const outputSerialize: Serialize = $computed(() => action.current.result === "" ? Serialize.empty() : Serialize.formObject(action.current.result))
const isResult = $computed(() => !outputSerialize.isEmpty() || outputSerialize.isError())

const local = () => {
    action.current.input = 'localhost'
    query()
}

const query = () => {
    isLoading = true
    axios({
        url: 'https://get.geojs.io/v1/ip/geo.json',
        params: action.current.input !== "localhost" ? {ip: action.current.input} : {}
    }).then(({data}) => {
        action.current.result = isArray(data) && data.length < 2 ? data[0] : data
        action.save()
    }).catch((error) => {
        action.current.result = {error: $error(error, false)}
        action.save()
    }).then(() => {
        isLoading = false
    });
}
</script>
