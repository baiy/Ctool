<template>
    <div>
        <Tabs v-model="operation">
            <TabPane label="输入代码" name="input">
                <Input v-model="current.input" :rows="14" type="textarea" placeholder="内容"></Input>
                <option-block>
                    <FormItem>
                        <ButtonGroup>
                            <Button type="primary" @click="handle(l)" v-for="l in lang" :key="l">{{l}}</Button>
                        </ButtonGroup>
                    </FormItem>
                </option-block>
            </TabPane>
            <TabPane :label="'格式化'+(current.lang ? '('+current.lang+')' : '')+''" name="output">
                <code-highlight :lang="current.lang" :code="this.current.output"></code-highlight>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import formatter from 'code-formatter' ;

    export default {
        created() {
            this.current = Object.assign(this.current, this.$getToolData("input"))
        },
        methods: {
            handle(v){
                if (this.current.input) {
                    this.current.output = formatter(this.current.input, {
                        method: v
                    });
                    this.current.lang = v;
                    this.$saveToolData(this.current);
                    this.operation = "output";
                }
            },
        },
        data() {
            return {
                current: {
                    input: "",
                    output: "",
                    lang: "",
                },
                lang: ["js", "html", "css", "json", "xml", "sql"],
                operation: "input"
            }
        },
    }
</script>