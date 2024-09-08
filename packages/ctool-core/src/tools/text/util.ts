import { toSimplified, toTraditional } from "chinese-simple2traditional";
import { orderBy, uniq } from "lodash";
import { Buffer } from "buffer";
import { TypeLists as RenameType, convent as nameConvent } from "@/helper/nameConvert";
import { setupEnhance } from "chinese-simple2traditional/enhance";

setupEnhance();

const regExpQuote = function(str: string) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

// GBK字符集实际长度计算
const getGbkStrLength = (str: string) => {
    let realLength = 0;
    let len = str.length;
    let charCode = -1;
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        } else {
            realLength += 2;
        }
    }
    return realLength;
};


export const escapeChars = {
    backslash: {
        string: "\\\\",
        char: "\\",
    },
    single_quote: {
        string: "\\'",
        char: "\'",
    },
    double_quote: {
        string: "\\\"",
        char: "\"",
    },
    new_line: {
        string: "\\n",
        char: "\n",
    },
    carriage_return: {
        string: "\\r",
        char: "\r",
    },
    tab: {
        string: "\\t",
        char: "\t",
    },
    vertical_tab: {
        string: "\\v",
        char: "\v",
    },
    backspace: {
        string: "\\b",
        char: "\b",
    },
    form_feed: {
        string: "\\f",
        char: "\f",
    },
};

export type EscapeCharsType = keyof typeof escapeChars


export default class {
    private readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    // 大写
    upper() {
        return this.text.toUpperCase();
    }

    // 小写
    lower() {
        return this.text.toLowerCase();
    }

    // 行首大写
    upperLineStart() {
        return this.text.split(/\r?\n/).map((str) => {
            if (str.length < 1) {
                return "";
            }
            return str[0].toUpperCase() + str.substr(1);
        }).join("\n");
    }

    // 行首小写
    lowerLineStart() {
        return this.text.split(/\r?\n/).map((str) => {
            if (str.length < 1) {
                return "";
            }
            return str[0].toLowerCase() + str.substr(1);
        }).join("\n");
    }

    // 词首大写
    upperStart() {
        return this.text.replace(/\b\w/g, function(str) {
            return str.toUpperCase();
        });
    }

    // 词首小写
    lowerStart() {
        return this.text.replace(/\b\w/g, function(str) {
            return str.toLowerCase();
        });
    }

    // 简繁转换
    zhTran({ type = "simplified" }: Record<string, any> = {}) {
        if (type === "simplified") {
            return toTraditional(this.text);
        }
        return toSimplified(this.text);
    }

    // 替换
    replace({ search = [], replace = [] }: Record<string, any> = {}) {
        let text = this.text;
        for (let i in search) {
            if (search[i]) {
                text = text.replace(new RegExp(regExpQuote(search[i]), "g"), (i in replace ? replace[i] : ""));
            }
        }
        return text;
    }

    // 替换
    regularReplace({ search = "", replace = "" }: Record<string, any> = {}) {
        let text = this.text;
        if (search) {
            text = text.replace(new RegExp(search, "g"), replace);
        }
        return text;
    }

    // 移除重复行
    lineRemoveRepeat() {
        return uniq(this.text.split("\n")).join("\n");
    }

    // 移除行号
    removeLineIndex() {
        return this.text.replace(new RegExp("^\\s*\\d+\\.?", "gm"), "");
    }

    // 添加行号
    addLineIndex() {
        return this.text.split("\n").map((line, index) => `${index + 1}. ${line}`).join("\n");
    }

    // 排序
    sort({ type = "" }: Record<string, any> = {}) {
        switch (type) {
            // 行反转
            case "reverse_line":
                return this.text.split(/\r?\n/).reverse().join("\n");
            // 行字符串反转
            case "reverse_line_string":
                return this.text.split(/\r?\n/).map(text => {
                    return text.split("").reverse().join("");
                }).join("\n");
            // 字符串反转
            case "reverse_all":
                return this.text.split("").reverse().join("");

            // 行排序
            case "line_asc":
                return orderBy(this.text.split(/\r?\n/), (item) => item, "asc").join("\n");
            case "line_desc":
                return orderBy(this.text.split(/\r?\n/), (item) => item, "desc").join("\n");
        }
        return this.text;
    }

    // trim
    lineTrim() {
        return this.text.split(/\r?\n/).map((item) => item.trim()).join("\n");
    }

    // 移除空行
    filterBlankLine() {
        return this.text.split(/\r?\n/).filter((item) => {
            return item.trim() !== "";
        }).join("\n");
    }

    // 过滤所有换行符
    filterAllBr() {
        return this.text.replace(/\r?\n|\r/g, "");
    }

    // 标点替换
    replacePunctuation({ type = "zh" }: Record<string, any> = {}) {
        const zh = ["“", "”", "‘", "’", "。", "，", "；", "：", "？", "！", "……", "—", "～", "（", "）", "《", "》"];
        const en = ["\"", "\"", "'", "'", ".", ",", ";", ":", "?", "!", "…", "-", "~", "(", ")", "<", ">"];
        let text = this.text;
        for (let i in zh) {
            text = text.replace(
                new RegExp(regExpQuote(type === "zh" ? en[i] : zh[i]), "g"),
                type === "zh" ? zh[i] : en[i],
            );
        }
        return text;

    }

    // 转义
    escape({ lists = [] }: { lists: EscapeCharsType[] } | Record<string, any>) {
        let text = this.text;
        for (let item of lists) {
            if (item in escapeChars) {
                text = text.replaceAll(escapeChars[item].string, escapeChars[item].char);
            }
        }
        return text;
    }

    // 反转义
    unescape({ lists = [] }: { lists: EscapeCharsType[] } | Record<string, any>) {
        let text = this.text;
        for (let item of lists) {
            if (item in escapeChars) {
                text = text.replaceAll(escapeChars[item].char, escapeChars[item].string);
            }
        }
        return text;
    }

    // 命名
    rename({ type = "lowerSnakeCase" }) {
        return this.text.replace(/\b[\w\-_]+\b/g, function(str) {
            return nameConvent(str, type as RenameType);
        });
    }

    // 统计
    stat() {
        let content = this.text.replace(/\r?\n/g, "\n");

        let zh_word = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
        let zh_punctuation = (content.match(/[\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5]/g) || []).length;
        let int_string = (content.match(/[0-9]/g) || []).length;
        let en_string = (content.match(/[A-Za-z]/g) || []).length;
        let int_word = (content.match(/\b\d+\b/g) || []).length;
        let en_word = (content.match(/\b\w+\b/g) || []).length - int_word;
        let en_punctuation = (content.match(/[~`!@#$%^&*()\-_+=|\\[\]{};:"',<.>/?]/g) || []).length;

        return {
            // 字节数(utf8)
            byte_utf8_length: Buffer.byteLength(this.text, "utf8"),
            // 字节数(gbk)
            byte_gbk_length: getGbkStrLength(this.text),
            // 字符数
            string_length: content.replace(/\n/g, "").length,
            // 字数
            word_length: zh_word + en_word + zh_punctuation + int_word + en_punctuation,
            // 中文字数
            zh_word,
            // 中文标点
            zh_punctuation,
            // 英文字母
            en_string,
            // 英文单词
            en_word,
            // 英文标点
            en_punctuation,
            // 数字字符
            int_string,
            // 数字单词
            int_word,
            // 行数
            line_length: this.text ? this.text.split("\n").length : 0,
        };
    }
}
