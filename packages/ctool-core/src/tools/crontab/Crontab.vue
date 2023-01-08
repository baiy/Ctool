<template>
    <Align direction="vertical">
        <Input v-model="action.current.input" class="ctool-crontab-input" :label="$t('crontab_expression')"/>
        <HeightResize v-slot="{height}" :append="['.ctool-crontab-input']" v-row="'10-14'" :reduce="5">
            <Textarea :model-value="output" :height="height" :placeholder="$t('crontab_execute_time')"/>
            <Tabs
                model-value="example"
                :lists="[
                    {name:`example`,label:$t('crontab_example')},
                    {name:`format`,label:$t('crontab_format')},
                    {name:`symbol`,label:$t('crontab_symbol')},
                ]"
                :height="height"
                padding="0"
            >
                <Table
                    :columns="[{key:'exp',title:$t(`crontab_example`),width:150},{key:'text',title:$t(`crontab_description`)}]"
                    :lists="example.map((item)=>{return {exp:item,text:conversion(item)}})"
                />
                <Align horizontal="center" vertical="center">
                    <img v-if="locale === 'zh_CN'" src="@/statics/tools/crontab/crontab_cn.png" style="max-width: 80%;max-height: 80%">
                    <img v-else src="@/statics/tools/crontab/crontab_en.png" style="max-width: 80%;max-height: 80%">
                </Align>
                <Table
                    :height="height-40"
                    :columns="[{key:'name',title:$t('crontab_symbol'),width:100},{key:'text',title:$t(`crontab_description`)}]"
                    :lists="symbol"
                />
            </Tabs>
        </HeightResize>
    </Align>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import cronstrue from 'cronstrue/i18n';
import parser from 'cron-parser';
import {watch} from 'vue';
import dayjs from 'dayjs';

const locale = $computed(() => $t('main_locale'))

const action = useAction(await initialize({
    input: "2,3 */5 * * 2-5",
}, {
    paste: (str) => [4, 5].includes(str.trim().match("/ /g")?.length || 0)
}))
let output = $ref("")

const conversion = (exp: string) => {
    return cronstrue.toString(exp, {locale, use24HourTimeFormat: true})
}
watch(() => action.current.input, (input) => {
    input = input.trim()

    if (input === "") {
        output = ""
    }
    let list: string[] = [];
    try {
        list.push(conversion(input));
        list.push(`\n${$t('crontab_execute_time_list')}`);
        let interval = parser.parseExpression(input);
        for (let i = 1; i <= 10; i++) {
            list.push($t('crontab_no', [i, dayjs(interval.next().toString()).format("YYYY-MM-DD HH:mm:ss")]))
        }
        action.save()
    } catch (e) {
        list.push($error(e))
    }
    output = list.join("\n");
}, {immediate: true})

const example = [
    "*/1 * * * *",
    "* * * * *",
    "*/5 * * * *",
    "0 * * * *",
    "0 */1 * * *",
    "0 7 * * *",
    "10 7 * * *",
    "0 0 * * *",
    "0 0 * * 0",
    "0 0 1 * *",
    "0 0 1 1 *",
    "5 * * * *",
    "30 5 * * *",
    "30 7 8 * *",
    "30 5 8 6 *",
    "30 6 * * 0",
    "30 3 10,20 * *",
    "25 8-11 * * *",
    "*/15 * * * *",
    "30 6 */10 * *"
]
const symbol = $computed(() => {
    return [
        {
            name: "*",
            text: $t('crontab_symbol_description_1')
        },
        {
            name: ",",
            text: $t('crontab_symbol_description_2')
        },
        {
            name: "-",
            text: $t('crontab_symbol_description_3')
        },
        {
            name: "/n",
            text: $t('crontab_symbol_description_4')
        }
    ]
})
</script>
