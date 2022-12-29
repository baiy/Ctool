// ASCII MAP
import radix from "@/helper/radix";

export type ConventType = 'str' | 'dec' | 'hex' | 'oct' | 'bin'

export const asciiMap = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'HT', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI',
    'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US',
    'SPACE', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[',
    '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', 'DEL']
// ASCII 不可显示字符
export const asciiHidden = {
    'NUL': $t('ascii_code_nul'),
    'SOH': $t('ascii_code_soh'),
    'STX': $t('ascii_code_stx'),
    'ETX': $t('ascii_code_etx'),
    'EOT': $t('ascii_code_eot'),
    'ENQ': $t('ascii_code_enq'),
    'ACK': $t('ascii_code_ack'),
    'BEL': $t('ascii_code_bel'),
    'BS': $t('ascii_code_bs'),
    'HT': $t('ascii_code_tab'),
    'LF': $t('ascii_code_lf'),
    'VT': $t('ascii_code_vt'),
    'FF': $t('ascii_code_ff'),
    'CR': $t('ascii_code_cr'),
    'SO': $t('ascii_code_so'),
    'SI': $t('ascii_code_si'),
    'DLE': $t('ascii_code_dle'),
    'DC1': $t('ascii_code_dc1'),
    'DC2': $t('ascii_code_dc2'),
    'DC3': $t('ascii_code_dc3'),
    'DC4': $t('ascii_code_dc4'),
    'NAK': $t('ascii_code_nak'),
    'SYN': $t('ascii_code_syn'),
    'ETB': $t('ascii_code_etb'),
    'CAN': $t('ascii_code_can'),
    'EM': $t('ascii_code_em'),
    'SUB': $t('ascii_code_sub'),
    'ESC': $t('ascii_code_esc'),
    'FS': $t('ascii_code_fs'),
    'GS': $t('ascii_code_gs'),
    'RS': $t('ascii_code_rs'),
    'US': $t('ascii_code_us'),
    'DEL': $t('ascii_code_del'),
    'SPACE': $t('ascii_code_space'),
}

class Ascii {
    decData: string

    constructor(c: string | number, type: ConventType = "str") {
        let dec = -1;
        c = `${c}`;
        if (type !== "str") {
            c = c.toLowerCase();
        }
        switch (type) {
            case 'str':
                dec = c.charCodeAt(0)
                break;
            case 'dec':
                if (/^[0-9 ]+$/.test(c)){
                    dec = parseInt(radix(c, 10, 10));
                }
                break;
            case 'hex':
                if (/^[0-9a-f ]+$/.test(c)){
                    dec = parseInt(radix(c, 16, 10));
                }
                break;
            case 'oct':
                if (/^[0-7 ]+$/.test(c)){
                    dec = parseInt(radix(c, 8, 10));
                }
                break;
            case 'bin':
                if (/^[0-1 ]+$/.test(c)){
                    dec = parseInt(radix(c.replace(/\b(0+)/gi, ""), 2, 10));
                }
                break;
            default:
                throw new Error('type error')
        }
        if (dec < 0 || dec > 127) {
            throw new Error(`"${c}": input error`)
        }
        this.decData = `${dec}`
    }

    dec() {
        return this.decData + ""
    }

    hex() {
        return (radix(this.decData, 10, 16) + "").toUpperCase()
    }

    oct() {
        return radix(this.decData, 10, 8) + ""
    }

    bin() {
        return (radix(this.decData, 10, 2) + "").padStart(8, '0')
    }

    str() {
        const asciiStr = asciiMap[this.decData]
        const special = {
            SPACE: " ",
            HT: "\t",
            LF: "\n",
            CR: "\r",
        }
        if (asciiStr in special) {
            return special[asciiStr]
        }
        // 转移字符
        if (Object.keys(asciiHidden).includes(asciiStr)) {
            return `[${asciiStr}]`
        }
        return asciiMap[this.decData]
    }
}

export const convent = (s: string, currentType: ConventType, targetType: ConventType) => {
    if (s === "") {
        return ""
    }
    // 字符串转义处理
    if (currentType === "str") {
        for (let key of Object.keys(asciiHidden)) {
            s = s.replace(new RegExp(`\\[${key}\\]`, 'g'), String.fromCharCode(asciiMap.indexOf(key)))
        }
    }
    let r: string[] = [];
    for (const c of s.split(currentType === "str" ? '' : ' ')) {
        if (currentType !== "str" && c === ""){
            continue;
        }
        let ascii = new Ascii(c, currentType);
        r.push(ascii[targetType]())
    }
    return r.join(targetType === "str" ? '' : ' ');
}
