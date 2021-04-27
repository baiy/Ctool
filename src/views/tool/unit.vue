<template>
  <div>
    <option-block style="text-align: center">
      <FormItem>
        <ButtonGroup>
          <Button :type="current.type === v.key ? 'info' : 'primary'"
                  @click="handle(v.key)"
                  v-for="v in unitLists"
                  style="padding: 5px 10px 6px;"
                  :key="v.key">{{v.name}}
          </Button>
        </ButtonGroup>
      </FormItem>
    </option-block>
    <option-block style="text-align: center">
      <FormItem>
        <Input v-model="current.input" type="number"></Input>
      </FormItem>
      <FormItem>
        <Select v-model="current.from" style="width:200px">
          <template v-if="unitGroup[0].name !== ''">
            <OptionGroup :label="group.name" v-for="(group,gk) in unitGroup" :key="gk">
              <Option v-for="(unit,k) in group.list" :value="unit" :key="k">{{ unitFormat(unit) }}</Option>
            </OptionGroup>
          </template>
          <template v-else>
            <Option v-for="(unit,k) in unitGroup[0].list" :value="unit" :key="k">{{ unitFormat(unit) }}</Option>
          </template>
        </Select>
      </FormItem>
      <FormItem>
        <Button icon="md-code-working" @click="exchange()"></Button>
      </FormItem>
      <FormItem>
        <Select v-model="current.to" style="width:200px">
          <Option value="all">全部</Option>
          <template v-if="unitGroup[0].name !== ''">
            <OptionGroup :label="group.name" v-for="(group,gk) in unitGroup" :key="gk">
              <Option v-for="(unit,k) in group.list" :value="unit" :key="k">{{ unitFormat(unit) }}</Option>
            </OptionGroup>
          </template>
          <template v-else>
            <Option v-for="(unit,k) in unitGroup[0].list" :value="unit" :key="k">
              {{ unitFormat(unit) }}
            </Option>
          </template>
        </Select>
      </FormItem>
    </option-block>
    <div v-if="isShowResult" style="padding: 0 30px">
      <template v-if="current.to !== 'all' && assignResult">
        <div style="text-align: center;margin-top: 30px;font-size: 18px;font-weight: bold">
          <span style="color: red">{{current.input}}</span> {{unitFormat(current.from)}} = <span style="color: red">{{assignResult.num}}</span>
          {{unitFormat(current.to)}}
        </div>
      </template>
      <CellGroup v-if="current.to === 'all'">
        <Row :gutter="16">
          <Col span="12" v-for="(item,k) in result" :key="k">
            <Cell :title="item.num" :extra="unitFormat(item.unit)"/>
          </Col>
        </Row>
      </CellGroup>
    </div>
  </div>
</template>
<script>
    import U from './library/unit'

    export default {
        created () {
            let history = this.$getToolData()
            this.current.type = history['type'] ? history['type'] : 'temperature'
            this.getToolData()
        },
        computed: {
            unitGroup () {
                return U.getData(this.current.type).group
            },
            isShowResult () {
                return this.current.from && this.current.type && this.current.input
            },
            result () {
                let r = []
                if (this.isShowResult) {
                    this.saveToolData()
                    this.unitGroup.forEach((Group) => {
                        Group.list.forEach((unit) => {
                            let temp = U.calc(
                                this.current.type,
                                this.current.input,
                                this.current.from.split('_')[0],
                                unit.split('_')[0]
                            )
                            r.push({
                                unit: unit,
                                num: temp.num,
                            })
                        })
                    })
                }
                return r
            },
            assignResult () {
                if (this.current.to === 'all') {
                    return {}
                }
                let unit = this.current.to
                for (let i = 0; i < this.result.length; i++) {
                    if (this.result[i].unit === unit) {
                        return this.result[i]
                    }
                }
                console.log(this.result)
                console.log(unit)
                console.error('无对应数据')
                return null
            }
        },
        methods: {
            handle (v) {
                this.current.type = v
                this.getToolData()
            },
            saveToolData () {
                let history = this.$getToolData()
                history.type = this.current.type
                history.data = history.data ? history.data : {}
                history.data[history.type] = {
                    from: this.current.from,
                    to: this.current.to,
                    input: this.current.input,
                }
                this.$saveToolData(history)
            },
            getToolData () {
                let type = this.current.type
                let history = this.$getToolData()
                let unitHistory = history['data'] && history['data'][type] ? history['data'][type] : null
                this.current.from = unitHistory ? unitHistory.from : ''
                this.current.to = unitHistory ? unitHistory.to : 'all'
                this.current.input = unitHistory ? unitHistory.input : ''
            },
            unitFormat (unit) {
                return unit.split('_').join('')
            },
            exchange () {
                if (this.current.to === 'all') {
                    return
                }
                if (!this.current.from || !this.current.to) {
                    return
                }

                let temp = this.current.from
                this.current.from = this.current.to
                this.current.to = temp
            }
        },
        data () {
            return {
                current: {
                    type: '',
                    from: '',
                    to: '',
                    input: '',
                },
                unitLists: U.list,
            }
        },
    }
</script>