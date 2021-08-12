<template>
    <div>
        <option-block>
            <FormItem style="width: 140px">
                <Input v-model="current.amount">
                    <div slot="prepend">生成数量</div>
                </Input>
            </FormItem>
            <FormItem style="width: 140px">
                <Input v-model="current.delimiter">
                    <div slot="prepend">分隔符</div>
                </Input>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.filterLine">过滤中划线(-)</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUpper">大写</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isAddQuote">添加引号</Checkbox>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.uint8Array">Uint8 Array</Checkbox>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handle()">生成</Button>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="14" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>
import {parse as uuidParse, v4 as uuidV4} from 'uuid';

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData())
    },
    methods: {
        handle() {
            let result = [];
            for (let i = 0, l = this.current.amount; i < l; i++) {
                result.push(this.current.isAddQuote ? '"' + this.generate() + '"' : this.generate());
            }
            this.current.output = result.join(this.current.delimiter.replace(/\\n/g, "\n"));
            this.$saveToolData(this.current);
        },
        generate() {
            let uuid = uuidV4()
            if (this.current.uint8Array) {
                return "[" + uuidParse(uuid).toString() + "]"
            }
            if (this.current.filterLine) {
                uuid = uuid.replace(/-/g, "")
            }
            uuid = this.current.isUpper ? uuid.toUpperCase() : uuid.toLowerCase()
            return uuid;
        }
    },
    data() {
        return {
            current: {
                amount: 10,
                delimiter: ",\\n",
                filterLine: false,
                isAddQuote: false,
                isUpper: false,
                uint8Array: false,
                output: ""
            }
        }
    },
}
</script>