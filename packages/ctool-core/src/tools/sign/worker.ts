import rs, {PrivateKeyOutputFormatType} from "jsrsasign";

const post = (method: string, data: any) => {
    let send = {method, data}
    console.log("worker send", send)
    self.postMessage({method, data});
}

const generateKeypair = (type: PrivateKeyOutputFormatType, length: number) => {
    const rsaKeypair = rs.KEYUTIL.generateKeypair("RSA", length);
    post('generate_keypair', {private_key: rs.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, type), public_key: rs.KEYUTIL.getPEM(rsaKeypair.pubKeyObj)})
}

self.addEventListener('message', function (e) {
    console.log("worker accept", e.data)
    const data = e.data;
    if (data.method === "generate_keypair") {
        return generateKeypair(data.data.type, data.data.length)
    }
}, false);
