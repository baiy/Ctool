<template>
    <div>
        <div style="border: 1px solid #dcdee2; border-radius: 4px">
            <diffEditor ref="editor" :collapse="current.collapse" v-model="current.diff" :language="current.language"
                        :auto-height="220"/>
        </div>
        <option-block>
            <FormItem>
                <ButtonGroup>
                    <Button
                        :type="current.language !== item ? 'primary' : 'warning'"
                        @click="setLanguage(item)"
                        v-for="item in buttonLang"
                        :key="item"
                    >{{ item }}
                    </Button>
                </ButtonGroup>
            </FormItem>
            <FormItem>
                <Select placeholder="更多语言" @on-change="(value)=>{setLanguage(value)}">
                    <Option v-for="item in allLang" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.collapse">折叠相同</Checkbox>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import diffEditor from "./components/diffEditor";
import {allLang} from "./library/editor";
import _ from "lodash";

const COMMON_LANG = [
    "text",
    "html",
    "js",
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
            return allLang
        },
        buttonLang() {
            let data = _.cloneDeep(COMMON_LANG);
            if (this.current.language && !data.includes(this.current.language)) {
                data.push(this.current.language)
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
        }
    },
    watch: {
        current: {
            handler(newVal) {
                if (newVal.diff.original && newVal.diff.modified) {
                    this.$saveToolData(this.current);
                }
            },
            deep: true
        }
    },
    data() {
        return {
            current: {
                diff: {original: "", modified: ""},
                language: "text",
                collapse: false
            }
        }
    }
}
</script>
