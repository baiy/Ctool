<template>
    <HeightResize v-slot="{height}">
        <Editor v-model="action.current.input" :lang-callback="editorLanguage" :reload="editorReload" :lang="action.current.language" :height="`${height}px`">
            <Align>
                <Select size="small" dialog v-model="action.current.language" :options="languageLists.map(name=>{return {value:name,label:getDisplayName(name)}})"/>
                <template v-for="lang in languageLists" :key="lang">
                    <Select v-if="action.current.language === lang" size="small" v-model="action.current.option[`${lang}`].tab" :options="tabOptions"/>
                </template>
                <Select v-if="action.current.language === 'sql'" size="small" v-model="action.current.option.sql.language" :options="sqlLanguages"/>
                <Bool v-if="action.current.language === 'xml'" size="small" v-model="action.current.option.xml.collapse_content"
                      :label="$t(`code_xml_collapse_content`)"/>
                <Button type="primary" v-if="isEnableBeautify" size="small" @click="handle('beautify')">{{ $t(`code_beautify`) }}</Button>
                <span v-if="isEnableCompress">|</span>
                <Button type="primary" v-if="isEnableCompress" size="small" @click="handle('compress')">{{ $t(`code_compress`) }}</Button>
            </Align>
        </Editor>
    </HeightResize>
</template>

<script lang="ts" setup>
import {ref, computed, watch} from "vue"
import {useAction, initialize} from "@/store/action"
import formatter from "./formatter"
import {getInArrayOnlyOneItem} from "@/helper/util"
import {getDisplayName} from "@/helper/code"

import {
    OptionMap,
    Languages as FormatterLanguages,
    sqlLanguages
} from "./formatter/types";

// 过滤json 有单独json工具
type Languages = Exclude<FormatterLanguages, "json">
const languageLists = formatter.allLanguageType.filter((item) => {
    return !['json'].includes(item)
}) as Languages[]

const action = useAction(await initialize<{ option: { [k in Languages]: OptionMap[k] }, input: string, language: Languages }>({
    input: "",
    language: "javascript",
    option: {
        javascript: {tab: 4},
        markdown: {tab: 4},
        typescript: {tab: 4},
        css: {tab: 4},
        less: {tab: 4},
        scss: {tab: 4},
        yaml: {tab: 4},
        html: {tab: 4},
        xml: {tab: 4, collapse_content: true},
        php: {tab: 4},
        java: {tab: 4},
        vue: {tab: 4},
        graphql: {tab: 4},
        sql: {tab: 4, language: "mysql"},
    }
}, {
    keyword: (str) => {
        const lang = getInArrayOnlyOneItem(str, languageLists);
        if (lang === "") {
            return false
        }
        return {language: lang}
    }
}))

const isEnableCompress = computed(() => {
    return formatter.languages[action.current.language].compress
})
const isEnableBeautify = computed(() => {
    return formatter.languages[action.current.language].beautify
})

const handle = async (type: "beautify" | "compress") => {
    if (action.current.input.trim() === "") {
        return;
    }
    const handle = await formatter.load(action.current.language)
    const result = await handle.set(action.current.input, action.current.option[action.current.language]).format(type)
    if (result === "") {
        throw new Error("result empty")
    }
    action.current.input = result
    action.success()
}

const editorReload = ref(0)

const editorLanguage = () => {
    if (action.current.language === "sql") {
        // Sql 特殊格式
        switch (action.current.option.sql.language) {
            case "mysql":
                return "MySQL";
            case "mariadb":
                return "MariaDB SQL";
            case "plsql":
                return "PLSQL";
            case "postgresql":
                return "PostgreSQL";
            case "sqlite":
                return "SQLite";
        }
    }
}

watch(() => action.current.option.sql.language, () => {
    editorReload.value++
})

const tabOptions = [
    {label: $t('code_indent_width_null'), value: 0},
    {label: $t('code_indent_width', [2]), value: 2},
    {label: $t('code_indent_width', [4]), value: 4},
    {label: $t('code_indent_width', [6]), value: 6},
    {label: $t('code_indent_width', [8]), value: 8}
]
</script>
