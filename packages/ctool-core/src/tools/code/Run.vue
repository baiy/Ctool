<template>
    <Align direction="vertical">
        <HeightResize v-slot="{height}" :reduce="205">
            <Editor v-model="action.current.input" :lang="action.current.language" :height="`${height}px`"/>
        </HeightResize>
        <Card :title="$t('main_ui_output')" :height="200" padding="0">
            <template #extra>
                <Align>
                    <span v-if="enabled">{{ isNumber(used) ? $t(`code_run_used_times`, [used]) : used }}</span>
                    <Select size="small" v-model="action.current.language" :options="languageLists.map(name=>{return {value:name,label:getDisplayName(name)}})"/>
                    <Select size="small" v-model="action.current.version[action.current.language]" :options="languageVersionLists"/>
                    <Button
                        type="primary"
                        :text="isRunning ? $t(`code_running`) : $t(`code_run`)"
                        :disabled="isRunning|| !isNumber(used) || !enabled || action.current.input === ''"
                        size="small"
                        @click="run()"
                    />
                    <span>|</span>
                    <Button type="primary" size="small" @click="showSetting = !showSetting">{{ $t(`main_ui_setting`) }}</Button>
                </Align>
            </template>
            <Align v-if="!enabled" height="100%" horizontal="center">
                由于跨域问题, 当前版本无法使用
                <Link href="https://github.com/baiy/Ctool/releases/latest" type="primary">下载其他平台适配版本</Link>
            </Align>
            <Editor v-else lang="shell" :model-value="action.current.result.error !== '' ? action.current.result.error : action.current.result.output">
                <Button
                    v-if="action.current.result.output !== '' && action.current.result.error === ''"
                    :type="'dotted'" size="small"
                    :text="`Memory:${action.current.result.memory} Cpu Time:${action.current.result.cpuTime}`"
                />
            </Editor>
        </Card>
    </Align>
    <ExtendPage v-model="showSetting">
        <Card :title="$t(`main_ui_setting`)" padding="20px">
            <Align direction="vertical" style="margin-bottom: 20px">
                <div v-row="`130px-1`">
                    <strong>Client ID</strong>
                    <Input v-model="config.client_id"/>
                </div>
                <div v-row="`130px-1`">
                    <strong>Client Secret</strong>
                    <Input v-model="config.client_secret"/>
                </div>
            </Align>
            <Align direction="vertical">
                <Align horizontal="center" vertical="center">
                    <Link href="https://www.jdoodle.com/compiler-api/" :tooltip="$t(`code_run_config_explain`,['https://www.jdoodle.com/'])">
                        <img src="@/statics/tools/code/run_api_config.png" style="width: 500px">
                    </Link>
                </Align>
                <Align horizontal="center" vertical="center">
                    <Link href="https://www.jdoodle.com/compiler-api/" type="primary" style="font-size: 12px">
                        {{ $t(`code_run_config_explain`, ['https://www.jdoodle.com/']) }}
                    </Link>
                </Align>
            </Align>
        </Card>
    </ExtendPage>
</template>

<script lang="ts" setup>
import {watch, onMounted} from "vue"
import {useAction, initialize} from "@/store/action"
import {language, getLanguage, getUsed, getConfig, setConfig, execute, Result} from "./runUtil"
import {getDisplayName} from "@/helper/code"
import {SelectOption} from "@/types";
import {isNumber} from "lodash";
import platform from "@/helper/platform"

const action = useAction(await initialize({
    input: "",
    language: "php",
    version: (() => {
        let version: Record<string, string> = {}
        for (let l of language) {
            version[l.code] = l.version[l.version.length - 1].value
        }
        return version
    })(),
    result: {
        output: "",
        memory: 0,
        cpuTime: 0,
        error: ""
    } as Result
}))

const enabled = !platform.isWeb() || import.meta.env.DEV
let showSetting = $ref(false)
let used = $ref<number | string>(0)
let config = $ref(getConfig())

const languageLists = language.map((item) => item.code)
const languageVersionLists: SelectOption = $computed(() => {
    return getLanguage(action.current.language).version.map((item) => {
        return {value: item.value, label: item.name}
    })
})
let isRunning = $ref(false)
const run = () => {
    try {
        isRunning = true;
        execute(
            action.current.language,
            action.current.input,
            action.current.version[action.current.language]
        ).then(result => {
            action.current.result = result
            action.save()
        }).catch(error => {
            action.current.result = {
                output: "",
                memory: 0,
                cpuTime: 0,
                error: $error(error)
            }
            action.save()
        }).finally(() => {
            isRunning = false
            resetUsed()
        })
    } catch (error) {
        action.current.result = {
            output: "",
            memory: 0,
            cpuTime: 0,
            error: $error(error)
        }
        isRunning = false
    }
}

watch(
    () => {
        return {config}
    },
    ({config}) => {
        setConfig(config.client_id, config.client_secret)
        resetUsed()
    },
    {deep: true}
)

const resetUsed = () => {
    if (!enabled) {
        return;
    }
    getUsed().then(times => {
        used = times
    }).catch(e => {
        used = $error(e)
    })
}
onMounted(() => {
    resetUsed()
})
</script>
