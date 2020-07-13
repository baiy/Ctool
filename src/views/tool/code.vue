<template>
  <div>
    <div style="border: 1px solid #dcdee2;border-radius: 4px;">
      <codemirror ref="code" v-model="current.content" :options="options"></codemirror>
    </div>
    <option-block>
      <FormItem>
        <ButtonGroup>
          <Button type="primary" @click="handle(k,v)" v-for="(v,k) in lang" :key="k">{{k}}</Button>
        </ButtonGroup>
      </FormItem>
      <FormItem>
        <Checkbox v-model="current.isCompress">压缩</Checkbox>
      </FormItem>
    </option-block>
  </div>
</template>
<script>
    import { codemirror } from 'vue-codemirror'
    import formatter from 'code-formatter'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/htmlmixed/htmlmixed.js'
    import 'codemirror/mode/css/css.js'
    import 'codemirror/mode/xml/xml.js'
    import 'codemirror/mode/sql/sql.js'
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
        mounted () {
            this.codemirror.setSize(null, 385)
            if (this.current.lang) {
                this.codemirror.setOption('mode', this.options[this.current.lang])
            }
        },
        computed: {
            codemirror () {
                return this.$refs.code.codemirror
            },
        },
        methods: {
            handle (lang, mode) {
                if (this.current.content) {
                    this.current.content = formatter(this.current.content, {
                        method: this.current.isCompress ? lang+"min" : lang
                    })
                    this.codemirror.setOption('mode', mode)
                    this.current.lang = lang
                    this.$saveToolData(this.current)
                }
            },
        },
        data () {
            return {
                current: {
                    content: '',
                    lang: '',
                    isCompress: false,
                },
                options: {
                    mode: null,
                    lineNumbers: true,
                    lineWrapping: false,
                    foldGutter: true,
                    indentUnit: 4,
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                },
                lang: {
                    'js': 'text/javascript',
                    'html': 'text/html',
                    'css': 'text/css',
                    'xml': 'application/xml',
                    'sql': 'text/x-mysql',
                },
            }
        },
    }
</script>