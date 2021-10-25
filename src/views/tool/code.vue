<template>
    <div>
        <div style="border: 1px solid #dcdee2; border-radius: 4px">
            <code-editor ref="editor" v-model="current.content" auto-height="220" :language="this.current.lang"></code-editor>
        </div>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button
                        :type="current.lang !== item ? 'primary' : 'error'"
                        @click="handle(item)"
                        v-for="item in buttonLang"
                        :key="item"
                    >{{ item }}
                    </Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Select placeholder="更多语言/格式" @on-change="(value)=>{handle(value)}">
                    <Option v-for="item in lang" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import _ from "lodash";
export default {
    computed:{
        buttonLang(){
            let data = _.slice(this.lang,0,8)
            if (this.current.lang && !data.includes(this.current.lang)){
                data.push(this.current.lang)
            }
            return data
        }
    },
    methods: {
        handle(language) {
            this.current.lang = language;
            setTimeout(()=>{
                if (this.current.content) {
                    let oldContent = this.current.content;
                    this.$refs.editor.getEditor().getAction('editor.action.formatDocument').run();
                    setTimeout(()=>{
                        if (oldContent !== this.current.content){
                            this.$saveToolData(this.current);
                            return this.$Message.success('格式化完成');
                        }
                    },300)
                }
            },200)
        },
    },
    data() {
        return {
            current: {
                content: "",
                lang: "",
            },
            lang: [
                "html",
                "json",
                "yaml",
                "php",
                "xml",
                "sql",
                "javascript",
                "css",
                "typescript",
                "java",
                "scss",
                "less",
                "graphql",
                "markdown",
            ],
        };
    },
};
</script>
