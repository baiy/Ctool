<template>
    <div>
        <Tabs v-model="operation">
            <TabPane label="转换" name="convent">
                <option-block>
                    <Input v-model="current.data.dec" placeholder="多个字符用空格分隔">
                        <div slot="prepend" style="width: 100px"><strong>十进制</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.hex" placeholder="多个字符用空格分隔">
                        <div slot="prepend" style="width: 100px"><strong>十六进制</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.oct" placeholder="多个字符用空格分隔">
                        <div slot="prepend" style="width: 100px"><strong>八进制</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.bin" placeholder="多个字符用空格分隔">
                        <div slot="prepend" style="width: 100px"><strong>二进制</strong></div>
                    </Input>
                </option-block>
                <option-block>
                    <Input v-model="current.data.str">
                        <div slot="prepend" style="width: 100px"><strong>字符串</strong></div>
                    </Input>
                </option-block>
                <option-block :style="{textAlign:'center'}">
                    <FormItem>
                        <ButtonGroup>
                            <Button type="primary" @click="handle()" style="margin-right: 5px">转换</Button>
                            <Button type="primary" @click="clear()">清空</Button>
                        </ButtonGroup>
                    </FormItem>
                </option-block>
            </TabPane>
            <TabPane label="编码表" name="reader">
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
                    show:isShow ? "是" : "否",
                    explain:isShow ? ob.str() : ascii.ascii_hidden[ascii.ascii_map[index]]
                })
            }
            return lists;
        },
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData())
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
                    throw "请输入对应的待转换编码"
                }
            } catch (err) {
                return this.$Message.error("转换异常:" + err);
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
                    title: '十进制',
                    key: 'dec',
                    width:100
                },
                {
                    title: '十六进制',
                    key: 'hex',
                    width:100
                },
                {
                    title: '八进制',
                    key: 'oct',
                    width:100
                },
                {
                    title: '二进制',
                    key: 'bin',
                },
                {
                    title: '字符',
                    key: 'str',
                    width:100
                },
                {
                    title: '是否可见',
                    key: 'show',
                    width:100
                },
                {
                    title: '字符说明',
                    key: 'explain',
                }
            ],
        }
    }
}
</script>