<template>
    <Align class="ctool-page-option" :bottom="'default'" direction="vertical" horizontal="center">
        <Radio
            v-model="action.current.type"
            :options="config.map((item) => {
                    return {value: item.key, label: $t('unit_' + item.key)}
                })"
        />
        <Align>
            <InputNumber
                :label="$t(`main_ui_input`)"
                :min="false"
                :width="170"
                center
                v-model="action.current.input"
            />
            <Select :options="units" v-model="action.current.from" />
            <Button text="<->" :disabled="action.current.to === `all`" @click="exchange" />
            <Select :options="[{value:`all`,label:$t('unit_all')},...units]" v-model="action.current.to" />
        </Align>
    </Align>
    <HeightResize v-slot="{height}" :append="['.ctool-page-option']">
        <Card :height="height">
            <div class="ctool-unit-all" v-if="action.current.to === 'all'">
                <div v-for="item of result" @click="$copy(item.value)"><span>{{ item.value }}</span><span>{{ item.name
                    }}</span></div>
            </div>
            <Align horizontal="center" vertical="center" v-else>
                <div class="ctool-unit-simple">
                    <Align>
                        <span class="ctool-unit-simple-value"
                              @click="$copy(`${action.current.input}`)">{{ action.current.input }}</span>
                        <span class="ctool-unit-simple-title">{{ currentUnitName }}</span>
                        <span style="font-size: 1.5rem;padding: 0 .6rem">=</span>
                        <span class="ctool-unit-simple-value" @click="$copy(simple.value)">{{ simple.value }}</span>
                        <span class="ctool-unit-simple-title">{{ simple.name }}</span>
                    </Align>
                </div>
            </Align>
        </Card>
    </HeightResize>
</template>

<script lang="ts" setup>
import { config, getType, getUnit, getGroupByUnit, calculate } from "./util";
import { initialize, useAction } from "@/store/action";
import { SelectOption } from "@/types";
import { watch } from "vue";

const action = useAction(await initialize({
    type: "length",
    from: "m",
    to: "all",
    input: 1,
}, {
    paste: (str) => /^[0-9.]+$/.test(str),
}));

const unitName = (key: string, type: string, group: string) => {
    return `${group ? `${$t("unit_" + group)} - ` : ""}${$t(`unit_${type}_${key}`)} (${getUnit(type, key).unit})`;
};

const currentUnitName = $computed(() => {
    return unitName(action.current.from, action.current.type, getGroupByUnit(action.current.type, action.current.from));
});

const getUnits = (type: string) => {
    let lists: SelectOption = [];
    getType(type).group.forEach(group => {
        group.list.forEach(unit => {
            lists.push({ value: unit, label: `${unitName(unit, type, group.key)}` });
        });
    });
    return lists;
};

let units = $ref<SelectOption>(getUnits(action.current.type));

const result = $computed(() => {
    let lists: { name: string, value: string, key: string }[] = [];
    for (let unit of getType(action.current.type).unit) {
        lists.push({
            key: unit.key,
            value: calculate(action.current.type, `${action.current.input}`, action.current.from, unit.key),
            name: unitName(unit.key, action.current.type, getGroupByUnit(action.current.type, unit.key)),
        });
    }
    return lists;
});

const simple = $computed(() => {
    for (let item of result) {
        if (action.current.to === item.key) {
            return item;
        }
    }
    throw $error("null");
});

watch(() => action.current.type, (type) => {
    action.current.from = getType(type).main;
    action.current.to = "all";
    units = getUnits(type);
});

watch(() => action.current, (current) => {
    if (!current.input) {
        return;
    }
    action.save();
}, { immediate: true, deep: true });

const exchange = () => {
    if (action.current.to === "all") {
        return;
    }
    [action.current.from, action.current.to] = [action.current.to, action.current.from];
};
</script>
<style>
.ctool-unit-all {
    display: grid;
    grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
    width: 100%;
    font-size: .875rem;
}

.ctool-unit-all > div {
    cursor: pointer;
    padding: 7px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ctool-unit-all > div:hover {
    background-color: var(--primary-focus);
}

.ctool-unit-all > div > span:last-child {
    color: var(--ctool-placeholder-text-color);
    font-size: .75rem;
}

.ctool-unit-simple-value {
    font-size: 2rem;
    font-weight: 500;
    cursor: pointer;
    color: #ed4014;
}

.ctool-unit-simple-title {
    font-size: 1.2rem;
    color: var(--ctool-placeholder-text-color);
}
</style>
