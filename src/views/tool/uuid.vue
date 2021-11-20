<template>
    <div>
        <option-block class="page-option-block">
            <FormItem style="width: 170px">
                <Input v-model="current.amount" type="number">
                    <div slot="prepend">{{ $t('uuid_amount') }}</div>
                    <Button slot="append" icon="md-refresh" @click="handle()"></Button>
                </Input>
            </FormItem>
            <FormItem style="width: 140px">
                <Input v-model="current.delimiter">
                    <div slot="prepend">{{ $t('uuid_delimiter') }}</div>
                </Input>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.hyphens">{{ $t('uuid_hyphens') }}</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUpper">{{ $t('uuid_is_upper') }}</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isAddQuote">{{ $t('uuid_is_add_quote') }}</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.uint8Array">{{ $t('uuid_uint8_array') }}</Checkbox>
            </FormItem>
        </option-block>
        <heightResize :append="['.page-option-block']">
            <autoHeightTextarea v-model="output" :placeholder="$t('uuid_output')" />
        </heightResize>
    </div>
</template>
<script>
import {parse as uuidParse, v4 as uuidV4} from 'uuid';
import heightResize from "./components/heightResize";
import autoHeightTextarea from "./components/autoHeightTextarea";
export default {
    components:{
        heightResize,
        autoHeightTextarea
    },
    created() {
        this.$initToolData()
    },
    mounted() {
        if (this.current.result.length < 1){
            this.handle()
        }
    },
    computed:{
        output(){
            if (this.current.result.length < 1){
                return "";
            }
            return this.current.result.map((item)=>{
                if (this.current.uint8Array) {
                    item = "[" + uuidParse(item).toString() + "]"
                }
                if (!this.current.hyphens) {
                    item = item.replace(/-/g, "")
                }
                item = this.current.isUpper ? item.toUpperCase() : item.toLowerCase()
                if (this.current.isAddQuote){
                    item = `"${item}"`
                }
                return item
            }).join(this.current.delimiter.replace(/\\n/g, "\n"));
        }
    },
    methods: {
        handle() {
            let result = [];
            for (let i = 0, l = this.current.amount; i < l; i++) {
                result.push(uuidV4());
            }
            this.current.result = result
            this.$saveToolData(this.current);
        }
    },
    data() {
        return {
            current: {
                amount: 10,
                delimiter: ",\\n",
                hyphens: true,
                isAddQuote: false,
                isUpper: false,
                uint8Array: false,
                result: []
            }
        }
    },
}
</script>
