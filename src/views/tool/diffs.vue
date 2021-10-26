<template>
    <div>
        <div style="border: 1px solid #dcdee2; border-radius: 4px">
            <diffEditor ref="editor" v-model="current.diff" :language="current.language" :auto-height="220" />
        </div>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button
                        :type="current.language !== item.id ? 'primary' : 'warning'"
                        @click="setLanguage(item.id)"
                        v-for="item in buttonLang"
                        :key="item.id"
                    >{{ item.name }}
                    </Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Select placeholder="更多语言" @on-change="(value)=>{setLanguage(value)}">
                    <Option v-for="item in allLang" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Checkbox @on-change="(value)=>inline(value)">行内对比</Checkbox>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import diffEditor from "./components/diffEditor";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

let allLang = {}
for (let lang of monaco.languages.getLanguages()) {
    allLang[lang.id] = {
        id: lang.id,
        name: lang.id === "plaintext" ? "纯文本" : lang.aliases[0]
    }
}

const COMMON_LANG = [
    "plaintext",
    "javascript",
    "html",
    "css",
    "json",
    "python",
    "java",
    "php"
]

export default {
    components: {
        diffEditor,
    },
    computed: {
        allLang() {
            return Object.values(allLang)
        },
        buttonLang() {
            let data = COMMON_LANG.map((item) => {
                return allLang[item]
            });
            if (this.current.language && !COMMON_LANG.includes(this.current.language)) {
                data.push(allLang[this.current.language])
            }
            return data;
        }
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData())
    },
    methods: {
        setLanguage(lang) {
            this.current.language = lang;
        },
        inline(value){
            this.$refs.editor.inline(!value)
        }
    },
    watch: {
        current:{
            handler(newVal){
                if (newVal.diff.original && newVal.diff.modified){
                    this.$saveToolData(this.current);
                }
            },
            deep:true
        }
    },
    data() {
        return {
            current: {
                diff: {original: "", modified: ""},
                language: ""
            }
        }
    }
}
</script>
