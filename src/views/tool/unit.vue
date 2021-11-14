<template>
    <div>
        <option-block style="text-align: center">
            <FormItem>
                <RadioGroup v-model="type" type="button" button-style="solid">
                    <Radio :style="radioGroupStyle" :label="v.key" v-for="v in categories" :key="v.key">{{ v.name }}
                    </Radio>
                </RadioGroup>
            </FormItem>
        </option-block>
        <option-block style="text-align: center">
            <FormItem>
                <Input v-model="current.input" type="number"></Input>
            </FormItem>
            <FormItem>
                <Select v-model="current.from" style="width:200px">
                    <template v-if="groups.length > 1">
                        <OptionGroup :label="group.name" v-for="group in groups" :key="group.key">
                            <Option v-for="unit in group.list" :value="unit" :key="unit">{{ unitName(unit) }}</Option>
                        </OptionGroup>
                    </template>
                    <template v-else>
                        <Option v-for="unit in groups[0].list" :value="unit" :key="unit">{{ unitName(unit) }}</Option>
                    </template>
                </Select>
            </FormItem>
            <FormItem>
                <Button icon="md-code-working" @click="exchange()"></Button>
            </FormItem>
            <FormItem>
                <Select v-model="current.to" style="width:200px">
                    <Option value="all">{{ $t('unit_all') }}</Option>
                    <template v-if="groups.length > 1">
                        <OptionGroup :label="group.name" v-for="group in groups" :key="group.key">
                            <Option v-for="unit in group.list" :value="unit" :key="unit">{{ unitName(unit) }}</Option>
                        </OptionGroup>
                    </template>
                    <template v-else>
                        <Option v-for="unit in groups[0].list" :value="unit" :key="unit">{{ unitName(unit) }}</Option>
                    </template>
                </Select>
            </FormItem>
        </option-block>
        <div v-if="isShowResult" style="padding: 0 30px">
            <template v-if="assignResult !== null">
                <div style="text-align: center;margin-top: 30px;font-size: 18px;font-weight: bold">
                    <span style="color: red">{{ current.input }}</span> {{ unitName(current.from) }} = <span
                    style="color: red">{{ assignResult }}</span>
                    {{ unitName(current.to) }}
                </div>
            </template>
            <CellGroup v-if="current.to === 'all'">
                <Row :gutter="16">
                    <Col span="12" v-for="(result,unitKey) in output" :key="unitKey">
                        <Cell :title="result" :extra="unitName(unitKey)"/>
                    </Col>
                </Row>
            </CellGroup>
        </div>
    </div>
</template>
<script>
import U from './library/unit'
import {getCurrentLocale} from "../../i18n";

export default {
    created() {
        let history = this.$getToolData()
        this.type = this.current.type = history['type'] ? history['type'] : 'temperature'
        this.getToolData(this.type)
    },
    computed: {
        radioGroupStyle() {
            return getCurrentLocale() === "en" ? "padding: 0 5px" : "padding: 0 10px";
        },
        categories() {
            return U.CONFIG.map((category) => {
                return {name: category.name, key: category.key}
            })
        },
        groups() {
            return U.getCategory(this.current.type).group
        },
        isShowResult() {
            return this.current.from && this.current.type && this.current.input
        },
        output() {
            let result = {}
            if (this.isShowResult) {
                this.saveToolData()
                for (let unit of U.getCategory(this.current.type).unit) {
                    result[unit.key] = U.calculate(
                        this.current.type,
                        this.current.input,
                        this.current.from,
                        unit.key
                    )
                }
            }
            return result
        },
        assignResult() {
            if (this.current.to !== 'all') {
                if (this.current.to in this.output) {
                    return this.output[this.current.to]
                }
            }
            return null
        }
    },
    watch:{
        type(value){
            this.handle(value)
        }
    },
    methods: {
        handle(v) {
            this.getToolData(v)
        },
        saveToolData() {
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
        getToolData(type) {
            let history = this.$getToolData()
            let unitHistory = history['data'] && history['data'][type] ? history['data'][type] : null
            this.current = Object.assign(this.current, {
                from : unitHistory ? unitHistory.from : U.getCategory(type).main,
                to : unitHistory ? unitHistory.to : 'all',
                input : unitHistory ? unitHistory.input : '',
                type : type
            })
        },
        exchange() {
            if (this.current.to === 'all') {
                return
            }
            if (!this.current.from || !this.current.to) {
                return
            }
            [this.current.from, this.current.to] = [this.current.to, this.current.from]
        },
        unitName(unitKey) {
            let unit = U.getUnit(this.current.type, unitKey)
            return `${unit.name} (${unit['unit']})`
        }
    },
    data() {
        return {
            current: {
                type: '',
                from: '',
                to: '',
                input: '',
            },
            type:"",
        }
    },
}
</script>
