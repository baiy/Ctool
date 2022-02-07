import CodeMirror from 'codemirror';
import "codemirror/lib/codemirror.css";
import 'codemirror/addon/fold/foldcode'
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";
import 'codemirror/addon/merge/merge'
import 'codemirror/addon/merge/merge.css'
import "codemirror/addon/display/placeholder";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/ruby/ruby.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/go/go.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/dart/dart.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/yaml/yaml.js";
import 'codemirror-graphql/mode';
import DiffMatchPatch from 'diff-match-patch'

if (!("diff_match_patch" in window)) {
    window["diff_match_patch"] = DiffMatchPatch
    window['DIFF_DELETE'] = -1
    window['DIFF_INSERT'] = 1
    window['DIFF_EQUAL'] = 0
}

const modes = {
    text: "text/plain",
    json: "application/json",
    js: "application/javascript",
    html: "text/html",
    xml: "application/xml",
    css: "text/css",
    less: "text/x-less",
    scss: "text/x-scss",
    graphql: "graphql",
    java: "text/x-java",
    ruby: "text/x-ruby",
    markdown: "text/x-markdown",
    php: "text/x-php",
    python: "text/x-python",
    sql: "text/x-sql",
    yaml: "text/x-yaml",
    ts: "application/typescript",
    csharp: "text/x-csharp",
    go: "text/x-go",
    dart: "application/dart",
    vue: "text/x-vue",
};

const modeConversion = (lang) => {
    return lang && (lang in modes) ? modes[lang] : 'text/plain'
}

export const allLang = Object.keys(modes)

export const create = (container, lang, option = {}) => {
    let editor = CodeMirror(container,
        Object.assign({
            lineNumbers: true,
            lineWrapping: true,
            matchBrackets: true,
            foldGutter: true,
            smartIndent: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        }, option, {mode: modeConversion(lang)})
    );
    editor['customSetEditorLanguage'] = (lang) => {
        editor.setOption("mode", modeConversion(lang));
    }
    return editor
}

export const createMerge = (data, container, lang, option = {}) => {
    let {original, modified} = data
    let editor = CodeMirror.MergeView(container,
        Object.assign(
            {
                mode: "application/javascript",
                value: original,
                orig: modified,
                connect: 'align',
                allowEditingOriginals: true,
                lineNumbers: true,
            },
            option,
            {mode: modeConversion(lang)}
        )
    );

    editor['customSetEditorLanguage'] = (lang) => {
        editor.edit.setOption("mode", modeConversion(lang))
        editor.right.orig.setOption("mode", modeConversion(lang))
    }

    editor['customSetValue'] = (value) => {
        let {original, modified} = value
        if (editor.edit.getValue() !== original || editor.right.orig.getValue() !== modified) {
            editor.edit.setValue(original)
            editor.right.orig.setValue(modified)
        }
    }
    editor['customChange'] = (callback) => {
        editor.edit.on('change', () => {
            callback && callback(editor.edit.getValue(), editor.right.orig.getValue())
        })
        editor.right.orig.on('change', () => {
            callback && callback(editor.edit.getValue(), editor.right.orig.getValue())
        })
    }
    return editor
}
