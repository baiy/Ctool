<template>
    <HeightResize v-slot="{ height }" :append="['.ctool-page-option']">
        <div v-row="'1-1'">
            <Textarea :height="height" v-model="action.current.input" :float-text="$t('bcrypt_password')" :placeholder="$t('bcrypt_password')"
                      @clickFloatText="$copy(action.current.input)" />
            <Textarea :height="height" v-model="action.current.hash" :float-text="$t('bcrypt_hash')" :placeholder="$t('bcrypt_hash')"
                      @clickFloatText="$copy(action.current.hash)" />
        </div>
    </HeightResize>
    <div style="display: grid; grid-template-columns: 1fr 5px 1fr; grid-column-gap: 10px; margin-top: 5px" class="ctool-page-option">
        <div style="display: grid; grid-template-columns: 120px 120px 1fr; grid-column-gap: 5px">
            <Select v-model="action.current.rounds" :options="rounds" class="select-box" />
            <Select v-model="action.current.version" :options="versionOptions" class="select-box" />
            <Button
                :loading="generateLoading"
                @click="generate"
                type="primary"
                long
                :text="$t('bcrypt_generate')"
            />
        </div>
        <span style="display: flex; justify-content: center; align-items: center">|</span>
        <Button
            :loading="checkLoading"
            @click="check"
            type="primary"
            long
            :text="checkButtonText"
        />
    </div>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { watch, onUnmounted } from "vue";
import { range } from "lodash";

// 加密过程较慢 使用 worker 避免页面卡死
const worker = new Worker(new URL('./worker', import.meta.url), { type: 'module' });
onUnmounted(() => {
    worker.terminate();
})

type InitializeType = {
    input: string
    rounds: number,
    hash: string,
    check_result: null | boolean,
    version: string
}

const action = useAction(await initialize<InitializeType>({
    input: "",
    rounds: 10,
    hash: '',
    check_result: null,
    version: '2a' // 默认版本
}, { paste: false }))

let generateLoading = $ref(false)
let checkLoading = $ref(false)

worker.onmessage = function (event) {
    const data = event.data
    console.log('main accept', data)
    if (data.method === "hash") {
        return generateCallback(data.data.err, data.data.hash)
    }
    if (data.method === "compare") {
        return checkCallback(data.data.err, data.data.res)
    }
}

const workerPost = (method: string, data: any) => {
    let send = { method, data }
    console.log("main send", send)
    worker.postMessage(send);
}

const generate = () => {
    if (action.current.input === "") {
        return;
    }
    if (action.current.rounds < 4 || action.current.rounds > 30) {
        throw new Error($t('bcrypt_rounds_range', [4, 30]))
    }
    generateLoading = true
    workerPost('hash', { input: action.current.input, rounds: action.current.rounds, version: action.current.version })
}

const generateCallback = (err: Error, hash: string) => {
    generateLoading = false
    if (err) {
        throw new Error(err.message)
    }
    action.current.hash = hash
    action.current.check_result = null
    action.success({ copy_text: action.current.hash })
}

const check = () => {
    if (action.current.input === "" || action.current.hash === "") {
        return;
    }
    checkLoading = true
    workerPost('compare', { input: action.current.input, hash: action.current.hash })
}

const checkCallback = (_err: Error, res: boolean) => {
    checkLoading = false
    action.current.check_result = res
    const result = (action.current.check_result ? $t(`bcrypt_check_result_success`) : $t('bcrypt_check_result_error'))
    action.success({
        message: `${$t(`bcrypt_check`)} ${result}`,
        message_type: action.current.check_result ? "success" : "error"
    })
}

const rounds = range(4, 33).map((r) => {
    return { label: `${$t('bcrypt_rounds')} ${r}`, value: r }
});

const versionOptions = [
    { label: '2a', value: '2a' },
    { label: '2b', value: '2b' },
    { label: '2y', value: '2y' }
];

const checkButtonText = $computed(() => {
    if (action.current.check_result === null) {
        return $t('bcrypt_check')
    }
    return `${$t('bcrypt_check')} (${action.current.check_result ? $t(`bcrypt_check_result_success`) : $t('bcrypt_check_result_error')})`
})

watch(() => {
    return {
        input: action.current.input,
        hash: action.current.hash,
    }
}, () => {
    action.current.check_result = null
})
</script>

<style scoped>
.select-box {
    width: 100%; /* Ensure it uses full width of the container */
    box-sizing: border-box; /* Include padding and border in the element's total width */
}

.select-box {
    min-width: 0; /* Prevent overflow issues */
    max-width: 120px; /* Adjust this value to control the size */
}
</style>
