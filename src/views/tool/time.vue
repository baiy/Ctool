<template>
    <div>
        <Tabs name="default">
            <TabPane :label="$t('time_diff_tool')" name="default">
                <option-block>
                    <FormItem>
                        <DatePicker transfer v-model="current.poor.input1" :options="options" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                    </FormItem>
                    <FormItem>
                        {{ $t('time_and') }}
                    </FormItem>
                    <FormItem>
                        <DatePicker transfer v-model="current.poor.input2" :options="options" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                    </FormItem>
                    <FormItem>
                        {{ $t('time_diff') }}
                    </FormItem>
                    <FormItem>
                        <Input v-model="poor">
                            <Select transfer v-model="current.poor.unit" slot="append" style="width: 80px">
                                <Option v-for="v in poorUnit" :value="v.v" :key="v.v">{{ v.n }}</Option>
                            </Select>
                        </Input>
                    </FormItem>
                </option-block>
            </TabPane>
        </Tabs>

        <Tabs name="default">
            <TabPane :label="$t('time_operation')" name="default">
                <option-block>
                    <FormItem>
                        <DatePicker transfer v-model="current.duration.input" :options="options" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Select transfer v-model="current.duration.type" style="width: 100px">
                            <Option value="+">{{ $t('time_add') }}</Option>
                            <Option value="-">{{ $t('time_reduce') }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Input v-model="current.duration.length" type="number" number>
                            <Select transfer v-model="current.duration.unit" slot="append" style="width: 80px">
                                <Option v-for="v in poorUnit" :value="v.v" :key="v.v">{{ v.n }}</Option>
                            </Select>
                        </Input>
                    </FormItem>
                    <FormItem>
                        {{ $t('time_after')}}, {{ $t('time_is') }} <strong>{{ duration }}</strong>
                    </FormItem>
                </option-block>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    created() {
        this.$initToolData()
    },
    computed: {
        poor() {
            let a = moment(this.current.poor.input1)
            let b = moment(this.current.poor.input2)
            this.$saveToolData(this.current)
            return b.diff(a, this.current.poor.unit)
        },
        duration() {
            if (!this.current.duration.length){
                return "";
            }
            let rate = this.getRate(this.current.duration.unit)
            let result;
            if (rate === 0) {
                if (!Number.isInteger(this.current.duration.length)){
                    return this.$t('time_error',[this.$t('time_error_duration_length')])
                }
                const type = this.current.duration.type === '+' ? 'add' : 'subtract'
                result = moment(this.current.duration.input)[type](this.current.duration.length, this.current.duration.unit)
            } else {
                result = moment(
                    moment(this.current.duration.input).unix() * 1000
                    + (rate * this.current.duration.length) * (this.current.duration.type === '+' ? 1 : -1)
                )
            }
            this.$saveToolData(this.current)
            return result.format('YYYY-MM-DD HH:mm:ss');
        },
    },
    methods: {
        getRate(unit) {
            for (let item of this.poorUnit) {
                if (item.v === unit) {
                    return parseInt(item.rate)
                }
            }
            return 0;
        }
    },
    data() {
        return {
            options: {
                shortcuts: [
                    {
                        text: this.$t('time_current_time'),
                        value() {
                            return moment().toDate()
                        },
                    },
                    {
                        text: this.$t('time_current_date'),
                        value() {
                            return moment(moment().format('YYYY-MM-DD')).toDate()
                        },
                    },
                    {
                        text: this.$t('time_current_month_date'),
                        value() {
                            return moment(moment().format('YYYY-MM-01')).toDate()
                        },
                    },
                    {
                        text: this.$t('time_current_year_date'),
                        value() {
                            return moment(moment().format('YYYY-01-01')).toDate()
                        },
                    },
                ],
            },
            poorUnit: [
                {v: 'years', n: this.$t('time_year'), rate: 0},
                {v: 'months', n: this.$t('time_month'), rate: 0},
                {v: 'weeks', n: this.$t('time_week'), rate: 1000 * 60 * 60 * 24 * 7},
                {v: 'days', n: this.$t('time_day'), rate: 1000 * 60 * 60 * 24},
                {v: 'hours', n: this.$t('time_hour'), rate: 1000 * 60 * 60},
                {v: 'minutes', n: this.$t('time_minute'), rate: 1000 * 60},
                {v: 'seconds', n: this.$t('time_second'), rate: 1000},
            ],
            current: {
                poor: {
                    input1: moment(moment().format('YYYY-MM-DD')).toDate(),
                    input2: moment(moment().format('YYYY-MM-DD')).add(1, 'd').toDate(),
                    unit: 'seconds',
                },
                duration: {
                    input: moment(moment().format('YYYY-MM-DD')).toDate(),
                    unit: 'days',
                    type: '+',
                    length: 1,
                },
            },
        }
    },
}
</script>
