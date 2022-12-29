import {ip2long, long2ip, Netmask} from "netmask"
import convert from "@/helper/radix";

const tryBinaryToDecimal = (ip:string) => {
    if (ip.includes('.') && ip.substring(0, 2).toUpperCase() === "0B") {
        return ipConvert(ip, 10, 2, '0b')
    }
    return ip
}

export const ipConvert = (ip: string, toRadix = 10, fromRadix = 10, filterPrefix = "") => {
    return ip.split('.').map((item) => {
        // 移除前缀
        if (
            filterPrefix
            && item.length > filterPrefix.length
            && item.substring(0, filterPrefix.length).toUpperCase() === filterPrefix.toUpperCase()
        ) {
            item = item.substring(filterPrefix.length)
        }
        // 移除补零
        item = item.replace(/\b(0+)/gi, "") || "0"
        if (toRadix === fromRadix) {
            return `${item}`;
        }

        return `${convert(item, fromRadix, toRadix).padStart(toRadix === 2 ? 8 : (toRadix === 8 ? 4 : 2), '0').toUpperCase()}`
    }).join('.')
}

export const getMaskBitByAvailable = (available: number) => {
    if (isNaN(available) || available > 0xfffffffe || available < 1) {
        throw new Error(`Available Size Invalid`)
    }
    let bitSize = parseInt(`${Math.log(available) / Math.log(2)}`) + 1;
    if ((Math.pow(2, bitSize) - available) < 2) {
        bitSize += 1;
    }
    return 32 - bitSize

}

export default class {
    netmask: Netmask
    ip = ""

    constructor(
        ipAddr = "192.168.0.1" // lang/点分[10/8/16]进制
        , maskAddr = "24" // 位数/lang/点分[10/8/16]进制
    ) {
        // mask long
        if (!`${maskAddr}`.includes('.') && parseInt(`${maskAddr}`, 10) > 32) {
            maskAddr = long2ip(parseInt(`${maskAddr}`, 10))
        }

        // ip/mask 支持二进制
        ipAddr = tryBinaryToDecimal(ipAddr)
        maskAddr = tryBinaryToDecimal(maskAddr)

        this.netmask = new Netmask(`${ipAddr}/${maskAddr}`)
        this.ip = `${long2ip(ip2long(ipAddr))}`
    }

    // 可用地址
    available() {
        return Math.max(this.netmask.size - 2, 0)
    }

    // 地址总数
    size() {
        return this.netmask.size
    }

    // 网络
    base() {
        return this.netmask.base
    }

    first() {
        return this.netmask.first
    }

    last() {
        return this.netmask.last
    }

    broadcast() {
        return this.netmask.broadcast || "-"
    }

    // 当前ip
    ipInfo() {
        return {
            ip: this.ip,
            long: `${ip2long(this.ip)}`,
            ip2: ipConvert(this.ip, 2),
            ip8: ipConvert(this.ip, 8),
            ip16: ipConvert(this.ip, 16),
        }
    }

    // 当前掩码
    maskInfo() {
        const mask = `${long2ip(this.netmask.maskLong)}`;
        return {
            bit: `${this.netmask.bitmask}`,
            long: `${this.netmask.maskLong}`,
            mask,
            mask2: ipConvert(mask, 2),
            mask8: ipConvert(mask, 8),
            mask16: ipConvert(mask, 16),
            opposite: `${this.netmask.hostmask}`,
        }
    }
}
