<template>
    <Align direction="vertical">
        <Align direction="vertical">
            <Display position="right-center" v-for="item of action.current.map">
                <Input v-model="dataInstance[`${item}`].value"
                       :placeholder="$t(`zhNumber_input_placeholder`,[$t(`zhNumber_${item}`)])" size="large" />
                <template #extra>
                    <Button
                        :text="$t(`zhNumber_${item}`)"
                        @click="copy(`${item}`)"
                        :size="'small'"
                        :type="'primary'"
                    />
                </template>
            </Display>
        </Align>
        <Align horizontal="center">
            <Bool border :label="$t(`zhNumber_traditional`)" v-model="action.current.traditional" />
        </Align>
    </Align>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { computed } from "vue";
import { convert, convertType, ConvertType } from "./util.ts";

const action = useAction(await initialize({
    type: "",
    input: "",
    traditional: false,
    map: convertType,
}, { paste: false }));

const getHandle = (target: ConvertType) => {
    if (action.current.type === "" || action.current.input === "") {
        return "";
    }
    if (action.current.type === target) {
        return action.current.input;
    }
    try {
        return `${convert(
            action.current.input,
            action.current.type as ConvertType,
            target,
            action.current.traditional,
        )}`;
    } catch (e) {
        return $error(e);
    }
};

const computedObject = (source: ConvertType) => {
    return {
        get: () => {
            return getHandle(source);
        },
        set: (value: string) => {
            return setHandle(source, value);
        },
    };
};

const setHandle = (source: ConvertType, value: string) => {
    action.current.input = `${value}`;
    action.current.type = source;
    if (action.current.input !== "") {
        action.save();
    }
};


const numberData = computed(computedObject("number"));

const lowerData = computed(computedObject("lower"));

const upperData = computed(computedObject("upper"));

const moneyData = computed(computedObject("money"));

const dataInstance = {
    number: numberData,
    lower: lowerData,
    upper: upperData,
    money: moneyData,
};

const copy = (source: ConvertType) => {
    $copy(dataInstance[source].value);
};

</script>
