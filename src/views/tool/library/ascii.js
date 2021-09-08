// ASCII MAP
import Radix from "./radix.js";

const ASCII_MAP = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'TAB', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI',
    'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US',
    ' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[',
    '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', 'DEL']
// ASCII 不可显示字符
const ASCII_HIDDEN = {
    'NUL': "空字符（Null）",
    'SOH': "标题开始",
    'STX': "本文开始",
    'ETX': "本文结束",
    'EOT': "传输结束",
    'ENQ': "请求",
    'ACK': "确认回应",
    'BEL': "响铃",
    'BS': "退格",
    'TAB': "水平定位符号",
    'LF': "换行键",
    'VT': "垂直定位符号",
    'FF': "换页键",
    'CR': "归位键",
    'SO': "取消变换（Shift out）",
    'SI': "启用变换（Shift in）",
    'DLE': "跳出数据通讯",
    'DC1': "设备控制一（XON 启用软件速度控制）",
    'DC2': "设备控制二",
    'DC3': "设备控制三（XOFF 停用软件速度控制）",
    'DC4': "设备控制四",
    'NAK': "确认失败回应",
    'SYN': "同步用暂停",
    'ETB': "区块传输结束",
    'CAN': "取消",
    'EM': "连接介质中断",
    'SUB': "替换",
    'ESC': "跳出",
    'FS': "文件分割符",
    'GS': "组群分隔符",
    'RS': "记录分隔符",
    'US': "单元分隔符",
    'DEL': "删除",
}
const radix = new Radix();

class Ascii {
    constructor(c, type = "str") {
        let dec = -1;
        c = c + "";
        if (type !== "str"){
            c = c.toLowerCase();
        }
        switch (type) {
            case 'str':
                dec = ASCII_MAP.indexOf(c)
                break;
            case 'dec':
                dec = radix.convent(c, 10, 10);
                break;
            case 'hex':
                dec = radix.convent(c, 16, 10);
                break;
            case 'oct':
                dec = radix.convent(c, 8, 10);
                break;
            case 'bin':
                dec = radix.convent(c.replace(/\b(0+)/gi, ""), 2, 10);
                break;
            default:
                throw 'type error'
        }
        if (dec < 0 || dec > 127) {
            throw 'input error'
        }
        this.decData = dec
    }

    dec() {
        return this.decData + ""
    }

    hex() {
        return (radix.convent(this.decData, 10, 16) + "").toUpperCase()
    }

    oct() {
        return radix.convent(this.decData, 10, 8) + ""
    }

    bin() {
        return (radix.convent(this.decData, 10, 2) + "").padStart(8, '0')
    }

    str() {
        return ASCII_MAP[this.decData]
    }
}

const convent = (s, currentType, targetType) => {
    const types = ['str', 'dec', 'hex', 'oct', 'bin'];
    if (!types.includes(currentType) || !types.includes(targetType)) {
        throw 'type error'
    }
    let r = [];
    for (const c of s.split(currentType === "str" ? '' : ' ')) {
        let ascii = new Ascii(c, currentType);
        r.push(ascii[targetType]())
    }
    return r.join(targetType === "str" ? '' : ' ');
}

export default {
    convent,
    Ascii,
    ascii_map: ASCII_MAP,
    ascii_hidden: ASCII_HIDDEN,
}
