<template>
    <div>
        <heightResize :append="['.page-option-block']">
            <code-editor :placeholder="$t('json_input')" v-model="current.content" language="json"></code-editor>
        </heightResize>
        <option-block center class="page-option-block">
            <FormItem>
                <ButtonGroup class="tool-json-button">
                    <Button type="primary" @click="handle(k)" v-for="(v,k) in type" :key="k">{{ v }}</Button>
                </ButtonGroup>
            </FormItem>
        </option-block>
    </div>
</template>
<script>
import Unicode from "./library/unicode"
import jsonFormatter from "./library/formatter/json"
import codeEditor from "./components/codeEditor";
import heightResize from "./components/heightResize";
export default {
    components: {
        codeEditor,
        heightResize
    },
    created() {
        this.current = Object.assign(this.current, this.$getToolData('content'))
    },
    methods: {
        handle(v) {
            try {
                if (!this.current.content.trim()) {
                    throw new Error(this.$t('json_content_empty').toString())
                }
                // 保存操作前数据
                this.$saveToolData(this.current, true)
                this.operation(v)
                this.$clipboardCopy(this.current.content)
                this.$saveToolData(this.current)
            } catch (e) {
                return this.$Message.error(this.$t('json_error', [e.message]).toString())
            }
        },
        operation(type) {
            switch (type) {
                case 'format':
                    require('jsonlint').parse(this.current.content)
                    this.current.content = jsonFormatter.beautify(this.current.content)
                    break
                case 'compress':
                    this.current.content = jsonFormatter.compress(this.current.content)
                    break
                case 'escape':
                    this.current.content = this.current.content.trim().replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                    break
                case 'clearEscape':
                    this.current.content = this.current.content.trim().replace(/\\\\/g, '\\').replace(/\\"/g, '"')
                    break
                case 'unicode2zh':
                    this.current.content = this.unicode2zh(this.current.content)
                    break
                case 'zh2unicode':
                    this.current.content = this.zh2unicode(this.current.content)
                    break
                case 'get':
                    require('jsonlint').parse(this.current.content)
                    this.current.content = require('query-string').stringify(
                        JSON.parse(this.current.content), {arrayFormat: 'bracket'}
                    )
                    break
                case 'getToJson':
                    this.current.content = jsonFormatter.beautify(
                        JSON.stringify(require('query-string').parse(this.current.content.trim(), {arrayFormat: 'bracket'}))
                    )
                    break
                case 'clear':
                    this.current.content = ''
                    break
                default:
                    return
            }
        },
        unicode2zh(content) {
            return Unicode.decode(
                content.replace(/\\U[0-9a-fA-F]{4}/g, (item) => {
                    // \Uxxxx=>\uxxxx
                    return item.replace("\\U", "\\u");
                })
            )
        },
        zh2unicode(content) {
            if (content) {
                let newStr = ''
                for (let i = 0; i < content.length; i++) {
                    let str = content.charAt(i)
                    newStr += /[\u4e00-\u9fa5]/.test(str) ? '\\u' + str.charCodeAt(0).toString(16) : str
                }
                return newStr
            }
            return content
        }
    },
    data() {
        return {
            current: {
                content: '',
            },
            type: {
                'format': this.$t('json_format'),
                'compress': this.$t('json_compress'),
                'escape': this.$t('json_escape'),
                'clearEscape': this.$t('json_clear_escape'),
                'unicode2zh': this.$t('json_unicode_to_zh'),
                'zh2unicode': this.$t('json_zh_to_unicode'),
                'get': this.$t('json_to_get'),
                'getToJson': this.$t('json_get_to_json'),
                'clear': this.$t('json_clear'),
            },
        }
    },
}
</script>
<style scoped>
.tool-json-button .ivu-btn {
    padding: 0 10px;
}
</style>
