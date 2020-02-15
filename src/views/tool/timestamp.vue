<template>
  <div>
    <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容(标准时间(YYYY-MM-DD HH:mm:s[.SSS])/时间戳(秒/毫秒))"></Input>
    <option-block>
      <FormItem>
        <ButtonGroup>
          <Button type="primary" @click="handle()">转换</Button>
          <Button type="primary" @click="currentTime('second')">当前时间(秒)</Button>
          <Button type="primary" @click="currentTime('millisecond')">当前时间(毫秒)</Button>
        </ButtonGroup>
      </FormItem>
    </option-block>
    <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
  </div>
</template>
<script>
    import moment from 'moment'
    import { trim } from '../../helper'

    let inputType = {
        'normalSecond': 1,
        'normalMillisecond': 2,
        'unixSecond': 3,
        'unixMillisecond': 4,
        'error': 0,
    }

    export default {
        created () {
            this.current = Object.assign(this.current, this.$getToolData('input'))
        },
        methods: {
            handle () {
                let type = function (input) {
                    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+$/)).test(input)) {
                        return inputType.normalSecond
                    }
                    if ((new RegExp(/^\d+-\d+-\d+ \d+:\d+:\d+\.\d+$/)).test(input)) {
                        return inputType.normalMillisecond
                    }
                    if ((new RegExp(/^\d{10}$/)).test(input)) {
                        return inputType.unixSecond
                    }
                    if ((new RegExp(/^\d{13}$/)).test(input)) {
                        return inputType.unixMillisecond
                    }
                    return inputType.error
                }(trim(this.current.input))
                if (type === inputType.error) {
                    return this.$Message.error('输入时间格式错误')
                }
                switch (type) {
                    case inputType.normalSecond:
                        this.current.output = moment(this.current.input).format('X')
                        break
                    case inputType.normalMillisecond:
                        this.current.output = moment(this.current.input).format('x')
                        break
                    case inputType.unixSecond:
                        this.current.output = moment(parseInt(this.current.input)*1000).format('YYYY-MM-DD HH:mm:ss')
                        break
                    case inputType.unixMillisecond:
                        this.current.output = moment(parseInt(this.current.input)).format('YYYY-MM-DD HH:mm:ss.SSS')
                        break
                }
                console.log(type)
                this.$clipboardCopy(this.current.output)
                this.$saveToolData(this.current)
            },
            currentTime (type) {
                if(type === "second"){
                    this.current.input = moment().format('YYYY-MM-DD HH:mm:ss')
                }
                else{
                    this.current.input = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
                }
                this.handle();
            },
        },
        data () {
            return {
                current: {
                    input: '',
                    output: '',
                },
            }
        },
    }
</script>