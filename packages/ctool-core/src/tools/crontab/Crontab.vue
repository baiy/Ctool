<template>
    <Align direction="vertical">
        <Input v-model="action.current.input" class="ctool-crontab-input" :label="$t('crontab_expression')">
            <template #suffix>
                <Align>
                    <HelpTip link="https://www.npmjs.com/package/cron-parser"/>
                    <Button size="small" type="primary" :text="$t(`crontab_generate`)" @click="isGenerate = !isGenerate"/>
                </Align>
            </template>
        </Input>
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
                v-if="!isGenerate"
            >
                <Table
                    :columns="[{key:'exp',title:$t(`crontab_example`),width:150},{key:'text',title:$t(`crontab_description`)}]"
                    :lists="example.map((item)=>{return {exp:item,text:conversion(item)}})"
                />
                <Link href="https://www.npmjs.com/package/cron-parser" style="height: 100%;display: flex;justify-content: center;align-items: center">
                    <img src="@/statics/tools/crontab/crontab.png" style="max-width: 95%;max-height: 95%" alt="crontab">
                </Link>
                <Table
                    :height="height-40"
                    :columns="[{key:'name',title:$t('crontab_symbol'),width:100},{key:'text',title:$t(`crontab_description`)}]"
                    :lists="symbol"
                />
            </Tabs>
            <Generate v-else :height="height" v-model="action.current.input"/>
        </HeightResize>
    </Align>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import cronstrue from 'cronstrue/i18n';
import parser from 'cron-parser';
import {watch} from 'vue';
import dayjs from 'dayjs';
import Generate from './generate/Generate.vue';
import HeightResize from "@/components/HeightResize.vue";
import Align from "@/components/Align.vue";
import Link from "@/components/ui/Link.vue";
import Input from "@/components/ui/Input.vue";
import Tabs from "@/components/ui/Tabs.vue";
import Textarea from "@/components/ui/Textarea.vue";
import Table from "@/components/ui/Table.vue";
import Button from "@/components/ui/Button.vue";

const locale = $computed(() => $t('main_locale'))

const action = useAction(await initialize({
    input: "2,3 */5 * * 2-5",
}, {
    paste: (str) => [5, 6].includes(str.trim().split(" ").length),
}))

let isGenerate = $ref(false)
let output = $ref("")

const conversion = (exp: string) => {
    return cronstrue.toString(exp, {locale, use24HourTimeFormat: true})
}
watch(() => {
    return {
        input: action.current.input
    }
}, ({input}) => {
    output = ""
    input = input.trim()
    if (input === "") {
        return;
    }
    let list: string[] = [];
    try {
        const msg = conversion(input);
        if (input.includes("L")) {
            list.push($t('crontab_l_prompt'), "")
        }
        if (input.split(" ").length > 5) {
            list.push($t('crontab_second_prompt'), "")
        }
        list.push(msg);
        list.push("", $t('crontab_execute_time_list'));
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
    "* * * * *",
    "*/5 */5 * * *",
    "* 10/5 * * *",
    "1 1-10 * * *",
    "0 1,2 * * *",
    "1 2 3 4,6,10 *",
    "0 * L * *",
    "0 1 * * 0",
    "0 1 * * 7",
    "0 1 * * 1",
    "0 1 * * 2-5",
    "0 1 * * 2,5",
    "0 1 * * 1L",
    "0 1 * * 1L,2L",
    "*/5 1-10,17,22 L 1-2,3/2 1L,2L",
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
