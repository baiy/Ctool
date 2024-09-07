<template>
    <HeightResize v-slot="{height}" :append="['.ctool-page-option']">
        <Editor v-model="action.current.input" lang="text" :height="`${height}px`" :placeholder="$t(`main_ui_input`)">
            <Button
                :type="'dotted'"
                size="small"
                @click="statMore = true"
                :tooltip="$t(`text_more_stat`)"
            >
                {{ $t("text_stat_show", [stat.word_length, stat.byte_utf8_length, stat.byte_gbk_length]) }}...
            </Button>
        </Editor>
    </HeightResize>
    <Card class="ctool-page-option" style="margin-top: 5px">
        <Align horizontal="center">
            <Dropdown
                :size="size"
                :placeholder="$t(`text_case_conversion`)"
                :options="[
                {value:'upper',label:$t(`text_upper_all`)},
                {value:'lower',label:$t(`text_lower_all`)},
                {value:'upperLineStart',label:$t(`text_upper_line_start`)},
                {value:'lowerLineStart',label:$t(`text_lower_line_start`)},
                {value:'upperStart',label:$t(`text_upper_word_start`)},
                {value:'lowerStart',label:$t(`text_lower_word_start`)},
            ]"
                @select="handle"
            />
            <Dropdown
                :size="size"
                :placeholder="$t('text_punctuation')"
                :options="[
                {value:'en',label:`${$t('text_cn') } -> ${ $t('text_en')}`},
                {value:'zh',label:`${$t('text_en') } -> ${ $t('text_cn')}`},
            ]"
                @select="type=>handle('replacePunctuation',{type})"
            />
            <Dropdown
                :size="size"
                :placeholder="$t('text_simplified_traditional')"
                :options="[
                {value:'simplified',label:`${$t('text_simplified') } -> ${ $t('text_traditional')}`},
                {value:'traditional',label:`${$t('text_traditional') } -> ${ $t('text_simplified')}`},
            ]"
                @select="type=>handle('zhTran',{type})"
            />
            <Button :size="size" :text="$t('text_replace')" @click="replaceShow = true" />
            <Button :size="size" :text="$t('text_escape')" @click="escapeShow = true" />
            <Button :size="size" :text="$t('text_line_remove_duplicate')" @click="handle('lineRemoveRepeat')" />
            <Dropdown :size="size" @select="(value)=>handle('rename',{type:value})" :placeholder="$t('text_rename')"
                      :options="renameTypeLists.filter(item=>!['spaceCase','pascalCaseSpace'].includes(item.value))" />
            <Dropdown
                :size="size"
                :placeholder="$t('text_line_number')"
                :options="[
                {value:'addLineIndex',label:$t('text_line_number_add')},
                {value:'removeLineIndex',label:$t('text_line_number_remove')},
            ]"
                @select="handle"
            />
            <Dropdown
                :size="size"
                :placeholder="$t('text_sort')"
                :options="[
                {value:'line_asc',label:$t('text_line_sort_asc')},
                {value:'line_desc',label:$t('text_line_sort_desc')},
                {value:'reverse_line',label:$t('text_reverse_line')},
                {value:'reverse_line_string',label:$t('text_reverse_line_string')},
                {value:'reverse_all',label:$t('text_reverse_all')},
            ]"
                @select="(type)=>handle('sort',{type})"
            />
            <Dropdown
                :size="size"
                :placeholder="$t('text_filter')"
                :options="[
                {value:'lineTrim',label:$t('text_filter_trim')},
                {value:'filterBlankLine',label:$t('text_filter_blank_line')},
                {value:'filterAllBr',label:$t('text_filter_all_br')},
            ]"
                @select="handle"
            />
        </Align>
    </Card>
    <Modal v-model="replaceShow" :width="600" :title="$t('text_replace')" footer-type="long" @ok="replace">
        <div v-row="`1-1`">
            <Display>
                    <Textarea
                        :height="200"
                        v-model="action.current.replace.search"
                        :placeholder="`${$t('text_replace_search')}${!action.current.replace.regular ? `\n${$t('text_replace_explain')}` : ''}`"
                    />
                <template #extra>
                    <Align>
                        <Dropdown :size="'small'" :options="getCommonExpression()" :placeholder="$t('regex_common')"
                                  @select="selectReplaceExplain" />
                        <Bool border :size="'small'" v-model="action.current.replace.regular"
                              :label="$t('text_replace_regular')" />
                    </Align>
                </template>
            </Display>
            <Textarea
                :height="200"
                v-model="action.current.replace.replace"
                :placeholder="`${$t('text_replace_replace')}${!action.current.replace.regular ? `\n${$t('text_replace_explain')}` : ''}`"
            />
        </div>
    </Modal>
    <Modal v-model="statMore" :width="600" padding="0">
        <Tabs model-value="stat"
              :lists="[{label:$t('text_stat'),name:`stat`},{label:$t('text_stat_explain'),name:`explain`}]" padding="0">
            <Table :columns="[
                {  title: $t('text_item'), key: 'name1', width: 170},
                { title: $t('text_value'), key: 'value1'},
                {  title: $t('text_item'), key: 'name2', width: 170},
                { title: $t('text_value'), key: 'value2'}
            ]"
                   :lists="[
                {
                    name1: $t('text_string_length'), value1: stat.string_length,
                    name2: $t('text_byte_length'), value2: `${stat.byte_utf8_length} / ${stat.byte_gbk_length}`
                },
                {
                    name1: $t('text_word_length'), value1: stat.word_length,
                    name2: $t('text_line_length'), value2: stat.line_length
                },
                {
                    name1: $t('text_zh_length'), value1: `${stat.zh_word} / ${stat.zh_punctuation}`,
                    name2: $t('text_en_length'), value2: `${stat.en_string} / ${stat.en_word} / ${stat.en_punctuation}`
                },
                {
                    name1: $t('text_int_length'), value1: `${stat.int_string} / ${stat.int_word}`,
                    name2: '-', value2: '-'
                },
            ]"
            />
            <Table :columns="[
                    {
                        title: $t('text_item'),
                        key: 'name',
                        width: 120
                    },
                    {
                        title: $t('text_explain'),
                        key: 'explain',
                    }
                ]"
                   :lists="[
                    {name: $t('text_explain_byte_length_utf8_name'), explain: $t('text_explain_byte_length_utf8_info')},
                    {name: $t('text_explain_byte_length_gbk_name'), explain: $t('text_explain_byte_length_gbk_info')},
                    {name: $t('text_explain_string_length_name'), explain: $t('text_explain_string_length_info')},
                    {name: $t('text_explain_word_length_name'), explain: $t('text_explain_word_length_info')},
                    {name: $t('text_explain_int_length_name'), explain: $t('text_explain_int_length_info')},
                    {name: $t('text_explain_int_word_length_name'), explain: $t('text_explain_int_word_length_info')},
                    {name: $t('text_explain_blank_line_length_name'), explain: $t('text_explain_blank_line_length_info')},
                ]"
            />
        </Tabs>
    </Modal>
    <Modal v-model="escapeShow" :width="600" :title="$t('text_escape')">
        <Align horizontal="center">
            <Checkbox v-model="action.current.escapeChars" :options="escapeOptions" />
        </Align>
        <template #footer>
            <Align horizontal="center">
                <Button :text="$t('text_escape_forward')"
                        @click="handle('escape',{lists:action.current.escapeChars})" />
                <Button :text="$t('text_escape_reverse')"
                        @click="handle('unescape',{lists:action.current.escapeChars})" />
            </Align>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import TextHandle, { escapeChars, EscapeCharsType } from "./util";
