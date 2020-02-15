<template>
  <div>
    <Tabs name="default">
      <TabPane label="差值计算器" name="default">
        <option-block>
          <FormItem>
            <DatePicker transfer v-model="current.poor.input1" :options="options" type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
          <FormItem>
            与
          </FormItem>
          <FormItem>
            <DatePicker transfer v-model="current.poor.input2" :options="options" type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
          <FormItem>
            相差
          </FormItem>
          <FormItem>
            <Input v-model="poor">
              <Select transfer v-model="current.poor.unit" slot="append" style="width: 60px">
                <Option v-for="v in poorUnit" :value="v.v" :v-key="v.v">{{v.n}}</Option>
              </Select>
            </Input>
          </FormItem>
        </option-block>
      </TabPane>
    </Tabs>

    <Tabs name="default">
      <TabPane label="时间操作" name="default">
        <option-block>
          <FormItem>
            <DatePicker transfer v-model="current.duration.input" :options="options" type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
          <FormItem>
            <Select transfer v-model="current.duration.type" style="width: 60px">
              <Option value="+">添加</Option>
              <Option value="-">减少</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input v-model="current.duration.length" type="number" number>
              <Select transfer v-model="current.duration.unit" slot="append" style="width: 60px">
                <Option v-for="v in poorUnit" :value="v.v" :v-key="v.v">{{v.n}}</Option>
              </Select>
            </Input>
          </FormItem>
          <FormItem>
            后, 为 <strong>{{duration}}</strong>
          </FormItem>
        </option-block>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
    import moment from 'moment'

    export default {
        created () {
            this.current = Object.assign(this.current, this.$getToolData())
        },
        computed: {
            poor () {
                let a = moment(this.current.poor.input1)
                let b = moment(this.current.poor.input2)
                this.$saveToolData(this.current)
                return b.diff(a, this.current.poor.unit)
            },
            duration () {
                this.$saveToolData(this.current)
                const type = this.current.duration.type === '+' ? 'add' : 'subtract'
                return moment(this.current.duration.input)[type](this.current.duration.length, this.current.duration.unit).
                    format('YYYY-MM-DD HH:mm:ss')
            },
        },
        data () {
            return {
                options: {
                    shortcuts: [
                        {
                            text: '当前时间',
                            value () {
                                return moment().toDate()
                            },
                        },
                        {
                            text: '当前日期',
                            value () {
                                return moment(moment().format('YYYY-MM-DD')).toDate()
                            },
                        },
                        {
                            text: '当月日期',
                            value () {
                                return moment(moment().format('YYYY-MM-01')).toDate()
                            },
                        },
                        {
                            text: '当年日期',
                            value () {
                                return moment(moment().format('YYYY-01-01')).toDate()
                            },
                        },
                    ],
                },
                poorUnit: [
                    { v: 'years', n: '年' },
                    { v: 'months', n: '月' },
                    { v: 'weeks', n: '周' },
                    { v: 'days', n: '天' },
                    { v: 'hours', n: '小时' },
                    { v: 'minutes', n: '分钟' },
                    { v: 'seconds', n: '秒' },
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