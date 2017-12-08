// 工具配置
layui.define(function (exports) {
    // c_1 用户可以自行选择工具
    var category = {
        "c_1": {"id": 1, "name": "常用工具"},
        "c_2": {"id": 2, "name": "加密解密"},
        "c_3": {"id": 3, "name": "编码转换"},
        "c_4": {"id": 4, "name": "其他工具"},
    };

    var tool = {
        "t_1": {
            "id": 1,
            "name": "哈希(hash)",
            "module": "hash",
            "catid": [1,2]
        },
        "t_2": {
            "id": 2,
            "name": "加密/解密",
            "module": "encrypt",
            "catid": [1,2]
        },
        "t_3": {
            "id": 3,
            "name": "BASE64编码",
            "module": "base64",
            "catid": [1,2]
        },
        "t_4": {
            "id": 4,
            "name": "URL编码",
            "module": "url",
            "catid": [1,3]
        },
        "t_5": {
            "id": 5,
            "name": "时间戳",
            "module": "timestamp",
            "catid": [1,3]
        },
        "t_6": {
            "id": 6,
            "name": "二维码",
            "module": "qrcode",
            "catid": [1,3]
        },
        "t_7": {
            "id": 7,
            "name": "汉字转拼音",
            "module": "pinyin",
            "catid": [1,4]
        },
        "t_8": {
            "id": 8,
            "name": "IP地址查询",
            "module": "ip",
            "catid": [1,4]
        },
        "t_9": {
            "id": 9,
            "name": "代码格式化",
            "module": "code",
            "catid": [1,4]
        },
        "t_10": {
            "id": 10,
            "name": "Unicode",
            "module": "unicode",
            "catid": [1,3]
        },
        "t_11": {
            "id": 11,
            "name": "进制转换",
            "module": "hexconvert",
            "catid": [1,4]
        },
        "t_12": {
            "id": 12,
            "name": "正则表达式",
            "module": "regex",
            "catid": [1,4]
        },
        "t_13": {
            "id": 13,
            "name": "随机字符生成器",
            "module": "random_string",
            "catid": [4]
        }
    };

    exports('chromeToolConfig', {
        "category": category,
        "tool": tool
    });
});