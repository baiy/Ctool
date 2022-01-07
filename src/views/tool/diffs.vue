<template>
    <div>
        <heightResize :append="['.page-option-block']">
            <div style="border: 1px solid #dcdee2; border-radius: 4px;height: 100%;">
                <diff-editor ref="editor" :collapse="current.collapse" v-model="current.diff"
                             :language="current.language"/>
            </div>
        </heightResize>
        <option-block class="page-option-block">
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
                <Select :placeholder="$t('diffs_more')" @on-change="(value)=>{setLanguage(value)}">
                    <Option v-for="item in allLang" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" size="small" @click="format">{{ $t('diffs_beautify') }}</Button>
            </FormItem>
            <FormItem>
                <Checkbox v-model="current.collapse">{{ $t('diffs_collapse') }}</Checkbox>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import diffEditor from "./components/diffEditor";
import {allLang} from "./library/editor";
import _ from "lodash";
import heightResize from "./components/heightResize";
import {format} from "./library/formatter";

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
        heightResize
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
        this.$initToolData()
    },
    methods: {
        setLanguage(lang) {
            this.current.language = lang;
        },
        format() {
            try{
                this.current.diff.original = format(this.current.diff.original,this.current.language)
                this.current.diff.modified = format(this.current.diff.modified,this.current.language)
            } catch (e) {
                this.$Message.error(e.message)
            }
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
