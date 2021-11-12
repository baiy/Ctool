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
    'NUL': __('ascii_code_nul'),
    'SOH': __('ascii_code_soh'),
    'STX': __('ascii_code_stx'),
    'ETX': __('ascii_code_etx'),
    'EOT': __('ascii_code_eot'),
    'ENQ': __('ascii_code_enq'),
    'ACK': __('ascii_code_ack'),
    'BEL': __('ascii_code_bel'),
    'BS': __('ascii_code_bs'),
    'TAB': __('ascii_code_tab'),
    'LF': __('ascii_code_lf'),
    'VT': __('ascii_code_vt'),
    'FF': __('ascii_code_ff'),
    'CR': __('ascii_code_cr'),
    'SO': __('ascii_code_so'),
    'SI': __('ascii_code_si'),
    'DLE': __('ascii_code_dle'),
    'DC1': __('ascii_code_dc1'),
    'DC2': __('ascii_code_dc2'),
    'DC3': __('ascii_code_dc3'),
    'DC4': __('ascii_code_dc4'),
    'NAK': __('ascii_code_nak'),
    'SYN': __('ascii_code_syn'),
    'ETB': __('ascii_code_etb'),
    'CAN': __('ascii_code_can'),
    'EM': __('ascii_code_em'),
    'SUB': __('ascii_code_sub'),
    'ESC': __('ascii_code_esc'),
    'FS': __('ascii_code_fs'),
    'GS': __('ascii_code_gs'),
    'RS': __('ascii_code_rs'),
    'US': __('ascii_code_us'),
    'DEL': __('ascii_code_del'),
}
const radix = new Radix();

class Ascii {
    constructor(c, type = "str") {
        let dec = -1;
        c = c + "";
        if (type !== "str") {
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
        return ASCII_MAP[this.decData] === " " ? __('ascii_code_space') : ASCII_MAP[this.decData]
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
