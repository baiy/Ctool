<template>
    <Align direction="vertical">
        <Card :title="$t(`time_diff_tool`)">
            <Align>
                <Input center v-model="action.current.poor.input1" :width="170"/>
                <span>与</span>
                <Input center v-model="action.current.poor.input2" :width="170"/>
                <span>相差</span>
                <InputNumber center :model-value="poor" :width="160">
                    <template #append>
                        <Select v-model="action.current.poor.unit" :options="unit.map(({value,label})=>{return {value,label}})"/>
                    </template>
                </InputNumber>
            </Align>
        </Card>
        <Card :title="$t(`time_operation`)">
            <Align>
                <Input center v-model="action.current.operation.input" :width="170"/>
                <Select v-model="action.current.operation.type" :options="[
                            {value: '+', label: $t('time_add')},
                            {value: '-', label: $t('time_reduce')},
                        ]"
                />
                <InputNumber center v-model="action.current.operation.length" :width="160">
                    <template #append>
                        <Select v-model="action.current.operation.unit" :options="unit.map(({value,label})=>{return {value,label}})"/>
                    </template>
                </InputNumber>
                <span>{{ $t('time_after') }}, {{ $t('time_is') }} <Button @click="$copy(operation)" :type="'dotted'" :text="operation"/></span>
            </Align>
        </Card>
        <Card :title="$t(`time_analyze`)">
            <Align>
                <Input center v-model="action.current.analyze.input" :width="170"/>
                <Select v-model="action.current.analyze.type" :options="[
                            {value: 'year', label: $t('time_analyze_year')},
                            {value: 'quarter', label: $t('time_analyze_quarter')},
                            {value: 'month', label: $t('time_analyze_month')},
                        ]"
                />
                <Button @click="$copy(analyze)" :type="'dotted'" :text="analyze"/>
            </Align>
        </Card>
    </Align>
</template>

<script lang="ts" setup>
import {initialize, useAction} from "@/store/action";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import {watch} from "vue";

dayjs.extend(quarterOfYear)
dayjs.extend(dayOfYear)
dayjs.extend(isoWeek)

const current = dayjs()
const action = useAction(await initialize({
    poor: {
        input1: current.format('YYYY-MM-DD HH:mm:ss'),
        input2: current.add(1, 'd').format('YYYY-MM-DD HH:mm:ss'),
        unit: 'seconds',
    },
    operation: {
        input: current.format('YYYY-MM-DD HH:mm:ss'),
        unit: 'days',
        type: '+',
        length: 1,
    },
    analyze: {
        type: "year",
        input: current.format('YYYY-MM-DD HH:mm:ss')
    }
}))

const unit = [
    {value: 'years', label: $t('time_year'), rate: 0},
    {value: 'months', label: $t('time_month'), rate: 0},
    {value: 'weeks', label: $t('time_week'), rate: 1000 * 60 * 60 * 24 * 7},
    {value: 'days', label: $t('time_day'), rate: 1000 * 60 * 60 * 24},
    {value: 'hours', label: $t('time_hour'), rate: 1000 * 60 * 60},
    {value: 'minutes', label: $t('time_minute'), rate: 1000 * 60},
    {value: 'seconds', label: $t('time_second'), rate: 1000}
]

const getRate = (value) => {
    for (let item of unit) {
        if (item.value === value) {
            return item.rate
        }
    }
    return 0;
}

const poor = $computed(() => {
    return dayjs(action.current.poor.input2).diff(dayjs(action.current.poor.input1), action.current.poor.unit as any)
})

const operation = $computed(() => {
    if (!action.current.operation.length) {
        return "";
    }
    let rate = getRate(action.current.operation.unit)
    if (rate === 0) {
        const type = action.current.operation.type === '+' ? 'add' : 'subtract'
        return dayjs(action.current.operation.input)[type](action.current.operation.length, action.current.operation.unit as any).format('YYYY-MM-DD HH:mm:ss')
    }
    return dayjs(
        dayjs(action.current.operation.input).unix() * 1000
        + (rate * action.current.operation.length) * (action.current.operation.type === '+' ? 1 : -1)
    ).format('YYYY-MM-DD HH:mm:ss');
})

const analyze = $computed(() => {
    let input = dayjs(action.current.analyze.input)
    const year = input.year();
    const quarter = input.quarter();
    if (action.current.analyze.type === "quarter") {
        const quarterDate = dayjs(`${input.year()}-${(quarter - 1) * 3 + 1}-01`);
        const weekOfQuarter = Math.ceil((input.unix() - quarterDate.unix()) / (86400 * 7));
        const dayOfQuarter = Math.ceil((input.unix() - quarterDate.unix()) / 86400);
        const hourOfQuarter = Math.ceil((input.unix() - quarterDate.unix()) / 3600);
        const minuteOfQuarter = Math.ceil((input.unix() - quarterDate.unix()) / 60);
        const secondOfQuarter = input.unix() - quarterDate.unix();
        return $t('time_analyze_quarter_output', {
            quarter,
            weekOfQuarter,
            dayOfQuarter,
            hourOfQuarter,
            minuteOfQuarter,
            secondOfQuarter
        });

    }
    if (action.current.analyze.type === "month") {
        const month = input.month() + 1
        const monthDate = dayjs(`${input.year()}-${month}-01`);
        const weekOfMonth = Math.ceil((input.unix() - monthDate.unix()) / (86400 * 7));
        const hourOfMonth = Math.ceil((input.unix() - monthDate.unix()) / 3600);
        const minuteOfMonth = Math.ceil((input.unix() - monthDate.unix()) / 60);
        const secondOfMonth = input.unix() - monthDate.unix();
        return $t('time_analyze_month_output', {
            month,
            weekOfMonth,
            hourOfMonth,
            minuteOfMonth,
            secondOfMonth
        });
    }
    const yearDate = dayjs(input.year() + '-01-01');
    const weekOfYear = input.isoWeek();
    const dayOfYear = input.dayOfYear();
    const hourOfYear = Math.ceil((input.unix() - yearDate.unix()) / 3600);
    const minuteOfYear = Math.ceil((input.unix() - yearDate.unix()) / 60);
    const secondOfYear = input.unix() - yearDate.unix();
    return $t('time_analyze_year_output', {
        year,
        quarter,
        weekOfYear,
        dayOfYear,
        hourOfYear,
        minuteOfYear,
        secondOfYear
    });
})
watch(() => action.current, () => {
    action.save()
}, {immediate: true, deep: true})
</script>
