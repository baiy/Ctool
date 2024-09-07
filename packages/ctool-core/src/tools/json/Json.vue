<template>
    <div>
        <HeightResize v-slot="{ height }" :append="['.ctool-page-option']">
            <div :style="layoutStyle">
                <SerializeInput
                    v-if="action.current.expand_type === 'from'"
                    :allow="[action.current.option.from.type]"
                    :height="height"
                    v-model="action.current.option.from"
                />
                <Editor
                    v-model="action.current.input"
                    :line-info="action.current.option.info.line"
                    :placeholder="`Json ${$t('main_ui_input')}`"
                    lang="json"
                    :height="`${height}px`"
                />
                <SerializeOutput
                    v-if="action.current.expand_type === 'to'"
                    :allow="[action.current.option.to.type]"
                    :content="inputSerialize"
                    :height="height"
                    @success="() => action.save()"
                    v-model="action.current.option.to"
                />
                <Path
                    v-if="action.current.expand_type === 'path'"
                    :height="height"
                    :json="inputSerialize"
                    v-model="action.current.option.path"
                    @success="() => action.save()"
                />
                <Schema
                    v-if="action.current.expand_type === 'json_schema'"
                    :height="height"
                    :json="inputSerialize"
                    v-model="action.current.option.schema"
                    @success="() => action.save()"
                />
            </div>
        </HeightResize>
        <Display position="top-right" class="ctool-page-option" style="margin-top: 5px">
            <template #extra>
                <Align>
                    <Bool size="small" border v-model="action.current.option.info.line" :label="$t('json_line_info')" />
                    <Button @click="general.repair()" type="primary" size="small" :text="$t('json_repair')" />
                    <HelpTip link="https://www.npmjs.com/package/jsonrepair" />
                </Align>
            </template>
            <Tabs
                v-model="action.current.tabs"
                :lists="[
                    { label: $t(`json_common`), name: `common` },
                    { label: `Path`, name: `path` },
                    { label: $t(`json_object`), name: `object` },
                    { label: $t(`json_from`), name: `from` },
                    { label: $t(`json_to`), name: `to` },
                ]"
            >
                <Align>
                    <Button @click="general.beautify()">{{ $t(`json_format`) }}</Button>
                    <Select
                        :model-value="action.current.option.tab"
                        @change="value => general.tabs(value)"
                        :placeholder="$t('json_format')"
                        :options="tabOptions"
                    />
                    <Button @click="general.compress()">{{ $t(`json_compress`) }}</Button>
                    <span>|</span>
                    <Dropdown
                        @select="value => general[value]()"
                        :placeholder="$t(`json_escape`)"
                        :options="[
                            { label: $t('json_add_escape'), value: 'escape' },
                            { label: $t('json_clear_escape'), value: 'clearEscape' },
                        ]"
                    />
                    <Dropdown
                        @select="value => general[value]()"
                        placeholder="Unicode"
                        :options="[
                            { label: $t('json_unicode_to_zh'), value: 'unicode2zh' },
                            { label: $t('json_zh_to_unicode'), value: 'zh2unicode' },
                        ]"
                    />
                    <span>|</span>
                    <Dropdown
                        @select="value => general.sort(value)"
                        :placeholder="$t('json_key_sort')"
                        :options="[
                            { label: $t('json_asc'), value: 'asc' },
                            { label: $t('json_desc'), value: 'desc' },
                        ]"
                    />
                    <Dropdown
                        @select="value => general.rename(value)"
                        :placeholder="$t('json_key_rename')"
                        :options="renameTypeLists"
                    />
                    <span>|</span>
                    <Button @click="setExpandType('json_schema')">Schema</Button>
                </Align>
                <Align>
                    <template v-for="item in pathLists">
                        <Button
                            :size="size"
                            :text="item.label"
                            :type="item.value === action.current.option.path.type ? 'primary' : 'general'"
                            @click="togglePath(item.value)"
                        />
                    </template>
                </Align>
                <Align>
                    <template v-for="item in toObjectLangLists.sort()">
                        <Button
                            :size="size"
                            :text="getDisplayName(item)"
                            :type="item === action.current.option.to_object.lang ? 'primary' : 'general'"
                            @click="toggleObject(item)"
                        />
                    </template>
                </Align>
                <Align>
                    <template v-for="item in serializeInputEncoderLists">
                        <Button
                            :size="size"
                            v-if="item !== 'json'"
                            :type="item === action.current.option.from.type ? 'primary' : 'general'"
                            :text="getDisplayName(item)"
                            @click="toggleFrom(item)"
                        />
                    </template>
                </Align>
                <Align>
                    <template v-for="item in serializeOutputEncoderLists">
                        <Button
                            :size="size"
                            v-if="item !== 'json'"
                            :type="item === action.current.option.to.type ? 'primary' : 'general'"
                            :text="getDisplayName(item)"
                            @click="toggleTo(item)"
                        />
                    </template>
                </Align>
            </Tabs>
        </Display>
    </div>
    <ExtendPage v-model="toObjectOpen">
        <ToObject v-model="action.current.option.to_object" :json="inputSerialize" @success="() => action.save()" />
    </ExtendPage>
