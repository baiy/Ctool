import BigNumber from "bignumber.js";

class Radix {
    constructor(formatter = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@') {
        BigNumber.config({ALPHABET: formatter})
    }

    convent(base, source, target) {
        let sourceNum = new BigNumber(base, source);
        return sourceNum.toString(target);
    }
}

export default Radix
