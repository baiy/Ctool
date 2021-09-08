/**
 * Copyright (c) 2017 hustcc
 * License: MIT
 * GitHub: https://github.com/hustcc/radix.js
 **/

class Radix {
    /**
     * 构造方法
     * @param formatter
     */
    constructor(formatter = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@') {
        this.formatter = formatter;
    }

    /**
     * 10 进制 m 转 N 进制
     * @param m 被转的数字
     * @param n 被转的进制数
     * @returns {*}
     */
    v10toN = (m, n) => {
        m = String(m).replace(/ /gi, ''); // 替换 empty
        if (m === '') return '';
        let a = this.formatter.substr(0, 10);
        let b = `${a}.`; // 正则字符

        if (m.replace(new RegExp(`[${b}]`, 'gi'), '') !== '') {
            // 不是有效的进制数
            return '';
        }
        m = m.split('.');  // 将小数分割开
        if (m.length > 2) return ''; // 不是有效的进制数

        a = this.formatter.substr(0, n);
        let t;
        let d;

        // 如果是整数
        if (m.length === 1) {
            m = m[0];
            t = '';
            while (m !== 0) {
                b = m % n;
                t = a.charAt(b) + t;
                m = (m - b) / n;
            }
            return t;
        }
        // 如果是小数
        let m0 = m[0]; // 整数部分
        t = ''; // 整数部分的进制数
        while (m0 !== 0) {
            b = m0 % n;
            t = a.charAt(b) + t;
            m0 = (m0 - b) / n;
        }

        // 小数点后面部分
        let cnt = 18;// 最多计算八位小数
        let m1 = m[1];
        m1 = parseFloat(`0.${m1}`);
        d = ''; // 小数部分的进制数
        b = 0;
        while (m1 !== 0 && cnt > 0) {
            m1 *= n;
            b = parseInt(m1, 10);
            d += a.charAt(b);
            m1 -= b;
            cnt -= 1;
        }
        return `${t}.${d}`;
    };

    /**
     * N 进制数m转 10 进制
     * @param m 被转的数字
     * @param n 被转的进制数
     * @returns {*}
     */
    vNto10 = (m, n) => {
        m = String(m).replace(/ /gi, '');
        if (m === '') return '';
        const a = this.formatter.substr(0, n);
        const b = `${a}.`;

        if (m.replace(new RegExp(`[${b}]`, 'gi'), '') !== '') {
            return '';
        }
        m = m.split('.');
        if (m.length > 2) return '';

        let t;
        let d;
        let c;

        // 为整数
        if (m.length === 1) {
            m = m[0];
            t = 0;
            c = 1;
            for (let x = m.length - 1; x > -1; x -= 1) {
                t += c * (a.indexOf(m.charAt(x)));
                c *= n;
            }
            return t;
        }
        // 小数
        // 整数部分的处理
        const m0 = m[0];
        t = 0;
        c = 1;
        for (let x = m0.length - 1; x > -1; x -= 1) {
            t += c * (a.indexOf(m0.charAt(x)));
            c *= n;
        }
        // 小数部分的处理
        const m1 = m[1];
        d = 0;
        c = 1 / n;
        for (let x = 0; x < m1.length; x += 1) {
            d += c * (a.indexOf(m1.charAt(x)));
            c /= n;
        }
        return t + d;
    };

    /**
     * n 进制数 x 转 m 进制
     * @param x
     * @param n
     * @param m
     * @returns {*}
     */
    vNtoM = (x, n, m) => {
        // 首先将 m 转成 10 进制数
        const a = this.vNto10(x, n * 1);
        if (a === '') return '';
        // 然后将其转为 M 进制数
        return this.v10toN(a, m);
    };

    convent = (radixNumber, currentRadix = 10, targetRadix = 10) =>
        this.vNtoM(radixNumber, currentRadix, targetRadix);
}

export default Radix
