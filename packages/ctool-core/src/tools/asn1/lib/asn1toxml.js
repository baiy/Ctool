/**
 * ASN.1 DER格式解码，为方便阅读，以XML格式输出
 * 以下代码基于开源项目：https://github.com/lapo-luchini/asn1js实现
 * 验证数据：308201033081b60201003027310b30090603550406130244453118301606035504030c0f7777772e6578616d706c652e636f6d302a300506032b657003210072596b7105e845c8c189d1da142dee367859b4e24f34f42cf07de77c7680f9fba05c305a06092a864886f70d01090e314d304b300b0603551d0f04040302043030130603551d25040c300a06082b0601050507030130270603551d110420301e820f7777772e6578616d706c652e636f6d820b6578616d706c652e636f6d300506032b657003410087cf352637d1e0053c64390f69878eeff35e5c22ca4c3caeaec29e01b300be96a6f18fa7f41acf7ca598d1915bab80b30bd2687d596debacde94a69c5c2fa90e
 * 验证结果：https://the-x.cn/encodings/Asn1.aspx
 */
function contentSimple(asn1, maxLength) {
    if (asn1.tag === undefined)
        return null;
    if (maxLength === undefined)
        maxLength = Infinity;
    let content = asn1.posContent(),
        len = Math.abs(asn1.length);
    if (!asn1.tag.isUniversal()) {
        if (asn1.sub !== null)
            return '';
        let d1 = asn1.stream.parseOctetString(content, content + len, maxLength);
        return d1.str;
    }
    switch (asn1.tag.tagNumber) {
    case 0x01: // BOOLEAN
        return (asn1.stream.get(content) === 0) ? 'false' : 'true';
    case 0x02: // INTEGER
        // return asn1.stream.parseInteger(content, content + len);
        let d = recurse(asn1, 'parseOctetString', maxLength);
        return "0x"+d.str;
    case 0x03: { // BIT_STRING
        let d = recurse(asn1, 'parseOctetString', maxLength);
        return "0x"+d.str;
    }
    case 0x04: { // OCTET_STRING
        let d = recurse(asn1, 'parseOctetString', maxLength);
        return "0x"+d.str;
    }
    //case 0x05: // NULL
    case 0x06: // OBJECT_IDENTIFIER
        return asn1.stream.parseOID(content, content + len, maxLength);
    //case 0x07: // ObjectDescriptor
    //case 0x08: // EXTERNAL
    //case 0x09: // REAL
    case 0x0A: // ENUMERATED
        return asn1.stream.parseInteger(content, content + len);
    //case 0x0B: // EMBEDDED_PDV
    case 0x0D: // RELATIVE-OID
        return asn1.stream.parseRelativeOID(content, content + len, maxLength);
    case 0x10: // SEQUENCE
    case 0x11: // SET
        if (asn1.sub !== null)
            return '';
        else
            return '(no elem)';
    case 0x0C: // UTF8String
        return recurse(asn1, 'parseStringUTF', maxLength).str;
    case 0x14: // TeletexString
        return recurse(asn1, 'parseStringT61', maxLength).str;
    case 0x12: // NumericString
    case 0x13: // PrintableString
    case 0x15: // VideotexString
    case 0x16: // IA5String
    case 0x1A: // VisibleString
    case 0x1B: // GeneralString
    //case 0x19: // GraphicString
    //case 0x1C: // UniversalString
        return recurse(asn1, 'parseStringISO', maxLength).str;
    case 0x1E: // BMPString
        return recurse(asn1, 'parseStringBMP', maxLength).str;
    case 0x17: // UTCTime
    case 0x18: // GeneralizedTime
        return asn1.stream.parseTime(content, content + len, (asn1.tag.tagNumber == 0x17));
    }
    return null;
}
function recurse(el, parser, maxLength) {
    let avoidRecurse = true;
    if (el.tag.tagConstructed && el.sub) {
        avoidRecurse = false;
        el.sub.forEach(function (e1) {
            if (e1.tag.tagClass != el.tag.tagClass || e1.tag.tagNumber != el.tag.tagNumber)
                avoidRecurse = true;
        });
    }
    if (avoidRecurse)
        return el.stream[parser](el.posContent(), el.posContent() + Math.abs(el.length), maxLength);
    let d = { size: 0, str: '' };
    el.sub.forEach(function (el) {
        let d1 = recurse(el, parser, maxLength - d.str.length);
        d.size += d1.size;
        d.str += d1.str;
    });
    return d;
}

class ASN1TOXML{
    static decode2Xml(asn1) {
        let typeName = asn1.typeName()
        let s = "<" + typeName + ">";
        if (typeName.startsWith('[')) {
            let reg = /\[(\d)+\]/;
            let match=reg.exec(typeName)
            s = '<NODE Sign="a'+match[1]+'">';
        }
        let content = contentSimple(asn1, undefined);
        if (content) s += content.replace(/\n/g, "|");
        if (asn1.sub !== null) {
            for (let i = 0, max = asn1.sub.length; i < max; ++i) {
                s += "\n" + ASN1TOXML.decode2Xml(asn1.sub[i]);
            }
            if (typeName.startsWith('[')) {
                s += "\n</NODE>";
            } else if (typeName !== undefined) {
                s += "\n</" + typeName + ">";
            }
        } else {
            if (typeName.startsWith('[')) {
                s += "</NODE>";
            } else {
                s += "</" + typeName + ">";
            }
        }
        return s;
    }
}

export default ASN1TOXML
