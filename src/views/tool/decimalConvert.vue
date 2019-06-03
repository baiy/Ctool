<template>
    <div style="padding: 0 70px">
        <option-block>
            <Input v-model="current.input" placeholder="请输入待转换数字">
                <div slot="prepend" style="width: 70px"><strong>转换数字</strong></div>
                <Select v-model="current.decimal" slot="append" style="width:100px">
                    <Option v-for="v in type" :value="v" :key="v">{{ v }} 进制</Option>
                </Select>
            </Input>
        </option-block>
        <option-block v-for="n in [1,2,3,4,5,6]" :key="n">
            <Input v-model="current['resultOutput'+n]">
                <div slot="prepend" style="width: 70px">转换结果{{n}}</div>
                <Select slot="append" v-model="current['resultDecimal'+n]" style="width:100px">
                    <Option v-for="v in type" :value="v" :key="v">{{ v }} 进制</Option>
                </Select>
            </Input>
        </option-block>
        <option-block>
            <Input v-model="current.alphabet">
                <div slot="prepend" style="width: 70px">64位字母表</div>
                <Button slot="append" @click="current.alphabet=alphabet" :disabled="current.alphabet===alphabet">恢复默认</Button>
            </Input>
        </option-block>
    </div>
</template>
<script>
    import Radix from 'radix.js'
    const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@";
    export default {
        created() {
            this.current = Object.assign(this.current, this.$getToolData("input"))
        },
        watch: {
            convert: function (val) {
                if (val.alphabet.length !== 64){
                    return this.$Message.error("转换字母表必须是64位长度");
                }
                if (!val.input) {
                    return;
                }
                const radix = new Radix(val.alphabet);
                for (let n = 1; n <= 6; n++) {
                    this.current['resultOutput'+n] = radix.convent(val.input, val.decimal, val['resultDecimal'+n])
                }
                this.$saveToolData(this.current);
            },
        },
        computed: {
            convert() {
                return {
                    input: this.current.input,
                    decimal: this.current.decimal,
                    alphabet: this.current.alphabet,
                    resultDecimal1: this.current.resultDecimal1,
                    resultDecimal2: this.current.resultDecimal2,
                    resultDecimal3: this.current.resultDecimal3,
                    resultDecimal4: this.current.resultDecimal4,
                    resultDecimal5: this.current.resultDecimal5,
                    resultDecimal6: this.current.resultDecimal6,
                };
            },
            type(){
                let type = [];
                for (let i = 2; i <= 64; i++) {
                    type.push(i);
                }
                return type
            }
        },
        methods: {
        },
        data() {
            return {
                current: {
                    input: "",
                    decimal: 10,
                    resultOutput1: "",
                    resultDecimal1: 2,
                    resultOutput2: "",
                    resultDecimal2: 8,
                    resultOutput3: "",
                    resultDecimal3: 16,
                    resultOutput4: "",
                    resultDecimal4: 32,
                    resultOutput5: "",
                    resultDecimal5: 60,
                    resultOutput6: "",
                    resultDecimal6: 64,
                    alphabet: alphabet,
                },
                alphabet:alphabet
            }
        },
    }
</script>
