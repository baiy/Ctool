// 工具缓存数据过期时间(秒)
const TOOL_DATA_EXPIRY = 3600 * 24
// 徽章过期时间(天)
const BADGE_EXPIRY = 5
// 分类徽章
const BADGE_CATEGORY = []
// 工具徽章
const BADGE_TOOL = []
// 默认常用工具
const DEFAULT_COMMON_TOOL = [
    'hash', 'encrypt', 'json', 'base64', 'url', 'timestamp',
    'qrCode', 'pinyin', 'ip', 'code', 'unicode',
    'text', 'randomString', 'diffs',
]

const category = [
    {'name': 'common', 'title': '常用'},
    {'name': 'encryption', 'title': '加解密'},
    {'name': 'conversion', 'title': '转换'},
    {'name': 'serialize', 'title': '序列化'},
    {'name': 'check', 'title': '校验'},
    {'name': 'generate', 'title': '生成'},
    {'name': 'other', 'title': '其他'},
]

const tool = [
    {
        'name': 'hash',
        'title': '哈希(hash)',
        'cat': ['encryption']
    },
    {
        'name': 'encrypt',
        'title': '加密/解密',
        'cat': ['encryption']
    },
    {'name': 'sign', 'title': '签名/验签', 'cat': ['encryption']},
    {'name': 'base64', 'title': 'BASE64编码', 'cat': ['encryption']},
    {'name': 'json', 'title': 'JSON工具', 'cat': ['conversion', 'serialize']},
    {'name': 'url', 'title': 'URL编码', 'cat': ['conversion']},
    {'name': 'timestamp', 'title': '时间戳', 'cat': ['conversion']},
    {'name': 'qrCode', 'title': '二维码', 'cat': ['other']},
    {'name': 'pinyin', 'title': '汉字转拼音', 'cat': ['conversion']},
    {'name': 'ip', 'title': 'IP地址查询', 'cat': ['other']},
    {'name': 'code', 'title': '代码格式化', 'cat': ['other']},
    {'name': 'unicode', 'title': 'Unicode', 'cat': ['conversion']},
    {'name': 'decimalConvert', 'title': '进制转换', 'cat': ['conversion']},
    {'name': 'regex', 'title': '正则表达式', 'cat': ['check']},
    {'name': 'randomString', 'title': '随机字符生成', 'cat': ['generate']},
    {'name': 'serializeConversion', 'title': '序列化转换', 'cat': ['conversion', 'serialize']},
    {'name': 'diffs', 'title': '文本差异化对比', 'cat': ['check']},
    {'name': 'crontab', 'title': 'crontab校验', 'cat': ['check']},
    {'name': 'websocket', 'title': 'websocket调试', 'cat': ['other']},
    {'name': 'unit', 'title': '单位换算', 'cat': ['other']},
    {'name': 'time', 'title': '时间计算器', 'cat': ['other']},
    {'name': 'uuid', 'title': 'UUID生成', 'cat': ['generate']},
    {'name': 'jsonToObject', 'title': 'JSON转实体类', 'cat': ['conversion', 'serialize']},
    {'name': 'ascii', 'title': 'ASCII转换', 'cat': ['conversion']},
    {'name': 'variableConversion', 'title': '变量名转换', 'cat': ['conversion']},
    {'name': 'jwt', 'title': 'JWT解码', 'cat': ['conversion']},
    {'name': 'hexString', 'title': 'Hex/String转换', 'cat': ['conversion']},
    {'name': 'text', 'title': '文本处理', 'cat': ['other']},
    {'name': 'html', 'title': 'html编码', 'cat': ['conversion']},
]

// 工具类功能配置
const feature = {
    qrCode: [
        {name: "generate", title: '生成'},
        {name: "reader", title: '解析'}
    ]
}

const utools = {
    keyword: {
        hash: ['md5', 'sha1', 'sha256', 'sha512', 'sm3'],
        encrypt: ['AES', 'DES', 'RC4', 'Rabbit', 'TripleDes', 'sm2'],
        jwt: ['jwtDecode'],
        hexString: ['hex to string', 'string to hex', '十六进制转字符串', '字符串转十六机制'],
        text: ['文本处理', '大小写转换', '中英文标点转换', '简繁转换', '字符替换', '字符统计', '行去重', '添加行号', '行排序', '过滤行首尾不可见字符', '过滤空行'],
    },
    cmds: {
        timestamp: [
            {
                "type": "regex",
                // "label": "", //程序自动根据tool title填充
                "match": "/(^\\d{10}(?:\\d{3})?$)|(^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}(?:\\.\\d{3})?$)/i",
                "minLength": 10,
                "maxLength": 25
            }
        ],
        qrCode: [
            {
                "type": "regex",
                "match": "/[a-zA-z]+://[^\\s]*/i",
                "minLength": 8,
                "feature": 'generate' // 适配工具内功能

            },
            {
                "type": "regex",
                "match": "/[a-zA-z]+://[^\\s]*/i",
                "minLength": 8,
                "feature": 'reader' // 适配工具内功能
            }
        ],
        ip: [
            {
                "type": "regex",
                "match": "/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/i",
                "minLength": 7,
                "maxLength": 15
            }
        ],
        unicode: [
            {
                "type": "regex",
                "match": "/\\\\u[0-9a-f]{4}/i",
                "minLength": 6
            }
        ]
    }
}
module.exports = {
    category,
    tool,
    feature,
    utools,
    toolDataExpiry: TOOL_DATA_EXPIRY,
    badgeExpiry: BADGE_EXPIRY,
    badgeCategory: BADGE_CATEGORY,
    badgeTool: BADGE_TOOL,
    defaultCommonTool: DEFAULT_COMMON_TOOL
}
