<template>
    <div>
        <Tabs v-model="current.operation">
            <TabPane label="对比内容" name="input">
                <Row :gutter="16">
                    <Col span="12">
                        <Input v-model="current.source" :rows="14" type="textarea" placeholder="内容"></Input>
                    </Col>
                    <Col span="12">
                        <Input v-model="current.target" :rows="14" type="textarea" placeholder="内容"></Input>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="对比结果" name="result">
                <RadioGroup v-model="current.type" type="button">
                    <Radio :label="k"  v-for="(v,k) in type" :key="k">
                        <span>{{v}}</span>
                    </Radio>
                </RadioGroup>
                <div class="diff-block">
                    <diff-block :diff="diff"></diff-block>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    const jsDiff = require('diff');
    export default {
        components: {
            "diff-block": {
                render: function (createElement) {
                    let e = [];
                    let diff = this.diff;

                    for (let i = 0; i < diff.length; i++) {
                        if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
                            let swap = diff[i];
                            diff[i] = diff[i + 1];
                            diff[i + 1] = swap;
                        }
                        if (diff[i].removed){
                            e.push(createElement(
                                'del',
                                diff[i].value
                            ))
                        }
                        else if(diff[i].added){
                            e.push(createElement(
                                'ins',
                                diff[i].value
                            ))
                        }
                        else{
                            e.push(diff[i].value)
                        }
                    }
                    return createElement(
                        'pre',
                        e
                    )
                },
                props: {
                    diff: {
                        type: Array,
                        default: []
                    }
                }
            },
        },
        computed: {
            diff() {
                let beginTime = new Date();
                console.log("开始对比"+this.current.type);
                let diff = jsDiff[this.current.type](this.current.source, this.current.target);
                this.$saveToolData(this.current);
                console.log("结束对比 用时:"+((new Date())-beginTime)+"ms "+this.current.type);
                return diff;
            }
        },
        created() {
            this.current = Object.assign(this.current, this.$getToolData())
        },
        methods: {
            // handle(type) {
            //     this.current.diff = JsDiff[type](this.current.source, this.current.target)
            //     this.current.operation = "result";
            //     this.$saveToolData(this.current);
            // },
        },
        data() {
            return {
                current: {
                    source: "",
                    target: "",
                    type: "diffLines",
                    operation: "input",
                },
                type: {
                    "diffLines": "行",
                    "diffWords": "单词",
                    "diffCss": "css",
                    "diffJson": "json",
                    "diffArrays": "js数组(性能不好)",
                    "diffChars": "字符(性能不好)",
                }
            }
        }
    }
</script>
<style>
    .diff-block del {
        text-decoration: none;
        color: #b30000;
        background: #fadad7;
    }
    .diff-block ins {
        background: #eaf2c2;
        color: #406619;
        text-decoration: none;
    }
    .diff-block pre{
        background: #f5f2f0;
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
    }
</style>