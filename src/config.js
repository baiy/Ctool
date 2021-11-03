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
    {'name': 'common'},
    {'name': 'encryption'},
    {'name': 'conversion'},
    {'name': 'serialize'},
    {'name': 'check'},
    {'name': 'generate'},
    {'name': 'other'},
]

const tool = [
    {
        'name': 'hash',
        'cat': ['encryption']
    },
    {
        'name': 'encrypt',
        'cat': ['encryption']
    },
    {'name': 'sign', 'cat': ['encryption']},
    {'name': 'base64', 'cat': ['encryption']},
    {'name': 'json', 'cat': ['conversion', 'serialize']},
    {'name': 'url', 'cat': ['conversion']},
    {'name': 'timestamp', 'cat': ['conversion']},
    {'name': 'qrCode', 'cat': ['generate']},
    {'name': 'barcode', 'cat': ['generate']},
    {'name': 'pinyin', 'cat': ['conversion']},
    {'name': 'ip', 'cat': ['other']},
    {'name': 'code', 'cat': ['other']},
    {'name': 'unicode', 'cat': ['conversion']},
    {'name': 'decimalConvert', 'cat': ['conversion']},
    {'name': 'regex', 'cat': ['check']},
    {'name': 'randomString', 'cat': ['generate']},
    {'name': 'serializeConversion', 'cat': ['conversion', 'serialize']},
    {'name': 'diffs', 'cat': ['check']},
    {'name': 'crontab', 'cat': ['check']},
    {'name': 'websocket', 'cat': ['other']},
    {'name': 'unit', 'cat': ['other']},
    {'name': 'time', 'cat': ['other']},
    {'name': 'uuid', 'cat': ['generate']},
    {'name': 'jsonToObject', 'cat': ['conversion', 'serialize']},
    {'name': 'ascii', 'cat': ['conversion']},
    {'name': 'variableConversion', 'cat': ['conversion']},
    {'name': 'jwt', 'cat': ['conversion']},
    {'name': 'hexString', 'cat': ['conversion']},
    {'name': 'text', 'cat': ['other']},
    {'name': 'html', 'cat': ['conversion']},
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
        sign: ['签名', '验签', 'rsa'],
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
