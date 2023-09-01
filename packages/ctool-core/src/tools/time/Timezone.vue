<template>
    <Align direction="vertical">
        <Display position="right-center" v-for="i of range(0, 7)">
            <Input
                v-model="outputInstance[`output${i}`].value"
                :placeholder="$t('time_timezone_input_placeholder')"
                :size="size"
            />
            <template #extra>
                <Align>
                    <Select
                        v-model="action.current.timezone[i]"
                        :options="timezoneOptions"
                        :size="'small'"
                        :disabled="isValid && action.current.timezone[i] === action.current.type"
                    />
                    <Button
                        v-if="isValid"
                        :text="$t(`main_ui_copy`)"
                        @click="$copy(outputInstance[`output${i}`].value)"
                        :size="'small'"
                        :type="'primary'"
                    />
                </Align>
            </template>
        </Display>
        <Button :size="size" v-if="!isValid" :text="$t(`time_current_time`)" @click="setCurrent" />
        <div v-row="`1-100px`" v-else>
            <Button :size="size" @click="isMore = true" :text="$t(`main_ui_more`)" />
            <Button :size="size" @click="action.current.input = ``" :text="$t(`main_ui_clear`)" />
        </div>
    </Align>
    <ExtendPage v-model="isMore">
        <Align direction="vertical">
            <Display
                v-for="item in timezoneOptions"
                position="right-center"
                :text="item['label']"
                :type="item['value'] === action.current.type ? `danger` : `general`"
                @click="() => $copy(convert(action.current.input, action.current.type, item['value']))"
            >
                <Input :model-value="convert(action.current.input, action.current.type, item['value'])" :size="size" />
            </Display>
        </Align>
    </ExtendPage>
</template>

<script lang="ts" setup>
import { initialize, useAction } from "@/store/action";
import { range } from "lodash";
import { watch, computed } from "vue";
import { ComponentSizeType } from "@/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { timezoneOptions } from "./util/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const size: ComponentSizeType = "large";
const defaultTimezoneLists = [
    "Asia/Shanghai",
    "Europe/London",
    "Asia/Tokyo",
    "America/Chicago",
    "Europe/Berlin",
    "Africa/Cairo",
    "Asia/Calcutta",
];

const check = (value: string) => {
    return (
        new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/).test(value.trim()) ||
        new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d+$/).test(value.trim())
    );
};

const action = useAction(
    await initialize(
        {
            type: "",
            input: "",
            timezone: [...new Set([dayjs.tz.guess(), ...defaultTimezoneLists])].slice(0, 7),
        },
        { paste: false },
    ),
);
let isMore = $ref(false);

const getHandle = (target: string) => {
    if (!action.current.type || action.current.input.trim() === "") {
        return "";
    }
    if (action.current.type === target) {
        return action.current.input;
    }
    try {
        if (!isValid) {
            throw new Error($t("time_error_format"));
        }
        return convert(action.current.input, action.current.type, target);
    } catch (e) {
        return $error(e);
    }
};

const setHandle = (source: string, value: string) => {
    action.current.input = value;
    action.current.type = source;
};

watch(
    () => action.current,
    current => {
        if (!check(current.input) || current.type === "") {
            return;
        }
        action.save();
    },
    { immediate: true, deep: true },
);

const isValid = $computed(() => {
    return check(action.current.input.trim());
});

const convert = (input: string, source: string, target: string) => {
    const isMillisecond = input.includes(".");
    if (isMillisecond) {
        return dayjs.tz(dayjs.tz(input, source), target).format("YYYY-MM-DD HH:mm:ss.SSS");
    }
    return dayjs.tz(dayjs.tz(input, source), target).format("YYYY-MM-DD HH:mm:ss");
};

const setCurrent = () => {
    action.current.type = action.current.timezone[0];
    action.current.input = dayjs.tz(dayjs(), action.current.type).format("YYYY-MM-DD HH:mm:ss");
};

const output0 = computed({
    get: () => {
        return getHandle(action.current.timezone[0]);
    },
    set: value => {
        return setHandle(action.current.timezone[0], value);
    },
});

const output1 = computed({
    get: () => {
        return getHandle(action.current.timezone[1]);
    },
    set: value => {
        return setHandle(action.current.timezone[1], value);
    },
});

const output2 = computed({
    get: () => {
        return getHandle(action.current.timezone[2]);
    },
    set: value => {
        return setHandle(action.current.timezone[2], value);
    },
});

const output3 = computed({
    get: () => {
        return getHandle(action.current.timezone[3]);
    },
    set: value => {
        return setHandle(action.current.timezone[3], value);
    },
});

const output4 = computed({
    get: () => {
        return getHandle(action.current.timezone[4]);
    },
    set: value => {
        return setHandle(action.current.timezone[4], value);
    },
});

const output5 = computed({
    get: () => {
        return getHandle(action.current.timezone[5]);
    },
    set: value => {
        return setHandle(action.current.timezone[5], value);
    },
});

const output6 = computed({
    get: () => {
        return getHandle(action.current.timezone[6]);
    },
    set: value => {
        return setHandle(action.current.timezone[6], value);
    },
});

const outputInstance = {
    output0,
    output1,
    output2,
    output3,
    output4,
    output5,
    output6,
};
</script>
