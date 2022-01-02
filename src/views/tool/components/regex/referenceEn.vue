<template>
    <div>
        <Select @on-change="select" size="small" placeholder="Common" style="width:100px">
            <Option v-for="(v,k) in expression" :value="v.regex" :key="k">{{ v.name }}</Option>
        </Select>
        <Button type="primary" style="margin-left: 5px" size="small" @click="referenceShow=true">Reference</Button>
        <Drawer title="Reference" v-model="referenceShow" :width="100">
            <Table :columns="referenceColumns" :data="reference">
                <template slot-scope="{ row }" slot="_text">
                    <div v-html="row.text" style="padding: 10px 0"></div>
                </template>
            </Table>
        </Drawer>
    </div>
</template>
<script>
export default {
    methods: {
        select(regex) {
            this.$emit('on-select', regex);
        }
    },
    data() {
        return {
            referenceShow: false,
            /* eslint-disable */
            expression: [
                {
                    regex: '(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*',
                    name: "All major credit cards regex"
                },
                {regex: '[a-zA-Z0-9]*', name: "Alpha-numeric characters"},
                {regex: '[a-zA-Z0-9 ]*', name: "Alpha-numeric characters with spaces"},
                {regex: '[a-zA-Z]*', name: "Alphabetic characters"},
                {regex: '(3[47][0-9]{13})*', name: "Amex credit card regex"},
                {
                    regex: '((0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2}))*',
                    name: "Australian Postal Codes"
                },
                {regex: '([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*', name: "Canadian Postal Codes"},
                {regex: '(?:AB|BC|MB|N[BLTSU]|ON|PE|QC|SK|YT)*', name: "Canadian Province Abbreviations"},
                {
                    regex: '(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}',
                    name: "Date (MM/DD/YYYY)"
                },
                {
                    regex: '(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])',
                    name: "Date (YYYY/MM/DD)"
                },
                {regex: '(3(?:0[0-5]|[68][0-9])[0-9]{11})*', name: "Diner's Club credit card regex"},
                {
                    regex: '((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*',
                    name: "IP address regex"
                },
                {regex: '([a-z])+', name: "Lowercase letters"},
                {regex: '([A-Z])+', name: "Uppercase letters"},
                {regex: '(5[1-5][0-9]{14})*', name: "MasterCard credit card numbers"},
                {regex: '((([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+)*', name: "Phone number regex"},
                {regex: '([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})*', name: "SSN regex"},
                {regex: '([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2})*', name: "UK Postal Codes regex"},
                {
                    regex: '(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*',
                    name: "US States regex"
                },
                {regex: '([0-9]{5}(?:-[0-9]{4})?)*', name: "US ZIP Codes regex"},
                {regex: '(4[0-9]{12}(?:[0-9]{3})?)*', name: "Visa credit card numbers"},
                {
                    regex: '(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})',
                    name: "All major credit cards regex"
                },
                {regex: '[a-zA-Z0-9]+', name: "alpha-numeric characters"},
                {regex: '[a-zA-Z]+', name: "Alphabetic characters"},
                {regex: '[ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9]', name: "Canadian Postal Codes"},
                {regex: '[0-9]+', name: "digits"},
                {regex: '[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}', name: "email regex"},
                {
                    regex: '(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+',
                    name: "phone number regex"
                },
                {
                    regex: '((http|https|ftp)://)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]/+=%&_\.~?\-]*)',
                    name: "URL regex"
                },
                {regex: '[0-9]{5}(?:-[0-9]{4})?', name: "US ZIP Codes regex"}
            ],
            /* eslint-enable */
            referenceColumns: [
                {
                    title: 'Character',
                    key: 'name',
                    width: 120
                },
                {
                    title: 'What does it do?',
                    slot: '_text'
                },
            ],
            reference: [
                {
                    "name": "\\",
                    "text": "Used to indicate that the next character should NOT be interpreted literally. For example, the character 'w' by itself will be interpreted as 'match the character w', but using '\\w' signifies 'match an alpha-numeric character including underscore'. Used to indicate that a metacharacter is to be interpreted literally. For example, the '.' metacharacter means 'match any single character but a new line', but if we would rather match a dot character instead, we would use '\\.'."
                },
                {
                    "name": "^",
                    "text": "Matches the beginning of the input. If in multiline mode, it also matches after a line break character, hence every new line. When used in a set pattern ([^abc]), it negates the set; match anything not enclosed in the brackets"
                },
                {
                    "name": "$",
                    "text": "Matches the end of the input. If in multiline mode, it also matches before a line break character, hence every end of line."
                },
                {
                    "name": "*",
                    "text": "Matches the preceding character 0 or more times."
                },
                {
                    "name": "+",
                    "text": "Matches the preceding character 1 or more times."
                },
                {
                    "name": "?",
                    "text": "Matches the preceding character 0 or 1 time. When used after the quantifiers *, +, ? or {}, makes the quantifier non-greedy; it will match the minimum number of times as opposed to matching the maximum number of times."
                },
                {
                    "name": ".",
                    "text": "Matches any single character except the newline character."
                },
                {
                    "name": "(x)",
                    "text": "Matches 'x' and remembers the match. Also known as capturing parenthesis."
                },
                {
                    "name": "(?:x)",
                    "text": "Matches 'x' but does NOT remember the match. Also known as NON-capturing parenthesis."
                },
                {
                    "name": "x(?=y)",
                    "text": "Matches 'x' only if 'x' is followed by 'y'. Also known as a lookahead."
                },
                {
                    "name": "x(?!y)",
                    "text": "Matches 'x' only if 'x' is NOT followed by 'y'. Also known as a negative lookahead."
                },
                {
                    "name": "x|y",
                    "text": "Matches 'x' OR 'y'."
                },
                {
                    "name": "{n}",
                    "text": "Matches the preceding character exactly n times."
                },
                {
                    "name": "{n,m}",
                    "text": "Matches the preceding character at least n times and at most m times. n and m can be omitted if zero.."
                },
                {
                    "name": "[abc]",
                    "text": "Matches any of the enclosed characters. Also known as a character set. You can create range of characters using the hyphen character such as A-Z (A to Z). Note that in character sets, special characters (., *, +) do not have any special meaning."
                },
                {
                    "name": "[^abc]",
                    "text": "Matches anything NOT enclosed by the brackets. Also known as a negative character set."
                },
                {
                    "name": "[\\b]",
                    "text": "Matches a backspace."
                },
                {
                    "name": "\\b",
                    "text": "Matches a word boundary. Boundaries are determined when a word character is NOT followed or NOT preceded with another word character."
                },
                {
                    "name": "\\B",
                    "text": "Matches a NON-word boundary. Boundaries are determined when two adjacent characters are word characters OR non-word characters."
                },
                {
                    "name": "\\cX",
                    "text": "Matches a control character. X must be between A to Z inclusive."
                },
                {
                    "name": "\\d",
                    "text": "Matches a digit character. Same as [0-9] or [0123456789]."
                },
                {
                    "name": "\\D",
                    "text": "Matches a NON-digit character. Same as [^0-9] or [^0123456789]."
                },
                {
                    "name": "\\f",
                    "text": "Matches a form feed."
                },
                {
                    "name": "\\n",
                    "text": "Matches a line feed."
                },
                {
                    "name": "\\r",
                    "text": "Matches a carriage return."
                },
                {
                    "name": "\\s",
                    "text": "Matches a single white space character. This includes space, tab, form feed and line feed."
                },
                {
                    "name": "\\S",
                    "text": "Matches anything OTHER than a single white space character. Anything other than space, tab, form feed and line feed."
                },
                {
                    "name": "\\t",
                    "text": "Matches a tab."
                },
                {
                    "name": "\\v",
                    "text": "Matches a vertical tab."
                },
                {
                    "name": "\\w",
                    "text": "Matches any alphanumeric character including underscore. Equivalent to [A-Za-z0-9_]."
                },
                {
                    "name": "\\W",
                    "text": "Matches anything OTHER than an alphanumeric character including underscore. Equivalent to [^A-Za-z0-9_]."
                },
                {
                    "name": "\\x",
                    "text": "A back reference to the substring matched by the x parenthetical expression. x is a positive integer."
                },
                {
                    "name": "\\0",
                    "text": "Matches a NULL character."
                },
                {
                    "name": "\\xhh",
                    "text": "Matches a character with the 2-digits hexadecimal code."
                },
                {
                    "name": "\\uhhhh",
                    "text": "Matches a character with the 4-digits hexadecimal code."
                }
            ]
        }
    }
}
</script>

