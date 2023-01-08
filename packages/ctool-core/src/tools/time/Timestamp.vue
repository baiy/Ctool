<template>
    <Align direction="vertical">
        <Select
            size="large"
            width="100%"
            :center="false"
            :label="$t('time_timezone')"
            v-model="action.current.timezone"
            :options="timezoneLists"
            @change="(value)=>action.current.timezone = value"
        />
        <Display position="right-center">
            <Input
                size="large"
                v-model="action.current.input"
                :label="$t('main_ui_input')"
                :placeholder="$t('time_timestamp_input_placeholder')"
            />
            <template #extra>
                <Align>
                    <Select
                        v-if="inputTimeType === Time.unix"
                        v-model="action.current.unix_type"
                        size="small"
                        :options="[
                        {
                            value:Time.unix,
                            label:`${$t('time_unix_auto')}:${unixInputType === Time.unix_second ? $t(`time_second`) : $t(`time_millisecond`)}`
                        },
                        {value:Time.unix_second,label:$t('time_unix_second')},
                        {value:Time.unix_millisecond,label:$t('time_unix_millisecond')},
                    ]"
                    />
                    <Button
                        v-if="action.current.input !== ''"
                        :text="$t(`main_ui_clear`)"
                        @click="action.current.input = ''"
                        size="small"
                    />
                </Align>
            </template>
        </Display>
        <div v-row="`1-1`">
            <Display position="right-center" :text="isValid ? $t(`main_ui_copy`) : ''" @click="()=>$copy(secondOutput)">
                <Input size="large" :model-value="secondOutput" :label="$t(`time_second`)"/>
            </Display>
            <Display position="right-center" :text="isValid ? $t(`main_ui_copy`) : ''" @click="()=>$copy(millisecondOutput)">
                <Input size="large" :model-value="millisecondOutput" :label="$t(`time_millisecond`)"/>
            </Display>
        </div>
        <div>
            <Table
                :columns="[
                        {title:$t(`time_format`),key:`format`},
                        {title:$t(`time_value`),key:`value`},
                    ]"
                :lists="example"
                :action-width="100"
                border
            >
                <template #column="{row}">
                    <td>{{ row.format }}</td>
                    <td>
                        <Link @click="$copy(row.value)">{{ row.value }}</Link>
                    </td>
                </template>
                <template #default="{row}">
                    <Button :text="$t(`main_ui_load`)" @click="()=>action.current.input = `${row.value}`" :size="'small'"/>
                </template>
            </Table>
        </div>
    </Align>
</template>

<script lang="ts" setup>
import {useAction, initialize} from "@/store/action";
import dayjs, {Dayjs, isDayjs} from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import {onUnmounted, watch} from "vue"
import zhTimezone from "./timezone/zh_CN.json";
import enTimezone from "./timezone/en_US.json";
import {SelectOption} from "@/types";

dayjs.extend(utc)
dayjs.extend(timezone)

enum Time {
    normal_second,
    normal_millisecond,
    unix,
    unix_second,
    unix_millisecond,
}

const action = useAction(await initialize({
        input: "",
        timezone: dayjs.tz.guess(),
        unix_type: Time.unix,
    },
    {
        paste: (str) => (new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/)).test(str) || (new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d+$/)).test(str) || (new RegExp(/^\d{5,}$/)).test(str)
    }
))

const inputTime = $computed(() => (action.current.input || "").trim())

const inputTimeType = $computed(() => {
    if (inputTime === "") {
        return false
    }
    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/)).test(inputTime)) {
        return Time.normal_second
    }
    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d+$/)).test(inputTime)) {
        return Time.normal_millisecond
    }
    if ((new RegExp(/^\d+$/)).test(inputTime)) {
        return Time.unix
    }
    return false
})

const unixInputType = $computed(() => {
    return (new RegExp(/^\d{1,12}$/)).test(inputTime) ? Time.unix_second : Time.unix_millisecond
})

const result = $computed(() => {
    try {
        if (inputTime === "") {
            return ""
        }
        if (inputTimeType === false) {
            throw new Error($t('time_error_format'))
        }
        let t: Dayjs;
        if (inputTimeType === Time.normal_second) {
            t = dayjs.tz(inputTime, action.current.timezone)
        } else if (inputTimeType === Time.normal_millisecond) {
            t = dayjs.tz(inputTime, action.current.timezone)
        } else {
            // 自动推断类型
            let unixType = action.current.unix_type === Time.unix ? unixInputType : action.current.unix_type
            if (unixType === Time.unix_second) {
                t = dayjs(parseInt(inputTime) * 1000).tz(action.current.timezone)
            } else {
                t = dayjs(parseInt(inputTime)).tz(action.current.timezone)
            }
        }
        if (!t.isValid()) {
            throw new Error($t('time_error_format'))
        }
        return t
    } catch (e) {
        return $error(e)
    }
})

const isValid = $computed(() => isDayjs(result))

const secondOutput = $computed(() => {
    if (!isDayjs(result)) {
        return result;
    }
    return inputTimeType !== Time.unix ? result.unix().toString() : result.format('YYYY-MM-DD HH:mm:ss')
})

const millisecondOutput = $computed(() => {
    if (!isDayjs(result)) {
        return result;
    }
    return inputTimeType !== Time.unix ? result.valueOf().toString() : result.format('YYYY-MM-DD HH:mm:ss.SSS')
})


watch(() => {
    return {
        data: action.current,
        is_valid: isValid
    }
}, ({is_valid}) => {
    if (is_valid) {
        action.save()
    }
}, {immediate: true, deep: true})

const timezoneLists: SelectOption = $computed(() => {
    const supported = Intl.supportedValuesOf("timeZone")
    return Object.entries($t('main_locale') === "zh_CN" ? zhTimezone : enTimezone).filter(([key]) => {
        return supported.includes(key)
    }).map(([key, value]) => {
        return {value: key, label: `${value}`}
    })
})

let current = $ref(dayjs().valueOf())
const currentTimer = setInterval(() => {
    current = dayjs().valueOf()
}, 100)
onUnmounted(() => {
    clearInterval(currentTimer);
})

const example = $computed(() => {
    const day = dayjs(current).tz(action.current.timezone)
    return [
        {format: $t('time_normal_second'), value: day.format('YYYY-MM-DD HH:mm:ss')},
        {format: $t('time_unix_second'), value: day.unix().toString()},
        {format: $t('time_normal_millisecond'), value: day.format('YYYY-MM-DD HH:mm:ss.SSS')},
        {format: $t('time_unix_millisecond'), value: day.valueOf().toString()},
    ]
})
</script>
