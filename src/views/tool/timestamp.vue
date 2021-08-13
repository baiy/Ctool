<template>
  <div>
    <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容(标准时间(YYYY-MM-DD HH:mm:ss[.SSS])/时间戳(秒/毫秒))"></Input>
    <option-block>
      <FormItem>
          <Button type="primary" @click="handle()">转换</Button>
          <Dropdown style="margin-left: 10px" @on-click="currentTime">
            <Button type="primary">
              当前时间
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="normalSecond">标准时间(秒)</DropdownItem>
              <DropdownItem name="normalMillisecond">标准时间(毫秒)</DropdownItem>
              <DropdownItem name="unixSecond">UNIX时间戳(秒)</DropdownItem>
              <DropdownItem name="unixMillisecond">UNIX时间戳(毫秒)</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </FormItem>
    </option-block>
    <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
  </div>
</template>
<script>
    import moment from 'moment'

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
                }(this.current.input.trim())
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
                this.$clipboardCopy(this.current.output)
                this.$saveToolData(this.current)
            },
            currentTime (type) {
                if(type === "normalSecond"){
                    this.current.input = moment().format('YYYY-MM-DD HH:mm:ss')
                }
                else if(type === "normalMillisecond"){
                    this.current.input = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
                }
                else if(type === "unixSecond"){
                    this.current.input = moment().format('X')
                }
                else{
                    this.current.input = moment().format('x')
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