</template>

<script lang="ts" setup>
import { StyleValue, watch } from "vue";
import Json from "@/helper/json";
import { useAction, initialize } from "@/store/action";
import { tabOptions, actionType, TabsType, pathLists } from "./define";
import { createSerializeInput, createSerializeOutput } from "@/components/serialize";
import Schema from "./Schema.vue";
import { serializeInputEncoderLists, serializeOutputEncoderLists } from "@/types";
import Path from "./Path.vue";
import Serialize from "@/helper/serialize";
import { typeLists as renameTypeLists, TypeLists as RenameType } from "@/helper/nameConvert";
import util from "./util";
import { getDisplayName } from "@/helper/code";
import { jsonrepair } from "jsonrepair";
import { ComponentSizeType } from "@/types";
import ToObject from "./toObject/ToObject.vue";
import { languages as toObjectLangLists, getOption as getToObjectOption } from "./toObject";

const action = useAction(
    await initialize<actionType>(
        {
            input: "",
            tabs: "common",
            expand_type: "",
            option: {
                info: {
                    line: true,
                },
                schema: {
                    exp: "",
                    option: {},
                },
                path: {
                    type: "json_path",
                    json_path: "",
                    jmes_path: "",
                },
                tab: 4,
                from: createSerializeInput("csv"),
                to: createSerializeOutput("xml"),
                to_object: getToObjectOption(""),
            },
        },
        { paste: false },
    ),
);

let toObjectOpen = $ref(false);

const size: ComponentSizeType = "default";

// 布局
const layoutStyle = $computed(() => {
    const css: StyleValue = {};
    if (["from", "object", "to", "path", "json_schema"].includes(action.current.expand_type)) {
        css.display = "grid";
        css.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
        css.columnGap = "5px";
    }
    return css;
});

const general = {
    tabs(tab: TabsType) {
        action.current.option.tab = tab;
        this.beautify();
    },
    getInput(code?: string) {
        return (code || action.current.input).trim();
    },
    // 美化
    async beautify(code?: string, copy = true) {
        action.current.input = await util.beautify(this.getInput(code), { tab: action.current.option.tab });
        if (!copy) {
            return action.save();
        }
        action.success({ copy_text: action.current.input });
    },
    // 美化
    async compress() {
        action.current.input = await util.compress(this.getInput());
        action.success({ copy_text: action.current.input });
    },
    // 重命名
    rename(type: RenameType) {
        const code = this.getInput();
        if (code === "") {
            return;
        }
        this.beautify(Json.stringify(util.rename(Json.parse(code), type)));
    },
    // 排序
    sort(type: "asc" | "desc") {
        const code = this.getInput();
        if (code === "") {
            return;
        }
        this.beautify(Json.stringify(util[type === "asc" ? "sortAsc" : "sortDesc"](Json.parse(code))));
    },
    unicode2zh() {
        const code = this.getInput();
        if (code !== "") {
            action.current.input = util.unicode2zh(code);
            action.success({ copy_text: action.current.input });
        }
    },
    zh2unicode() {
        const code = this.getInput();
        if (code !== "") {
            action.current.input = util.zh2unicode(code);
            action.success({ copy_text: action.current.input });
        }
    },
    escape() {
        const code = this.getInput();
        if (code !== "") {
            action.current.input = util.escape(code);
            action.success({ copy_text: action.current.input });
        }
    },
    clearEscape() {
        const code = this.getInput();
        if (code !== "") {
            action.current.input = util.clearEscape(code);
            action.success({ copy_text: action.current.input });
        }
    },
    repair() {
        const code = this.getInput();
        if (code !== "") {
            this.beautify(jsonrepair(code));
        }
    },
};

// 来自
watch(
    () => action.current.option.from.serialization,
    serialization => {
        if (serialization.isEmpty() || action.current.expand_type !== "from") {
            return;
        }
        if (serialization.isError()) {
            action.current.input = serialization.error();
            return;
        }
        general.beautify(serialization.toJson(), false);
    },
    { immediate: true, deep: true },
);

const inputSerialize: Serialize = $computed(() => {
    try {
        const code = action.current.input.trim();
        if (code === "") {
            return Serialize.empty();
        }
        return Serialize.formJson(code);
    } catch (e) {
        return Serialize.fromError($error(e));
    }
});

// 切换
const toggleObject = lang => {
    action.current.option.to_object.lang = lang;
    toObjectOpen = true;
};
const toggleFrom = item => {
    action.current.option.from.value = "";
    action.current.option.from.type = item;
};
const toggleTo = item => {
    action.current.option.to.type = item;
};
const togglePath = item => {
    action.current.option.path.type = item;
};
const setExpandType = value => {
    if (value !== "" && action.current.expand_type === value) {
        action.current.expand_type = "";
        return;
    }
    action.current.expand_type = value;
};
watch(
    () => action.current.tabs,
    tabs => {
        setExpandType(["from", "to", "path"].includes(tabs) ? tabs : "");
    },
);
</script>
