<template>
  <div>
    <div style="border: 1px solid #dcdee2;border-radius: 4px;">
      <codemirror ref="code" v-model="current.content" :options="options"></codemirror>
    </div>
    <option-block :style="{textAlign:'center'}">
      <FormItem>
        <ButtonGroup>
          <Button type="primary" @click="handle(k)" v-for="(v,k) in type" :key="k">{{v}}</Button>
        </ButtonGroup>
      </FormItem>
    </option-block>
  </div>
</template>
<script>
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/addon/fold/foldcode.js'
    import 'codemirror/addon/fold/foldgutter.js'
    import 'codemirror/addon/fold/brace-fold.js'
    import 'codemirror/addon/fold/comment-fold.js'
    import 'codemirror/addon/fold/foldgutter.css'

    export default {
        components: {
            codemirror,
        },
        created () {
            this.current = Object.assign(this.current, this.$getToolData('content'))
        },
        mounted(){
            this.codemirror.setSize(null, window.innerHeight - 200)
        },
        computed: {
            codemirror() {
                return this.$refs.code.codemirror
            }
        },
        methods: {
            handle (v) {
                if (this.current.content) {
                    switch (v) {
                        case 'format':
                            try {
                                let content = this.current.content.trim()
                                if (!content) {
                                    return this.$Notice.error({ title: '错误提示', desc: '请输入内容' })
                                }
                                require('jsonlint').parse(content)
                                this.current.content = JSON.stringify(JSON.parse(this.current.content), null, 4)
                            } catch (error) {
                                this.$Notice.error({
                                    title: '错误提示',
                                    desc: error.message,
                                })
                                return
                            }
                            break
                        case 'compress':
                            try {
                                this.current.content = JSON.stringify(JSON.parse(this.current.content.trim()))
                            } catch (e) {
                                this.current.content = this.current.content.replace(/\n/g, '').replace(/\r/g, '')
                            }
                            break
                        case 'escape':
                            this.current.content = this.current.content.trim().
                                replace(/\\/g, '\\\\').
                                replace(/"/g, '\\"')
                            break
                        case 'clearEscape':
                            this.current.content = this.current.content.trim().
                                replace(/\\\\/g, '\\').
                                replace(/\\"/g, '"')
                            break
                        case 'unicode2zh':
                            this.current.content = this.unicode2zh()
                            break
                        case 'zh2unicode':
                            this.current.content = this.zh2unicode()
                            break
                        case 'get':
                            try {
                                const httpBuildQuery = require('http-build-query');
                                let content = this.current.content.trim()
                                if (!content) {
                                    return
                                }
                                require('jsonlint').parse(content)
                                this.current.content = httpBuildQuery(JSON.parse(this.current.content))
                            } catch (error) {
                                this.$Notice.error({
                                    title: '错误提示',
                                    desc: error.message,
                                })
                                return
                            }
                            break
                        case 'clear':
                            this.current.content = ''
                            break
                        default:
                            return
                    }
                    this.$clipboardCopy(this.current.content)
                    this.$saveToolData(this.current)
                }
            },
            unicode2zh () {
                let content = this.current.content
                if (content) {
                    let newStr = ''
                    let t = 1
                    for (let i = 0; i < content.length; i += t) {
                        let str = content.charAt(i)
                        if (str === '\\' && 'u' === content.charAt(i + 1)) {
                            console.log(parseInt(parseInt(content.substr(i + 2, 4), 16).toString(10), 10))
                            newStr += String.fromCharCode(
                                parseInt(
                                    parseInt(content.substr(i + 2, 4), 16).toString(10),
                                    10
                                )
                            )
                            t = 6
                        } else {
                            t = 1
                            newStr += str
                        }
                    }
                    return newStr
                }
                return content
            },
            zh2unicode () {
                let content = this.current.content
                if (content) {
                    let newStr = ''
                    for (let i = 0; i < content.length; i++) {
                        let str = content.charAt(i)
                        newStr += /[\u4e00-\u9fa5]/.test(str) ? '\\u' + str.charCodeAt(0).toString(16) : str
                    }
                    return newStr
                }
                return content
            },
        },
        data () {
            return {
                current: {
                    content: '',
                },
                options: {
                    mode: 'application/json',
                    lineNumbers: true,
                    lineWrapping: false,
                    foldGutter: true,
                    indentUnit: 4,
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                },
                type: {
                    'format': '格式化/校验',
                    'compress': '压缩',
                    'escape': '转义',
                    'clearEscape': '去除转义',
                    'unicode2zh': 'Unicode转中文',
                    'zh2unicode': '中文转Unicode',
                    'get': '转GET参数',
                    'clear': '清空数据',
                },
            }
        },
    }
</script>