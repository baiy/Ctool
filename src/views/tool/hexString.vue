<template>
    <div>
        <Input v-model="current.input" :rows="7" type="textarea" placeholder="内容"></Input>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button type="primary" @click="handle('hex')">String -> Hex</Button>
                    <Button type="primary" @click="handle('str')">Hex -> String</Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isUppercase">大写字母</Checkbox>
            </FormItem>
        </option-block>
        <Input v-model="current.output" :rows="7" type="textarea" placeholder="结果"></Input>
    </div>
</template>
<script>

export default {
    created() {
        this.current = Object.assign(this.current, this.$getToolData("input"))
    },
    methods: {
        handle(type) {
            if (this.current.input) {
                const convert = (from, to) => str => Buffer.from(str, from).toString(to)
                switch (type) {
                    case "hex":
                        this.current.output = convert('utf8', 'hex')(this.current.input);
                        break;
                    case "str":
                        this.current.output = convert('hex', 'utf8')(this.current.input);
                        break;
                    default:
                        return;
                }
                if (this.current.isUppercase && type === "hex") {
                    this.current.output = this.current.output.toUpperCase()
                }
                this.current.operation = type;
                this.$clipboardCopy(this.current.output);
                this.$saveToolData(this.current);
            }
        }
    },
    data() {
        return {
            current: {
                input: "",
                isUppercase: false,
                output: "",
                operation: ""
            }
        }
    },
}
</script>