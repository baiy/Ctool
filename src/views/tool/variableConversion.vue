<template>
    <div>
        <Row :gutter="10">
            <Col span="6" style="margin-top: 10px">
                <Card :padding="0">
                    <p slot="title">输入变量名</p>
                    <template slot="extra">
                        <Button size="small" type="primary" @click="handle()">转换
                        </Button>
                    </template>
                    <Input v-model="current.input" :rows="4" type="textarea" placeholder="变量名 一行一个"></Input>
                </Card>
            </Col>
            <Col span="6" v-for="(item,key) in resultColumns" :key="key" style="margin-top: 10px">
                <Card :padding="0">
                    <p slot="title">{{ item.title }}</p>
                    <Input v-model="current.output[item.key]" :rows="4" type="textarea"></Input>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import varCamelCase from "./library/varCamelCase"

export default {
    computed: {
        resultColumns() {
            return varCamelCase.resultKey.map((item) => {
                return {
                    title: item.name,
                    key: item.key
                }
            });
        },
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    methods: {
        handle() {
            if (!this.current.input) {
                return;
            }
            this.current.output = varCamelCase.convent(this.current.input)
            this.$saveToolData(this.current);
        }
    },
    data() {
        return {
            current: {
                input: "",
                output: [],
            }
        }
    },
}
</script>