import { getCommonExpression } from "../regex/util";
import { ComponentSizeType, CheckboxOption } from "@/types";
import { typeLists as renameTypeLists } from "@/helper/nameConvert";

const action = useAction(await initialize({
    input: "",
    replace: {
        search: "",
        replace: "",
        regular: false,
    },
    escapeChars: Object.keys(escapeChars) as EscapeCharsType[],
}));

const size: ComponentSizeType = "small";

let replaceShow = $ref(false);
let statMore = $ref(false);
let escapeShow = $ref(false);

const replace = () => {
    if (action.current.replace.regular) {
        handle("regularReplace", { search: action.current.replace.search, replace: action.current.replace.replace });
    } else {
        handle("replace", {
            search: action.current.replace.search.split(/\r?\n/),
            replace: action.current.replace.replace.split(/\r?\n/),
        });
    }
    replaceShow = false;
};

const handle = (method: string, option: Record<string, any> = {}) => {
    if (action.current.input.length < 1) {
        return;
    }
    action.current.input = (new TextHandle(action.current.input))[method as keyof TextHandle](option) as string;
    action.success();
};

const stat = $computed(() => {
    return (new TextHandle(action.current.input)).stat();
});

const escapeOptions = $computed<CheckboxOption>(() => {
    return Object.keys(escapeChars).map(item => {
        return {
            value: item,
            label: `${$t(`text_escape_${item}`)}(${escapeChars[item].string})`,
        };
    });
});

const selectReplaceExplain = (value: string) => {
    action.current.replace.search = value;
    action.current.replace.regular = true;
};
</script>
