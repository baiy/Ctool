<template>
    <div>
        <div style="border: 1px solid #dcdee2; border-radius: 4px">
            <code-editor ref="editor" v-model="current.content" :auto-height="220" :language="this.current.lang"></code-editor>
        </div>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button
                        :type="current.lang !== item ? 'primary' : 'warning'"
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
import codeEditor from "./components/codeEditor";
export default {
    components: {
        codeEditor,
    },
    computed:{
        buttonLang(){
            let data = _.slice(this.lang,0,8)
            if (this.current.lang && !data.includes(this.current.lang)){
                data.push(this.current.lang)
            }
            return data
        }
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData("content"))
    },
    methods: {
        handle(language) {
            if (this.current.content) {
                try {
                    this.current.lang = language;
                    this.$refs.editor.format(language);
                    this.$saveToolData(this.current);
                    return this.$Message.success('格式化完成');
                }
                catch (e) {
                    return this.$Modal.error({
                        title:"格式化错误",
                        content:`${e.message}`
                    });
                }
            }
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
                "vue",
            ],
        };
    },
};
</script>
