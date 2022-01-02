<template>
    <div style="padding: 0 70px">
        <option-block>
            <Input v-model="current.input" :placeholder="$t('decimalConvert_input_placeholder')">
                <div slot="prepend" style="width: 70px"><strong>{{ $t('decimalConvert_input') }}</strong></div>
                <Select v-model="current.decimal" slot="append" style="width:100px">
                    <OptionGroup :label="$t('decimalConvert_input_type_common')">
                        <Option v-for="v in type.common" :value="v" :key="v">{{
                                $t('decimalConvert_base', [v])
                            }}
                        </Option>
                    </OptionGroup>
                    <OptionGroup :label="$t('decimalConvert_input_type_other')">
                        <Option v-for="v in type.other" :value="v" :key="v">{{
                                $t('decimalConvert_base', [v])
                            }}
                        </Option>
                    </OptionGroup>
                </Select>
            </Input>
        </option-block>
        <option-block v-for="n in [1,2,3,4,5,6]" :key="n">
            <Input v-model="current['resultOutput'+n]" readonly>
                <div slot="prepend" style="width: 70px">{{ $t('decimalConvert_result', [n]) }}</div>
                <Select slot="append" v-model="current['resultDecimal'+n]" style="width:100px">
                    <OptionGroup :label="$t('decimalConvert_input_type_common')">
                        <Option v-for="v in type.common" :value="v" :key="v">{{
                                $t('decimalConvert_base', [v])
                            }}
                        </Option>
                    </OptionGroup>
                    <OptionGroup :label="$t('decimalConvert_input_type_other')">
                        <Option v-for="v in type.other" :value="v" :key="v">{{
                                $t('decimalConvert_base', [v])
                            }}
                        </Option>
                    </OptionGroup>
                </Select>
            </Input>
        </option-block>
        <option-block>
            <Input v-model="current.alphabet">
                <div slot="prepend">{{ $t('decimalConvert_alphabet') }}</div>
                <Button slot="append" @click="current.alphabet=alphabet" :disabled="current.alphabet===alphabet">
                    {{ $t('decimalConvert_reset') }}
                </Button>
            </Input>
        </option-block>
    </div>
</template>
<script>
import Radix from './library/radix.js'

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@";
export default {
    created() {
        this.$initToolData('input',(input,current)=>{
            try {
                const radix = new Radix(current.alphabet);
                radix.convent(input, current.decimal, 2, true)
            } catch (e) {
                return false;
            }
            return true
        })
    },
    watch: {
        convert: function (val) {
            if (val.alphabet.length !== 64) {
                for (let n = 1; n <= 6; n++) {
                    this.current['resultOutput' + n] = this.$t('decimalConvert_alphabet_length_error').toString()
                }
                return;
            }
            if (!val.input) {
                return;
            }
            const radix = new Radix(val.alphabet);
            let isError = false;
            for (let n = 1; n <= 6; n++) {
                try {
                    this.current['resultOutput' + n] = radix.convent(val.input, val.decimal, val['resultDecimal' + n], true)
                } catch (e) {
                    isError = true
                    this.current['resultOutput' + n] = e.toString()
                }
            }
            if (!isError){
                this.$saveToolData(this.current);
            }
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
        type() {
            let type = {
                common: [2, 8, 10, 16],
                other: []
            }
            for (let i = 2; i <= 64; i++) {
                type.common.includes(i) || type.other.push(i);
            }
            return type
        }
    },
    methods: {},
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
                resultDecimal3: 10,
                resultOutput4: "",
                resultDecimal4: 16,
                resultOutput5: "",
                resultDecimal5: 60,
                resultOutput6: "",
                resultDecimal6: 64,
                alphabet: alphabet,
            },
            alphabet: alphabet,
        }
    },
}
</script>
