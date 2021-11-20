<template>
    <div>
        <div class="page-option-block">
            <Row :gutter="16">
                <Col span="8">
                    <Input v-model="current.length" type="number">
                        <div slot="prepend" style="width: 70px">{{ $t('randomString_length') }}</div>
                    </Input>
                </Col>
                <Col span="8">
                    <Input v-model="current.amount" type="number">
                        <div slot="prepend" style="width: 70px">{{ $t('randomString_amount') }}</div>
                    </Input>
                </Col>
                <Col span="8">
                    <Input v-model="current.delimiter">
                        <div slot="prepend" style="width: 70px">{{ $t('randomString_delimiter') }}</div>
                    </Input>
                </Col>
            </Row>
            <option-block>
                <FormItem>
                    <Checkbox v-model="current.isDigital">{{ $t('randomString_digital') }}</Checkbox>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="current.isLowercase">{{ $t('randomString_lowercase') }}</Checkbox>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="current.isUppercase">{{ $t('randomString_uppercase') }}</Checkbox>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="current.isSymbol">{{ $t('randomString_symbol') }}</Checkbox>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="current.isUnique">{{ $t('randomString_unique') }}</Checkbox>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="current.isAddQuote">{{ $t('randomString_add_quote') }}</Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handle()">{{ $t('randomString_generate') }}</Button>
                </FormItem>
            </option-block>
        </div>
        <heightResize :append="['.page-option-block']">
            <autoHeightTextarea :value="current.output" :placeholder="$t('randomString_output')" />
        </heightResize>
    </div>
</template>
<script>
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
        if (!this.current.output){
            this.handle()
        }
    },
    methods: {
        handle() {
            let chars = "";
            if (this.current.isDigital) chars += "0123456789";
            if (this.current.isLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
            if (this.current.isUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (this.current.isSymbol) chars += "`~!@#$%^&*()-_=+[{]}|;:',<.>/?";
            let randomStringLists = [];
            for (let i = 0, l = this.current.amount; i < l; i++) {
                let _chars = chars.split(""),
                    random_string = "";
                for (let j = 0, k = this.current.length; j < k; j++) {
                    if (_chars.length < 1) break;
                    let index = Math.floor(Math.random() * _chars.length);
                    random_string += _chars[index];
                    if (this.current.isUnique) _chars.splice(index, 1);
                }
                randomStringLists.push(this.current.isAddQuote ? '"'+random_string+'"' : random_string);
            }
            this.current.output = randomStringLists.join(this.current.delimiter.replace(/\\n/, "\n"));
            this.$saveToolData(this.current);
        }
    },
    data() {
        return {
            current: {
                length: 8,
                amount: 10,
                delimiter: ",\\n",
                isDigital: true,
                isLowercase: true,
                isUppercase: true,
                isSymbol: false,
                isUnique: true,
                isAddQuote: false,
                output: "",
            }
        }
    },
}
</script>
