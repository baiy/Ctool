import BigNumber from "bignumber.js";

class Radix {
    constructor(formatter = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@') {
        BigNumber.config({ALPHABET: formatter})
    }

    convent(base, source, target, debug = false) {
        if (debug){
            BigNumber.DEBUG = true
        }
        let sourceNum = new BigNumber(base, source);
        if (debug){
            BigNumber.DEBUG = false
        }
        return sourceNum.toString(target);
    }
}

export default Radix
