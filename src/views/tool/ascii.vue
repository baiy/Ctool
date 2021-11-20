<template>
    <div>
        <Tabs v-model="operation">
            <TabPane :label="$t('ascii_convent')" name="convent">
                <option-block>
                    <Input v-model="current.data.dec" :placeholder="$t('ascii_input_prompt')">
                        <div slot="prepend" style="width: 100px"><strong>{{ $t('ascii_input_10') }}</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.hex" :placeholder="$t('ascii_input_prompt')">
                        <div slot="prepend" style="width: 100px"><strong>{{ $t('ascii_input_16') }}</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.oct" :placeholder="$t('ascii_input_prompt')">
                        <div slot="prepend" style="width: 100px"><strong>{{ $t('ascii_input_8') }}</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.bin" :placeholder="$t('ascii_input_prompt')">
                        <div slot="prepend" style="width: 100px"><strong>{{ $t('ascii_input_2') }}</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.str">
                        <div slot="prepend" style="width: 100px"><strong>{{ $t('ascii_input_string') }}</strong></div>
                    </Input>
                </option-block>
                <option-block :style="{textAlign:'center'}">
                    <FormItem>
                        <ButtonGroup>
                            <Button type="primary" @click="handle()" style="margin-right: 5px">{{ $t('ascii_convent') }}</Button>
                            <Button type="primary" @click="clear()">{{ $t('ascii_clear') }}</Button>
                        </ButtonGroup>
                    </FormItem>
                </option-block>
            </TabPane>
            <TabPane :label="$t('ascii_code_table')" name="reader">
                <Table :columns="referenceColumns" :data="reference">
                </Table>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import ascii from './library/ascii';

export default {
    computed: {
        reference() {
            let lists = [];
            for (let index=0; index < ascii.ascii_map.length; index++) {
                let ob = new ascii.Ascii(index,'dec')
                let isShow = !ascii.ascii_hidden.hasOwnProperty(ascii.ascii_map[index])
                lists.push({
                    dec:ob.dec(),
                    hex:ob.hex(),
                    oct:ob.oct(),
                    bin:ob.bin(),
                    str:ob.str(),
                    show:isShow ? this.$t('ascii_yes'): this.$t('ascii_no'),
                    explain:isShow ? ob.str() : ascii.ascii_hidden[ascii.ascii_map[index]]
                })
            }
            return lists;
        },
    },
    created() {
        this.$initToolData()
    },
    methods: {
        handle() {
            let s = "";
            let currentType = "";
            try {
                for (const type of this.types) {
                    if (this.current.data[type]) {
                        s = this.current.data[type]
                        currentType = type
                        break;
                    }
                }
                if (!s){
                    throw new Error(this.$t('ascii_input_null_prompt').toString())
                }
            } catch (err) {
                return this.$Message.error(
                    this.$t('ascii_convent_error',[err.message]).toString()
                );
            }
            for (const type of this.types) {
                this.current.data[type] = ascii.convent(s,currentType,type)
            }
            this.$saveToolData(this.current);
        },
        clear() {
            for (const type of this.types) {
                this.current.data[type] = ""
            }
        }
    },
    data() {
        return {
            types:['str', 'dec', 'hex', 'oct', 'bin'],
            current: {
                data: {
                    dec: "",
                    hex: "",
                    oct: "",
                    bin: "",
                    str: "",
                }
            },
            operation: "convent",
            referenceColumns: [
                {
                    title: this.$t('ascii_input_10'),
                    key: 'dec',
                    width:100
                },
                {
                    title: this.$t('ascii_input_16'),
                    key: 'hex',
                    width:100
                },
                {
                    title: this.$t('ascii_input_8'),
                    key: 'oct',
                    width:100
                },
                {
                    title: this.$t('ascii_input_2'),
                    key: 'bin',
                },
                {
                    title: this.$t('ascii_input_string'),
                    key: 'str',
                    width:100
                },
                {
                    title: this.$t('ascii_is_show'),
                    key: 'show',
                    width:100
                },
                {
                    title: this.$t('ascii_description'),
                    key: 'explain',
                }
            ],
        }
    }
}
</script>
