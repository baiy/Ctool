<template>
    <div>
        <heightResize :append="['.page-option-block']">
            <code-editor ref="editor" showLineWrappingSet="no" v-model="current.content" :language="this.current.lang"></code-editor>
        </heightResize>
        <option-block class="page-option-block">
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
                <Select :placeholder="$t('code_more')" @on-change="(value)=>{handle(value)}">
                    <Option v-for="item in lang" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select :placeholder="$t('code_indent')" v-model="current.tab">
                    <Option :value="2">{{ $t('code_indent_width',[2]) }}</Option>
                    <Option :value="4">{{ $t('code_indent_width',[4]) }}</Option>
                    <Option :value="6">{{ $t('code_indent_width',[6]) }}</Option>
                    <Option :value="8">{{ $t('code_indent_width',[8]) }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.isCompress">{{ $t('code_compress') }}</Checkbox>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import _ from "lodash";
import codeEditor from "./components/codeEditor";
import heightResize from "./components/heightResize";
export default {
    components: {
        codeEditor,
        heightResize
    },
    computed: {
        buttonLang() {
            let data = _.slice(this.lang, 0, 7)
            if (this.current.lang && !data.includes(this.current.lang)) {
                data.push(this.current.lang)
            }
            return data
        }
    },
    watch:{
        "current.isCompress"(){
            if (this.current.lang){
                this.handle(this.current.lang)
            }
        }
    },
    created() {
        this.$initToolData('content')
    },
    methods: {
        handle(language) {
            if (this.current.content) {
                try {
                    this.current.lang = language;
                    if (!this.current.isCompress) {
                        let option = {tab: this.current.tab}
                        this.$refs.editor.format(language, option);
                    } else {
                        this.$refs.editor.compress(language);
                    }
                    this.$saveToolData(this.current);
                    return this.$Message.success(this.$t('code_complete').toString());
                } catch (e) {
                    console.log(e)
                    return this.$Modal.error({
                        title: this.$t('code_error_prompt').toString(),
                        content: `${e.message}`
                    });
                }
            }
        },
        isCompressChange(value){
            if (this.current.lang){
                console.log(value)
                this.handle(this.current.lang)
            }
        }
    },
    data() {
        return {
            current: {
                content: "",
                isCompress: false,
                lang: "",
                tab: 4,
            },
            lang: [
                "html",
                "js",
                "css",
                "xml",
                "json",
                "sql",
                "yaml",
                "php",
                "ts",
                "java",
                "scss",
                "less",
                "graphql",
                "markdown",
                "vue",
                "angular",
            ],
        };
    },
};
</script>
