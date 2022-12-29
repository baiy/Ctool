import BigNumber from "bignumber.js";

export const defaultAlphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@"

export default (base: string | number, source: number, target: number, alphabet: string = "") => {
    alphabet = alphabet || defaultAlphabet

    const BN = BigNumber.clone({ALPHABET: alphabet,EXPONENTIAL_AT: 1e+9})
    return (new BN(base, source)).toString(target);
}
