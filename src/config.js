const category = [
    {'name': 'common', 'title': '常用工具'},
    {'name': 'encryption', 'title': '加密解密'},
    {'name': 'conversion', 'title': '编码转换'},
    {'name': 'serialize', 'title': '序列化'},
    {'name': 'other', 'title': '其他工具'},
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
    {'name': 'regex', 'title': '正则表达式', 'cat': ['other']},
    {'name': 'randomString', 'title': '随机字符生成', 'cat': ['other']},
    {'name': 'serializeConversion', 'title': '序列化转换', 'cat': ['conversion', 'serialize']},
    {'name': 'diffs', 'title': '文本差异化对比', 'cat': ['other']},
    {'name': 'crontab', 'title': 'crontab校验', 'cat': ['other']},
    {'name': 'websocket', 'title': 'websocket调试', 'cat': ['other']},
    {'name': 'unit', 'title': '单位换算', 'cat': ['other']},
    {'name': 'time', 'title': '时间计算器', 'cat': ['other']},
    {'name': 'uuid', 'title': 'UUID生成', 'cat': ['other']},
    {'name': 'jsonToObject', 'title': 'JSON转实体类', 'cat': ['conversion', 'serialize']},
    {'name': 'ascii', 'title': 'ascii转换', 'cat': ['conversion']},
    {'name': 'variableConversion', 'title': '变量名转换', 'cat': ['conversion']},
]

const utools = {
    keyword: {
        hash: ['md5', 'sha1', 'sha256', 'sha512', 'sm3'],
        encrypt: ['AES', 'DES', 'RC4', 'Rabbit', 'TripleDes', 'sm2']
    }
}

module.exports = {
    category,
    tool,
    utools
}