function h_initArray() {
    this.length = h_initArray.arguments.length;
    for (var a = 0; a < this.length; a++) this[a] = h_initArray.arguments[a]
}

function h_from10toradix(a, e) {
    var t, u, v = "", l = new h_initArray(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"), n = 0;
    if (t = parseInt(a, 10), isNaN(t)) v = "NaN"; else for (v = t < 1 ? "0" : ""; .9 < t;) if (n++, v = l[(u = t) % e] + v, t = Math.floor(u / e), 100 < n) {
        v = "NaN";
        break
    }
    return v
}

function h_paddto2(a) {
    for (; a.length < 2;) a = "0" + a;
    return a
}

function h_paddto8(a) {
    for (; a.length < 8;) a = "0" + a;
    return a
}

function h_countbitsfromleft(a) {
    if (255 == a) return 8;
    for (i = 0, bitpat = 65280; i < 8;) {
        if (a == (255 & bitpat)) return i;
        bitpat >>= 1, i++
    }
    return Number.NaN
}

function calcNWbits(a) {
    sumofbits = 0, tmpvar = parseInt(a.snm_1.value, 10), isNaN(tmpvar) ? a.result.value = "无效" : (bitsfromleft = h_countbitsfromleft(tmpvar), isNaN(bitsfromleft) ? a.result.value = "无效" : (sumofbits += bitsfromleft, tmpvar = parseInt(a.snm_2.value, 10), isNaN(tmpvar) ? a.result.value = "无效" : (bitsfromleft = h_countbitsfromleft(tmpvar), isNaN(bitsfromleft) ? a.result.value = "无效" : (sumofbits += bitsfromleft, tmpvar = parseInt(a.snm_3.value, 10), isNaN(tmpvar) ? a.result.value = "无效" : (bitsfromleft = h_countbitsfromleft(tmpvar), isNaN(bitsfromleft) ? a.result.value = "无效" : (sumofbits += bitsfromleft, tmpvar = parseInt(a.snm_4.value, 10), isNaN(tmpvar) ? a.result.value = "无效" : (bitsfromleft = h_countbitsfromleft(tmpvar), isNaN(bitsfromleft) ? a.result.value = "无效" : (sumofbits += bitsfromleft, a.result.value = sumofbits))))))))
}

function resetform1(a) {
    a.result.value = "", a.snm_1.value = 255, a.snm_2.value = 255, a.snm_3.value = 255, a.snm_4.value = 0
}

function h_fillbitsfromleft(a) {
    if (8 <= a) return 255;
    for (bitpat = 65280; 0 < a;) bitpat >>= 1, a--;
    return 255 & bitpat
}

function calcNWmask(a) {
    return tmpvar = parseInt(a.bits.value, 10), isNaN(tmpvar) || 32 < tmpvar || tmpvar < 0 ? (a.snm_1.value = "错误", a.snm_2.value = "", a.snm_3.value = "", a.snm_4.value = "", 1) : (a.snm_1.value = 0, a.snm_2.value = 0, a.snm_3.value = 0, a.snm_4.value = 0, 8 <= tmpvar ? (a.snm_1.value = 255, tmpvar -= 8, 8 <= tmpvar ? (a.snm_2.value = 255, tmpvar -= 8, 8 <= tmpvar ? (a.snm_3.value = 255, tmpvar -= 8, a.snm_4.value = h_fillbitsfromleft(tmpvar)) : a.snm_3.value = h_fillbitsfromleft(tmpvar), 0) : (a.snm_2.value = h_fillbitsfromleft(tmpvar), 0)) : (a.snm_1.value = h_fillbitsfromleft(tmpvar), 0))
}

function calcNWmaskForm2(a) {
    if (a.hex_1.value = "", a.hex_2.value = "", a.hex_3.value = "", a.hex_4.value = "", 0 != calcNWmask(a)) return 1;
    tmpvar = a.snm_1.value, a.hex_1.value = h_paddto2(h_from10toradix(tmpvar, 16)), tmpvar = a.snm_2.value, a.hex_2.value = h_paddto2(h_from10toradix(tmpvar, 16)), tmpvar = a.snm_3.value, a.hex_3.value = h_paddto2(h_from10toradix(tmpvar, 16)), tmpvar = a.snm_4.value, a.hex_4.value = h_paddto2(h_from10toradix(tmpvar, 16))
}

function resetform2(a) {
    a.bits.value = 24, a.snm_1.value = "", a.snm_2.value = "", a.snm_3.value = "", a.snm_4.value = "", a.hex_1.value = "", a.hex_2.value = "", a.hex_3.value = "", a.hex_4.value = ""
}

function resetform3(a) {
    a.ip_1.value = 10, a.ip_2.value = 0, a.ip_3.value = 0, a.ip_4.value = 255, a.bits_1.value = "", a.bits_2.value = "", a.bits_3.value = "", a.bits_4.value = "", a.hex_1.value = "", a.hex_2.value = "", a.hex_3.value = "", a.hex_4.value = ""
}

function calcBinBits(a) {
    a.bits_1.value = "", a.bits_2.value = "", a.bits_3.value = "", a.bits_4.value = "", tmpvar = parseInt(a.ip_1.value, 10), isNaN(tmpvar) || tmpvar < 0 || 255 < tmpvar ? a.bits_1.value = "错误" : (a.bits_1.value = h_paddto8(h_from10toradix(tmpvar, 2)), a.hex_1.value = h_paddto2(h_from10toradix(tmpvar, 16)), tmpvar = parseInt(a.ip_2.value, 10), isNaN(tmpvar) || tmpvar < 0 || 255 < tmpvar ? a.bits_2.value = "错误" : (a.bits_2.value = h_paddto8(h_from10toradix(tmpvar, 2)), a.hex_2.value = h_paddto2(h_from10toradix(tmpvar, 16)), tmpvar = parseInt(a.ip_3.value, 10), isNaN(tmpvar) || tmpvar < 0 || 255 < tmpvar ? a.bits_3.value = "错误" : (a.bits_3.value = h_paddto8(h_from10toradix(tmpvar, 2)), a.hex_3.value = h_paddto2(h_from10toradix(tmpvar, 16)), tmpvar = parseInt(a.ip_4.value, 10), isNaN(tmpvar) || tmpvar < 0 || 255 < tmpvar ? a.bits_4.value = "错误" : (a.bits_4.value = h_paddto8(h_from10toradix(tmpvar, 2)), a.hex_4.value = h_paddto2(h_from10toradix(tmpvar, 16))))))
}

function reset_rest_from4(a) {
    a.bcast_1.value = "", a.bcast_2.value = "", a.bcast_3.value = "", a.bcast_4.value = "", a.nwadr_1.value = "", a.nwadr_2.value = "", a.nwadr_3.value = "", a.nwadr_4.value = "", a.firstadr_1.value = "", a.firstadr_2.value = "", a.firstadr_3.value = "", a.firstadr_4.value = "", a.lastadr_1.value = "", a.lastadr_2.value = "", a.lastadr_3.value = "", a.lastadr_4.value = "", a.snm_1.value = "", a.snm_2.value = "", a.snm_3.value = "", a.snm_4.value = "", a.numofaddr.value = ""
}

function resetform4(a) {
    a.bits.value = 24, a.ip_1.value = 10, a.ip_2.value = 0, a.ip_3.value = 0, a.ip_4.value = 5, reset_rest_from4(a)
}

function calNBFL(a) {
    return reset_rest_from4(a), tmpvar = parseInt(a.ip_1.value, 10), isNaN(tmpvar) || 255 < tmpvar || tmpvar < 0 ? (a.numofaddr.value = "错误", 1) : (tmpvar = parseInt(a.ip_2.value, 10), isNaN(tmpvar) || 255 < tmpvar || tmpvar < 0 ? (a.numofaddr.value = "错误", 1) : (tmpvar = parseInt(a.ip_3.value, 10), isNaN(tmpvar) || 255 < tmpvar || tmpvar < 0 ? (a.numofaddr.value = "错误", 1) : (tmpvar = parseInt(a.ip_4.value, 10), isNaN(tmpvar) || 255 < tmpvar || tmpvar < 0 ? (a.numofaddr.value = "错误", 1) : 0 != calcNWmask(a) ? 1 : (tmpvar = parseInt(a.bits.value, 10), tmpvar < 0 ? (a.numofaddr.value = "错误", 1) : 32 < tmpvar ? (a.numofaddr.value = "错误", 1) : 31 == tmpvar ? (a.numofaddr.value = "two hosts", a.firstadr_1.value = a.ip_1.value & a.snm_1.value, a.firstadr_2.value = a.ip_2.value & a.snm_2.value, a.firstadr_3.value = a.ip_3.value & a.snm_3.value, a.firstadr_4.value = a.ip_4.value & a.snm_4.value, a.lastadr_1.value = a.ip_1.value | 255 & ~a.snm_1.value, a.lastadr_2.value = a.ip_2.value | 255 & ~a.snm_2.value, a.lastadr_3.value = a.ip_3.value | 255 & ~a.snm_3.value, a.lastadr_4.value = a.ip_4.value | 255 & ~a.snm_4.value, 1) : 32 == tmpvar ? (a.numofaddr.value = "one host", a.firstadr_1.value = a.ip_1.value, a.firstadr_2.value = a.ip_2.value, a.firstadr_3.value = a.ip_3.value, a.firstadr_4.value = a.ip_4.value, 1) : (a.numofaddr.value = Math.pow(2, 32 - tmpvar) - 2, a.bcast_1.value = a.ip_1.value | 255 & ~a.snm_1.value, a.bcast_2.value = a.ip_2.value | 255 & ~a.snm_2.value, a.bcast_3.value = a.ip_3.value | 255 & ~a.snm_3.value, a.bcast_4.value = a.ip_4.value | 255 & ~a.snm_4.value, a.nwadr_1.value = a.ip_1.value & a.snm_1.value, a.nwadr_2.value = a.ip_2.value & a.snm_2.value, a.nwadr_3.value = a.ip_3.value & a.snm_3.value, a.nwadr_4.value = a.ip_4.value & a.snm_4.value, a.firstadr_1.value = a.nwadr_1.value, a.firstadr_2.value = a.nwadr_2.value, a.firstadr_3.value = a.nwadr_3.value, a.firstadr_4.value = parseInt(a.nwadr_4.value) + 1, a.lastadr_1.value = a.bcast_1.value, a.lastadr_2.value = a.bcast_2.value, a.lastadr_3.value = a.bcast_3.value, a.lastadr_4.value = parseInt(a.bcast_4.value) - 1, 0)))))
}

function resetform6(a) {
    a.numofaddr.value = 5, a.bits.value = "", a.maxaddr.value = "", a.snm_1.value = "", a.snm_2.value = "", a.snm_3.value = "", a.snm_4.value = ""
}

function calcNeeded(a) {
    if (tmpvar = parseInt(a.numofaddr.value, 10), isNaN(tmpvar) || 4294967294 < tmpvar || tmpvar < 1) return a.bits.value = "ERR", a.snm_1.value = "", a.snm_2.value = "", a.snm_3.value = "", a.snm_4.value = "", void (a.maxaddr.value = "");
    expval = parseInt(Math.log(tmpvar) / Math.log(2)) + 1, maxaddrval = Math.pow(2, expval), maxaddrval - tmpvar < 2 && (expval += 1), a.maxaddr.value = Math.pow(2, expval) - 2, a.bits.value = 32 - expval, calcNWmask(a)
}

function calcAmount(a) {
    if (tmpvar = parseInt(a.bits.value, 10), isNaN(tmpvar) || 30 < tmpvar || tmpvar < 0) return a.numofaddr.value = "错误", a.maxaddr.value = "", a.snm_1.value = "", a.snm_2.value = "", a.snm_3.value = "", void (a.snm_4.value = "");
    a.maxaddr.value = Math.pow(2, 32 - tmpvar), a.numofaddr.value = Math.pow(2, 32 - tmpvar) - 2, calcNWmask(a)
}

function resetform7(a) {
    a.numofaddr.value = "", a.maxaddr.value = "", a.bits.value = 27, a.snm_1.value = "", a.snm_2.value = "", a.snm_3.value = "", a.snm_4.value = ""
}

function resetform8(a) {
    a.ip_1.value = 255, a.ip_2.value = 255, a.ip_3.value = 240, a.ip_4.value = 0, a.invert_1.value = "", a.invert_2.value = "", a.invert_3.value = "", a.invert_4.value = ""
}

function calcIpInvert(a) {
    a.invert_1.value = "", a.invert_2.value = "", a.invert_3.value = "", a.invert_4.value = "", tmpvar = parseInt(a.ip_1.value, 10), isNaN(tmpvar) ? a.invert_1.value = "NaN" : (a.invert_1.value = 255 & ~tmpvar, tmpvar = parseInt(a.ip_2.value, 10), isNaN(tmpvar) ? a.invert_2.value = "NaN" : (a.invert_2.value = 255 & ~tmpvar, tmpvar = parseInt(a.ip_3.value, 10), isNaN(tmpvar) ? a.invert_3.value = "NaN" : (a.invert_3.value = 255 & ~tmpvar, tmpvar = parseInt(a.ip_4.value, 10), isNaN(tmpvar) ? a.invert_4.value = "NaN" : a.invert_4.value = 255 & ~tmpvar)))
}

function resetform9(a) {
    a.dec_1.value = "", a.bin_1.value = "", a.num.value = ""
}

function convertnum_hex(a) {
    if (a.dec_1.value = "", a.bin_1.value = "", tmpvar = a.num.value.replace(/0x/i, ""), a.num.value = tmpvar, tmpvar = parseInt(a.num.value, 16), isNaN(tmpvar)) return a.dec_1.value = "NaN", void (a.bin_1.value = "NaN");
    a.dec_1.value = tmpvar, a.bin_1.value = h_from10toradix(tmpvar, 2)
}

function resetform10(a) {
    a.dec_1.value = "", a.hex_1.value = "", a.num.value = ""
}

function convertnum_bin(a) {
    if (a.dec_1.value = "", a.hex_1.value = "", tmpvar = parseInt(a.num.value, 2), isNaN(tmpvar)) return a.dec_1.value = "NaN", void (a.hex_1.value = "NaN");
    a.dec_1.value = tmpvar, a.hex_1.value = h_from10toradix(tmpvar, 16)
}

function resetform11(a) {
    a.bin_1.value = "", a.hex_1.value = "", a.num.value = ""
}

function convertnum_dec(a) {
    if (a.bin_1.value = "", a.hex_1.value = "", tmpvar = parseInt(a.num.value, 10), isNaN(tmpvar)) return a.bin_1.value = "NaN", void (a.hex_1.value = "NaN");
    a.hex_1.value = h_from10toradix(tmpvar, 16), a.bin_1.value = h_from10toradix(tmpvar, 2)
}

function resetform12(a) {
    a.hex.value = "", a.ip_1.value = "", a.ip_2.value = "", a.ip_3.value = "", a.ip_4.value = "", a.bits_1.value = "", a.bits_2.value = "", a.bits_3.value = "", a.bits_4.value = ""
}

function dot2hex(a) {
    a.ip_1.value = "", a.ip_2.value = "", a.ip_3.value = "", a.ip_4.value = "", a.bits_1.value = "", a.bits_2.value = "", a.bits_3.value = "", a.bits_4.value = "", tmpvar = a.hex.value.replace(/0x/i, ""), a.hex.value = tmpvar.substr(0, 8), tmpvar = parseInt(tmpvar, 16), isNaN(tmpvar) ? a.ip_1.value = "输入错误" : (a.hex.value = h_paddto8(a.hex.value), a.ip_1.value = parseInt(a.hex.value.substr(0, 2), 16), a.bits_1.value = h_paddto8(h_from10toradix(a.ip_1.value, 2)), a.ip_2.value = parseInt(a.hex.value.substr(2, 2), 16), a.bits_2.value = h_paddto8(h_from10toradix(a.ip_2.value, 2)), a.ip_3.value = parseInt(a.hex.value.substr(4, 2), 16), a.bits_3.value = h_paddto8(h_from10toradix(a.ip_3.value, 2)), a.ip_4.value = parseInt(a.hex.value.substr(6, 2), 16), a.bits_4.value = h_paddto8(h_from10toradix(a.ip_4.value, 2)))
}

function d2h(a) {
    for (var e = a, t = "", u = 0; u < 2; u++) k = 15 & e, t = "0123456789ABCDEF".charAt(k) + t, e >>= 4;
    return t
}

function h2d(a) {
    for (var e = a.toUpperCase(), t = 0, u = " "; e.length < 4;) e = 0 + e;
    for (var v = 0; v < 4; v++) u = e.charAt(v), t = 16 * t + "0123456789ABCDEF".indexOf(u);
    return t
}

function d2b(a) {
    var e = 0, t = 0, u = 0, v = 0, l = 0, n = 0, r = 0, s = 0;
    return 128 & a && (e = 1), 64 & a && (t = 1), 32 & a && (u = 1), 16 & a && (v = 1), 8 & a && (l = 1), 4 & a && (n = 1), 2 & a && (r = 1), 1 & a && (s = 1), "" + e + t + u + v + l + n + r + s
}

function d2bits(a) {
    var e = 0;
    return 128 & a && (e += 1), 64 & a && (e += 1), 32 & a && (e += 1), 16 & a && (e += 1), 8 & a && (e += 1), 4 & a && (e += 1), 2 & a && (e += 1), 1 & a && (e += 1), e
}

function snmcorrect(a) {
    return 255 < (snmcorr = a) && (snmcorr = 255), 253 == a && (snmcorr = 254), 248 < a && a < 252 && (snmcorr = 252), 240 < a && a < 248 && (snmcorr = 248), 224 < a && a < 240 && (snmcorr = 240), 192 < a && a < 224 && (snmcorr = 224), 128 < a && a < 192 && (snmcorr = 192), 0 < a && a < 128 && (snmcorr = 128), a < 0 && (snmcorr = 0), snmcorr
}

function b2d(a) {
    for (var e = 0; a.length < 8;) a = "0" + a;
    return "1" == a.substring(7, 8) && e++, "1" == a.substring(6, 7) && (e += 2), "1" == a.substring(5, 6) && (e += 4), "1" == a.substring(4, 5) && (e += 8), "1" == a.substring(3, 4) && (e += 16), "1" == a.substring(2, 3) && (e += 32), "1" == a.substring(1, 2) && (e += 64), "1" == a.substring(0, 1) && (e += 128), e
}

function bits2d(a) {
    var e = 0;
    return 0 < a && (e += 128), 1 < a && (e += 64), 2 < a && (e += 32), 3 < a && (e += 16), 4 < a && (e += 8), 5 < a && (e += 4), 6 < a && (e += 2), 7 < a && (e += 1), e
}

function initPage() {
    document.forms[0].elements.length && SetOrder()
}

var code = "unknown", version = 0, platform = "Win", j = 0, i = navigator.userAgent.indexOf("MSIE");

function ClearAll(a) {
    a.node.options.selectedIndex = 0, a.network.options.selectedIndex = 0, a.cf[0].checked = !0, a.oct1.value = "", a.oct2.value = "", a.oct3.value = "", a.oct4.value = "", a.snm1.value = "", a.snm2.value = "", a.snm3.value = "", a.snm4.value = "", a.snm1a.value = "", a.snm2a.value = "", a.snm3a.value = "", a.snm4a.value = "", a.snm1c.value = "", a.snm2c.value = "", a.snm3c.value = "", a.snm4c.value = "", a.snm1d.value = "", a.snm2d.value = "", a.snm3d.value = "", a.snm4d.value = "", a.snm1e.value = "", a.snm2e.value = "", a.snm3e.value = "", a.snm4e.value = "", a.oct1a.value = "", a.oct2a.value = "", a.oct3a.value = "", a.oct4a.value = "", a.oct1b.value = "", a.oct2b.value = "", a.oct3b.value = "", a.oct4b.value = "", a.hex1b.value = "", a.hex2b.value = "", a.hex3b.value = "", a.hex4b.value = "", a.bin1b.value = "", a.bin2b.value = "", a.bin3b.value = "", a.bin4b.value = "", a.nw1a.value = "", a.nw2a.value = "", a.nw3a.value = "", a.nw4a.value = "", a.node1a.value = "", a.node2a.value = "", a.node3a.value = "", a.node4a.value = "", a.nwclass.value = "", a.nwclass1.value = "", a.subsuper.value = "", a.nwquant.value = "", a.nodequant.value = "", a.snmbits.value = "", a.broad1a.value = "", a.broad2a.value = "", a.broad3a.value = "", a.broad4a.value = "", a.snmbitsc.value = "", a.dec1b.value = ""
}

function listsubnets(a) {
    if (compute(a), "Illegal" != a.nwclass.value) {
        if (SubnetWindow = window.open("", "SubnetWindow", "width=600px,scrollbars=yes,menubar=yes,status=yes,resizable=yes"), SubnetWindow.document.write("<h1>网络列表</h1>"), networks = a.nwquant.value, nodes = a.nodequant.value + 2, SubnetWindow.status = "正在生成表格", "子网是" == a.subsuper.value) {
            var e = 0;
            if (SubnetWindow.status = "正在生成表格", "C类网" == a.nwclass1.value) {
                SubnetWindow.document.write("<h2>(网络 " + a.nw1a.value + "." + a.nw2a.value + "." + a.nw3a.value + ".0，掩码"), SubnetWindow.document.write(" " + a.snm1.value + "." + a.snm2.value + "." + a.snm3.value + "." + a.snm4.value + ")</h2>"), SubnetWindow.document.write("<table border=1>"), SubnetWindow.document.write("<tr><td rowspan=2 align=center><b>网络</b></td><td colspan=2 align=center><b>主机</b></td><td rowspan=2 align=center><b>广播地址</b></td></tr>"), SubnetWindow.document.write("<tr><td align=center><b>起始</b></td><td align=center><b>结束</b></td></tr>"), nodes = 256 / networks;
                for (var t = 0; t < 256; t += nodes) j = t + 1, topi = t + nodes - 1 & 255, topj = topi - 1, 128 == networks && (topi = (j = t) + nodes - 1 & 255, topj = topi), SubnetWindow.document.write("<tr><td>" + a.oct1.value + "." + a.oct2.value + "." + a.oct3.value + "." + t + "</td><td>" + a.oct1.value + "." + a.oct2.value + "." + a.oct3.value + "." + j + "</td><td>" + a.oct1.value + "." + a.oct2.value + "." + a.oct3.value + "." + topj + "</td><td>" + a.oct1.value + "." + a.oct2.value + "." + a.oct3.value + "." + topi + "</td></tr>")
            }
            if ("B类网" == a.nwclass1.value) {
                SubnetWindow.document.write("<h2>(网络 " + a.nw1a.value + "." + a.nw2a.value + ".0.0，掩码"), SubnetWindow.document.write(" " + a.snm1.value + "." + a.snm2.value + "." + a.snm3.value + "." + a.snm4.value + ")</h2>"), SubnetWindow.document.write("<table border=1>"), SubnetWindow.document.write("<tr><td rowspan=2 align=center><b>网络</b></td><td colspan=2 align=center><b>主机</b></td><td rowspan=2 align=center><b>广播地址</b></td></tr>"), SubnetWindow.document.write("<tr><td align=center><b>起始</b></td><td align=center><b>结束</b></td></tr>"), nodes = 65536 / networks;
                for (t = 0; t < 65536; t += nodes) e += 1, i4 = 255 & t, i3 = t / 256 & 255, j = i4 + 1, topi4 = t + nodes - 1 & 255, topi3 = (t + nodes - 1) / 256 & 255, topj = topi4 - 1, 32768 == networks && (j = i4, topi4 = t + nodes - 1 & 255, topj = topi4), SubnetWindow.document.write("<tr><td>" + a.oct1.value + "." + a.oct2.value + "." + i3 + "." + i4 + "</td><td>" + a.oct1.value + "." + a.oct2.value + "." + i3 + "." + j + "</td><td>" + a.oct1.value + "." + a.oct2.value + "." + topi3 + "." + topj + "</td><td>" + a.oct1.value + "." + a.oct2.value + "." + topi3 + "." + topi4 + "</td></tr>"), 256 == e && 512 < networks && (SubnetWindow.document.write("<tr><td>..</td><td>..</td><td>..</td><td>..</td></tr>"), t = 65536 - e * nodes)
            }
            if ("A类网" == a.nwclass1.value) {
                SubnetWindow.document.write("<h2>(网络 " + a.nw1a.value + ".0.0.0，掩码"), SubnetWindow.document.write(" " + a.snm1.value + "." + a.snm2.value + "." + a.snm3.value + "." + a.snm4.value + ")</h2>"), SubnetWindow.document.write("<table border=1>"), SubnetWindow.document.write("<tr><td rowspan=2 align=center><b>网络</b></td><td colspan=2 align=center><b>主机</b></td><td rowspan=2 align=center><b>广播地址</b></td></tr>"), SubnetWindow.document.write("<tr><td align=center><b>起始</b></td><td align=center><b>结束</b></td></tr>"), nodes = 16777216 / networks;
                for (t = 0; t < 16777216; t += nodes) e += 1, i4 = 255 & t, i3 = t / 256 & 255, i2 = t / 65536 & 255, j = i4 + 1, topi4 = t + nodes - 1 & 255, topi3 = (t + nodes - 1) / 256 & 255, topi2 = (t + nodes - 1) / 65536 & 255, topj = topi4 - 1, 8388608 == networks && (j = i4, topi4 = t + nodes - 1 & 255, topj = topi4), SubnetWindow.document.write("<tr><td>" + a.oct1.value + "." + i2 + "." + i3 + "." + i4 + "</td><td>" + a.oct1.value + "." + i2 + "." + i3 + "." + j + "</td><td>" + a.oct1.value + "." + topi2 + "." + topi3 + "." + topj + "</td><td>" + a.oct1.value + "." + topi2 + "." + topi3 + "." + topi4 + "</td></tr>"), 256 == e && 512 < networks && (SubnetWindow.document.write("<tr><td>..</td><td>..</td><td>..</td><td>..</td></tr>"), t = 16777216 - e * nodes)
            }
        }
        if ("Supernetted" == a.subsuper.value) {
            SubnetWindow.document.write("<h2>(网络 " + a.nw1a.value + "." + a.nw2a.value + "." + a.nw3a.value + ".0，掩码"), SubnetWindow.document.write(" " + a.snm1.value + "." + a.snm2.value + "." + a.snm3.value + "." + a.snm4.value + ")</h2>"), SubnetWindow.document.write("<table border=1>"), SubnetWindow.document.write("<tr><td rowspan=2 align=center><b>网络</b></td><td colspan=2 align=center><b>主机</b></td><td rowspan=2 align=center><b>广播地址</b></td></tr>"), SubnetWindow.document.write("<tr><td align=center><b>起始</b></td><td align=center><b>结束</b></td></tr>");
            t = a.nw4a.value + 1;
            j = a.broad4a.value - 1, SubnetWindow.document.write("<tr><td>" + a.nw1a.value + "." + a.nw2a.value + "." + a.nw3a.value + "." + a.nw4a.value + "</td><td>" + a.nw1a.value + "." + a.nw2a.value + "." + a.nw3a.value + "." + t + "</td><td>" + a.broad1a.value + "." + a.broad2a.value + "." + a.broad3a.value + "." + j + "</td><td>" + a.broad1a.value + "." + a.broad2a.value + "." + a.broad3a.value + "." + a.broad4a.value + "</td></tr>")
        }
        SubnetWindow.document.write("</table>"), SubnetWindow.status = "完成"
    }
}

function compute2(f) {
    var cf = 1, node, nw;
    if ("1" == f.cf[1].checked && (cf = f.cf[1].value), "1" == f.cf[2].checked && (cf = f.cf[2].value), "1" == f.cf[3].checked && (cf = f.cf[3].value), "MSIE" == code) node = f.node.value, nw = f.network.value, 0 < node && (nw = 0, f.network.options.selectedIndex = 0, node = eval(eval(node))); else {
        var i = f.node.selectedIndex;
        node = parseInt(f.node.options[i].value);
        var j = f.network.selectedIndex;
        nw = parseInt(f.network.options[j].value), 0 < node && (nw = 0, f.network.options.selectedIndex = 0, node = eval(eval(node)))
    }
    0 == nw && 0 == node && (nw = 1);
    var power2 = 2;
    if (255 < f.oct1.value && (f.oct1.value = 255), 255 < f.oct2.value && (f.oct2.value = 255), 255 < f.oct3.value && (f.oct3.value = 255), 255 < f.oct4.value && (f.oct4.value = 255), 0 < f.oct1.value && f.oct1.value < 127 && (f.nwclass.value = "A类网"), 127 < f.oct1.value && f.oct1.value < 192 && (f.nwclass.value = "B类网"), 191 < f.oct1.value && f.oct1.value < 224 && (f.nwclass.value = "C类网"), (f.oct1.value < 1 || 223 < f.oct1.value) && (f.nwclass.value = "Illegal", f.nwclass1.value = "", f.subsuper.value = "", f.nwquant.value = 0, f.nodequant.value = 0, f.snm1.value = 0, f.snm2.value = 0, f.snm3.value = 0, f.snm4.value = 0, f.snmbits.value = 0), "A类网" == f.nwclass.value && 1 == cf || 2 == cf && "Illegal" != f.nwclass.value) {
        var nwtemp;
        for (1 <= nw && (node = 16777216 / nw), 16777216 < node ? (f.nwclass1.value = "", nw = 1073741824 / node, nwtemp = nw, f.snm1.value = 255 & ~(64 / nw - 1), f.snm2.value = 0, f.snm3.value = 0, f.snm4.value = 0, f.subsuper.value = "Supernetted", nw = 1) : (f.nwclass1.value = "A类网", nw = 16777216 / node, nwtemp = nw, f.snm1.value = 255, f.snm2.value = 255 & ~(256 / nw - 1), f.snm3.value = 255 & ~(65536 / nw - 1), f.snm4.value = 255 & ~(16777216 / nw - 1), f.subsuper.value = "子网是", power2 += 6); 1 < nwtemp;) nwtemp /= 2, power2 += 1;
        f.nodequant.value = node, f.nwquant.value = nw, f.snmbits.value = "/" + power2
    }
    if ("B类网" == f.nwclass.value && 1 == cf || 3 == cf && "Illegal" != f.nwclass.value) {
        var nwtemp;
        for (32768 < nw && (nw = 32768), 1 <= nw && (node = 65536 / nw), 65536 < node ? (f.nwclass1.value = "", nw = 1073741824 / node, nwtemp = nw, f.snm1.value = 255 & ~(64 / nw - 1), f.snm2.value = 255 & ~(16384 / nw - 1), f.snm3.value = 0, f.snm4.value = 0, f.subsuper.value = "Supernetted", nw = 1) : (f.nwclass1.value = "B类网", nw = 65536 / node, nwtemp = nw, f.snm1.value = 255, f.snm2.value = 255, f.snm3.value = 255 & ~(256 / nw - 1), f.snm4.value = 255 & ~(65536 / nw - 1), f.subsuper.value = "子网是", power2 += 14); 1 < nwtemp;) nwtemp /= 2, power2 += 1;
        f.nodequant.value = node, f.nwquant.value = nw, f.snmbits.value = "/" + power2
    }
    if ("C类网" == f.nwclass.value && 1 == cf || 4 == cf && "Illegal" != f.nwclass.value) {
        var nwtemp;
        for (128 < nw && (nw = 128), 1 <= nw && (node = 256 / nw), 256 < node ? (f.nwclass1.value = "", nw = 1073741824 / node, nwtemp = nw, f.snm1.value = 255 & ~(64 / nw - 1), f.snm2.value = 255 & ~(16384 / nw - 1), f.snm3.value = 255 & ~(4194304 / nw - 1), f.snm4.value = 0, f.subsuper.value = "Supernetted", nw = 1) : (f.nwclass1.value = "C类网", nw = 256 / node, nwtemp = nw, f.snm1.value = 255, f.snm2.value = 255, f.snm3.value = 255, f.snm4.value = 255 & ~(256 / nw - 1), f.subsuper.value = "子网是", power2 += 22); 1 < nwtemp;) nwtemp /= 2, power2 += 1;
        f.nodequant.value = node, f.nwquant.value = nw, f.snmbits.value = "/" + power2
    }
    f.snm1a.value = f.snm1.value, f.snm2a.value = f.snm2.value, f.snm3a.value = f.snm3.value, f.snm4a.value = f.snm4.value, f.oct1a.value = f.oct1.value, f.oct2a.value = f.oct2.value, f.oct3a.value = f.oct3.value, f.oct4a.value = f.oct4.value, f.oct1b.value = f.oct1.value, f.oct2b.value = f.oct2.value, f.oct3b.value = f.oct3.value, f.oct4b.value = f.oct4.value, compute(f), compute3(f), f.snm1c.value = f.snm1.value, f.snm2c.value = f.snm2.value, f.snm3c.value = f.snm3.value, f.snm4c.value = f.snm4.value, computeSNMA(f), f.snm1d.value = f.snm1.value, f.snm2d.value = f.snm2.value, f.snm3d.value = f.snm3.value, f.snm4d.value = f.snm4.value, computeINV1(f), (0 == f.nw1a.value && 0 == f.nw2a.value && 0 == f.nw3a.value && 0 == f.nw4a.value || 255 == f.broad1a.value && 255 == f.broad2a.value && 255 == f.broad3a.value && 255 == f.broad4a.value) && (f.nwclass.value = "Illegal", f.nwclass1.value = "", f.subsuper.value = "", f.nwquant.value = 0, f.nodequant.value = 0, f.snm1.value = 0, f.snm2.value = 0, f.snm3.value = 0, f.snm4.value = 0, f.snmbits.value = 0)
}

function compute(f) {
    255 < f.oct1a.value && (f.oct1a.value = 255), 255 < f.oct2a.value && (f.oct2a.value = 255), 255 < f.oct3a.value && (f.oct3a.value = 255), 255 < f.oct4a.value && (f.oct4a.value = 255), 255 < f.snm1a.value && (f.snm1a.value = 255), 255 < f.snm2a.value && (f.snm2a.value = 255), 255 < f.snm3a.value && (f.snm3a.value = 255), 255 < f.snm4a.value && (f.snm4a.value = 255), f.nw1a.value = eval(f.snm1a.value & f.oct1a.value), f.nw2a.value = eval(f.snm2a.value & f.oct2a.value), f.nw3a.value = eval(f.snm3a.value & f.oct3a.value), f.nw4a.value = eval(f.snm4a.value & f.oct4a.value), f.node1a.value = eval(~f.snm1a.value & f.oct1a.value), f.node2a.value = eval(~f.snm2a.value & f.oct2a.value), f.node3a.value = eval(~f.snm3a.value & f.oct3a.value), f.node4a.value = eval(~f.snm4a.value & f.oct4a.value), f.broad1a.value = f.nw1a.value ^ 255 & ~f.snm1a.value, f.broad2a.value = f.nw2a.value ^ 255 & ~f.snm2a.value, f.broad3a.value = f.nw3a.value ^ 255 & ~f.snm3a.value, f.broad4a.value = f.nw4a.value ^ 255 & ~f.snm4a.value
}

function compute3(f) {
    255 < f.oct1b.value && (f.oct1b.value = 255), 255 < f.oct2b.value && (f.oct2b.value = 255), 255 < f.oct3b.value && (f.oct3b.value = 255), 255 < f.oct4b.value && (f.oct4b.value = 255), f.bin1b.value = d2b(f.oct1b.value), f.bin2b.value = d2b(f.oct2b.value), f.bin3b.value = d2b(f.oct3b.value), f.bin4b.value = d2b(f.oct4b.value), f.hex1b.value = d2h(f.oct1b.value), f.hex2b.value = d2h(f.oct2b.value), f.hex3b.value = d2h(f.oct3b.value), f.hex4b.value = d2h(f.oct4b.value), f.dec1b.value = eval(16777216 * f.oct1b.value) + eval(65536 * f.oct2b.value) + eval(256 * f.oct3b.value) + eval(f.oct4b.value)
}

function compute4(f) {
    f.oct1b.value = b2d(f.bin1b.value), f.oct2b.value = b2d(f.bin2b.value), f.oct3b.value = b2d(f.bin3b.value), f.oct4b.value = b2d(f.bin4b.value), f.hex1b.value = d2h(f.oct1b.value), f.hex2b.value = d2h(f.oct2b.value), f.hex3b.value = d2h(f.oct3b.value), f.hex4b.value = d2h(f.oct4b.value), f.dec1b.value = eval(16777216 * f.oct1b.value) + eval(65536 * f.oct2b.value) + eval(256 * f.oct3b.value) + eval(f.oct4b.value)
}

function compute5(f) {
    f.oct1b.value = h2d(f.hex1b.value), f.oct2b.value = h2d(f.hex2b.value), f.oct3b.value = h2d(f.hex3b.value), f.oct4b.value = h2d(f.hex4b.value), f.bin1b.value = d2b(f.oct1b.value), f.bin2b.value = d2b(f.oct2b.value), f.bin3b.value = d2b(f.oct3b.value), f.bin4b.value = d2b(f.oct4b.value), f.dec1b.value = eval(16777216 * f.oct1b.value) + eval(65536 * f.oct2b.value) + eval(256 * f.oct3b.value) + eval(f.oct4b.value)
}

function compute6(a) {
    a.oct1b.value = a.dec1b.value >>> 24, a.oct2b.value = a.dec1b.value << 8 >>> 24, a.oct3b.value = a.dec1b.value << 16 >>> 24, a.oct4b.value = a.dec1b.value << 24 >>> 24, a.bin1b.value = d2b(a.oct1b.value), a.bin2b.value = d2b(a.oct2b.value), a.bin3b.value = d2b(a.oct3b.value), a.bin4b.value = d2b(a.oct4b.value), a.hex1b.value = d2h(a.oct1b.value), a.hex2b.value = d2h(a.oct2b.value), a.hex3b.value = d2h(a.oct3b.value), a.hex4b.value = d2h(a.oct4b.value)
}

function computeSNMA(a) {
    a.snm1c.value = snmcorrect(a.snm1c.value), a.snm1c.value < 255 ? (a.snm2c.value = 0, a.snm3c.value = 0, a.snm4c.value = 0) : (a.snm2c.value = snmcorrect(a.snm2c.value), a.snm2c.value < 255 ? (a.snm1c.value = 255, a.snm3c.value = 0, a.snm4c.value = 0) : (a.snm3c.value = snmcorrect(a.snm3c.value), a.snm3c.value < 255 ? (a.snm1c.value = 255, a.snm2c.value = 255, a.snm4c.value = 0) : a.snm4c.value = snmcorrect(a.snm4c.value))), bits = 0, bits += d2bits(a.snm1c.value), bits += d2bits(a.snm2c.value), bits += d2bits(a.snm3c.value), bits += d2bits(a.snm4c.value), a.snmbitsc.value = bits
}

function computeSNMB(a) {
    a.snmbitsc.value < 0 && (a.snmbitsc.value = 0), 32 < a.snmbitsc.value && (a.snmbitsc.value = 32), a.snm1c.value = bits2d(a.snmbitsc.value), a.snm2c.value = bits2d(a.snmbitsc.value - 8), a.snm3c.value = bits2d(a.snmbitsc.value - 16), a.snm4c.value = bits2d(a.snmbitsc.value - 24)
}

function computeINV1(a) {
    a.snm1e.value = 255 & ~a.snm1d.value, a.snm2e.value = 255 & ~a.snm2d.value, a.snm3e.value = 255 & ~a.snm3d.value, a.snm4e.value = 255 & ~a.snm4d.value
}

0 <= i && 0 == j && (code = "MSIE", version = parseFloat(navigator.userAgent.substring(i + 5, i + 9)), j = 1), i = navigator.userAgent.indexOf("Opera"), 0 <= i && 0 == j && (code = "Opera", version = parseFloat(navigator.userAgent.substring(i + 5, i + 11)), j = 1), i = navigator.userAgent.indexOf("Mozilla/"), 0 <= i && 0 == j && (code = "NS", version = parseFloat(navigator.userAgent.substring(i + 8, i + 12))), 0 <= navigator.userAgent.indexOf("Mac") && (platform = "Mac"), 0 <= navigator.userAgent.indexOf("OS/2") && (platform = "OS/2"), 0 <= navigator.userAgent.indexOf("X11") && (platform = "UNIX");
