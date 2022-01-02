<template>
    <div>
        <Select @on-change="select" size="small" placeholder="常用" style="width:80px">
            <Option v-for="(v,k) in expression" :value="v.regex" :key="k">{{v.name}}</Option>
        </Select>
        <Button type="primary" style="margin-left: 5px" size="small" @click="referenceShow=true">参考</Button>
        <Drawer title="参考" v-model="referenceShow" :width="100">
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
    methods:{
        select(regex){
            this.$emit('on-select',regex);
        }
    },
    data(){
        return {
            referenceShow:false,
            expression: [
                {regex: "[\\u4e00-\\u9fa5]", name:"中文字符"},
                {regex: "[^\\x00-\\xff]", name:"双字节字符(包括汉字在内)"},
                {regex: "\\n\\s*\\r", name:"空白行"},
                {
                    regex: "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?",
                    name:"Email地址"},
                {regex: "[a-zA-z]+://[^\\s]*", name:"网址URL"},
                {regex: "[1][3,4,5,7,8][0-9]{9}", name:"手机"},
                {regex: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", name:"IP地址"},
                {regex: "\\d{3}-\\d{8}|\\d{4}-\\d{7,8}", name:"国内电话号码"},
                {regex: "[1-9][0-9]{4,}", name:"腾讯QQ号"},
                {regex: "[1-9]\\d{5}(?!\\d)", name:"中国邮政编码"},
                {
                    regex: "([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))",
                    name:"(年-月-日)格式日期"},
                {regex: "[1-9]\\d*", name:"正整数"},
                {regex: "-[1-9]\\d*", name:"负整数"},
                {regex: "-?[1-9]\\d*", name:"整数"},
                {regex: "[1-9]\\d*|0", name:"非负整数（正整数 + 0）"},
                {regex: "-[1-9]\\d*|0", name:"非正整数（负整数 + 0）"},
                {regex: "[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*", name:"正浮点数"},
                {regex: "-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*", name:"负浮点数"},
            ],
            referenceColumns: [
                {
                    title: '字符',
                    key: 'name',
                    width: 100
                },
                {
                    title: '描述',
                    slot: '_text'
                },
            ],
            reference: [
                {
                    name: "\\",
                    text: "将下一个字符标记为一个特殊字符、或一个原义字符、或一个向后引用、或一个八进制转义符。例如，“<code>n</code>”匹配字符“<code>n</code>”。“<code>\\n</code>”匹配一个换行符。串行“<code>\\\\</code>”匹配“<code>\\</code>”而“<code>\\(</code>”则匹配“<code>(</code>”。"
                },
                {
                    name: "^",
                    text: "匹配输入字符串的开始位置。如果设置了RegExp对象的Multiline属性，^也匹配“<code>\\n</code>”或“<code>\\r</code>”之后的位置。"
                },
                {
                    name: "$",
                    text: "匹配输入字符串的结束位置。如果设置了RegExp对象的Multiline属性，$也匹配“<code>\\n</code>”或“<code>\\r</code>”之前的位置。"
                },
                {
                    name: "*",
                    text: "匹配前面的子表达式零次或多次。例如，zo*能匹配“<code>z</code>”以及“<code>zoo</code>”。*等价于{0,}。"
                },
                {
                    name: "+",
                    text: "匹配前面的子表达式一次或多次。例如，“<code>zo+</code>”能匹配“<code>zo</code>”以及“<code>zoo</code>”，但不能匹配“<code>z</code>”。+等价于{1,}。"
                },
                {
                    name: "?",
                    text: "匹配前面的子表达式零次或一次。例如，“<code>do(es)?</code>”可以匹配“<code>does</code>”或“<code>does</code>”中的“<code>do</code>”。?等价于{0,1}。"
                },
                {
                    name: "{n}",
                    text: "n是一个非负整数。匹配确定的n次。例如，“<code>o{2}</code>”不能匹配“<code>Bob</code>”中的“<code>o</code>”，但是能匹配“<code>food</code>”中的两个o。"
                },
                {
                    name: "{n,}",
                    text: "n是一个非负整数。至少匹配n次。例如，“<code>o{2,}</code>”不能匹配“<code>Bob</code>”中的“<code>o</code>”，但能匹配“<code>foooood</code>”中的所有o。“<code>o{1,}</code>”等价于“<code>o+</code>”。“<code>o{0,}</code>”则等价于“<code>o*</code>”。"
                },
                {
                    name: "{n,m}",
                    text: "m和n均为非负整数，其中n&lt;=m。最少匹配n次且最多匹配m次。例如，“<code>o{1,3}</code>”将匹配“<code>fooooood</code>”中的前三个o。“<code>o{0,1}</code>”等价于“<code>o?</code>”。请注意在逗号和两个数之间不能有空格。"
                },
                {
                    name: "?",
                    text: "当该字符紧跟在任何一个其他限制符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串“<code>oooo</code>”，“<code>o+?</code>”将匹配单个“<code>o</code>”，而“<code>o+</code>”将匹配所有“<code>o</code>”。"
                },
                {
                    name: ".",
                    text: "匹配除“<code>\\</code><code>n</code>”之外的任何单个字符。要匹配包括“<code>\\</code><code>n</code>”在内的任何字符，请使用像“<code>(.|\\n)</code>”的模式。"
                },
                {
                    name: "(pattern)",
                    text: "匹配pattern并获取这一匹配。所获取的匹配可以从产生的Matches集合得到，在VBScript中使用SubMatches集合，在JScript中则使用$0…$9属性。要匹配圆括号字符，请使用“<code>\\(</code>”或“<code>\\)</code>”。"
                },
                {
                    name: "(?:pattern)",
                    text: "匹配pattern但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用或字符“<code>(|)</code>”来组合一个模式的各个部分是很有用。例如“<code>industr(?:y|ies)</code>”就是一个比“<code>industry|industries</code>”更简略的表达式。"
                },
                {
                    name: "(?=pattern)",
                    text: "正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，“<code>Windows(?=95|98|NT|2000)</code>”能匹配“<code>Windows2000</code>”中的“<code>Windows</code>”，但不能匹配“<code>Windows3.1</code>”中的“<code>Windows</code>”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。"
                },
                {
                    name: "(?!pattern)",
                    text: "正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如“<code>Windows(?!95|98|NT|2000)</code>”能匹配“<code>Windows3.1</code>”中的“<code>Windows</code>”，但不能匹配“<code>Windows2000</code>”中的“<code>Windows</code>”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始"
                },
                {
                    name: "(?&lt;=pattern)",
                    text: "反向肯定预查，与正向肯定预查类拟，只是方向相反。例如，“<code>(?&lt;=95|98|NT|2000)Windows</code>”能匹配“<code>2000Windows</code>”中的“<code>Windows</code>”，但不能匹配“<code>3.1Windows</code>”中的“<code>Windows</code>”。"
                },
                {
                    name: "(?&lt;!pattern)",
                    text: "反向否定预查，与正向否定预查类拟，只是方向相反。例如“<code>(?&lt;!95|98|NT|2000)Windows</code>”能匹配“<code>3.1Windows</code>”中的“<code>Windows</code>”，但不能匹配“<code>2000Windows</code>”中的“<code>Windows</code>”。"
                },
                {
                    name: "x|y",
                    text: "匹配x或y。例如，“<code>z|food</code>”能匹配“<code>z</code>”或“<code>food</code>”。“<code>(z|f)ood</code>”则匹配“<code>zood</code>”或“<code>food</code>”。"
                },
                {
                    name: "[xyz]",
                    text: "字符集合。匹配所包含的任意一个字符。例如，“<code>[abc]</code>”可以匹配“<code>plain</code>”中的“<code>a</code>”。"
                },
                {
                    name: "[^xyz]",
                    text: "负值字符集合。匹配未包含的任意字符。例如，“<code>[^abc]</code>”可以匹配“<code>plain</code>”中的“<code>p</code>”。"
                },
                {
                    name: "[a-z]",
                    text: "字符范围。匹配指定范围内的任意字符。例如，“<code>[a-z]</code>”可以匹配“<code>a</code>”到“<code>z</code>”范围内的任意小写字母字符。"
                },
                {
                    name: "[^a-z]",
                    text: "负值字符范围。匹配任何不在指定范围内的任意字符。例如，“<code>[^a-z]</code>”可以匹配任何不在“<code>a</code>”到“<code>z</code>”范围内的任意字符。"
                },
                {
                    name: "\\b",
                    text: "匹配一个单词边界，也就是指单词和空格间的位置。例如，“<code>er\\b</code>”可以匹配“<code>never</code>”中的“<code>er</code>”，但不能匹配“<code>verb</code>”中的“<code>er</code>”。"
                },
                {
                    name: "\\B",
                    text: "匹配非单词边界。“<code>er\\B</code>”能匹配“<code>verb</code>”中的“<code>er</code>”，但不能匹配“<code>never</code>”中的“<code>er</code>”。"
                },
                {
                    name: "\\cx",
                    text: "匹配由x指明的控制字符。例如，<code>\\cM</code>匹配一个Control-M或回车符。x的值必须为A-Z或a-z之一。否则，将c视为一个原义的“<code>c</code>”字符。"
                },
                {
                    name: "\\d",
                    text: "匹配一个数字字符。等价于[0-9]。"
                },
                {
                    name: "\\D",
                    text: "匹配一个非数字字符。等价于[^0-9]。"
                },
                {
                    name: "\\f",
                    text: "匹配一个换页符。等价于\\x0c和\\cL。"
                },
                {
                    name: "\\n",
                    text: "匹配一个换行符。等价于\\x0a和\\cJ。"
                },
                {
                    name: "\\r",
                    text: "匹配一个回车符。等价于\\x0d和\\cM。"
                },
                {
                    name: "\\s",
                    text: "匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \\f\\n\\r\\t\\v]。"
                },
                {
                    name: "\\S",
                    text: "匹配任何非空白字符。等价于[^ \\f\\n\\r\\t\\v]。"
                },
                {
                    name: "\\t",
                    text: "匹配一个制表符。等价于\\x09和\\cI。"
                },
                {
                    name: "\\v",
                    text: "匹配一个垂直制表符。等价于\\x0b和\\cK。"
                },
                {
                    name: "\\w",
                    text: "匹配包括下划线的任何单词字符。等价于“<code>[A-Za-z0-9_]</code>”。"
                },
                {
                    name: "\\W",
                    text: "匹配任何非单词字符。等价于“<code>[^A-Za-z0-9_]</code>”。"
                },
                {
                    name: "\\xn",
                    text: "匹配n，其中n为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，“<code>\\x41</code>”匹配“<code>A</code>”。“<code>\\x041</code>”则等价于“<code>\\x04&amp;1</code>”。正则表达式中可以使用ASCII编码。."
                },
                {
                    name: "\\num",
                    text: "匹配num，其中num是一个正整数。对所获取的匹配的引用。例如，“<code>(.)\\1</code>”匹配两个连续的相同字符。"
                },
                {
                    name: "\\n",
                    text: "标识一个八进制转义值或一个向后引用。如果\\n之前至少n个获取的子表达式，则n为向后引用。否则，如果n为八进制数字（0-7），则n为一个八进制转义值。"
                },
                {
                    name: "\\nm",
                    text: "标识一个八进制转义值或一个向后引用。如果\\nm之前至少有nm个获得子表达式，则nm为向后引用。如果\\nm之前至少有n个获取，则n为一个后跟文字m的向后引用。如果前面的条件都不满足，若n和m均为八进制数字（0-7），则\\nm将匹配八进制转义值nm。"
                },
                {
                    name: "\\nml",
                    text: "如果n为八进制数字（0-3），且m和l均为八进制数字（0-7），则匹配八进制转义值nml。"
                },
                {
                    name: "\\un",
                    text: "匹配n，其中n是一个用四个十六进制数字表示的Unicode字符。例如，\\u00A9匹配版权符号（©）。"
                }
            ]
        }
    }
}
</script>
