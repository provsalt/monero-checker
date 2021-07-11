const base58 = require("base58-monero")
import {keccak256} from "js-sha3"

export const Truncated = "11"
export const Standard = "12"
export const SubAddress = "2a"
export const Integrated = "13"

// checkAddress checks the address provided below and returns a boolean and a network id.
export const checkAddress = (address: string) :[boolean, string] => {
    let netByte;
    if (address.length !== 95 && address.length !== 97 && address.length !== 51 && address.length !== 106){
        return [false, null];
    }
    const hex = base58.decode(address).toString("hex")

    if (hex.length !== 138 && hex.length !== 140){
        return [false, null];
    }

    if (hex.length === 140){
        netByte = hex.slice(0,4);
    } else {
        netByte = hex.slice(0,2);
    }
    const addrHash = keccak256(hextobin(hex.slice(0, -8)));

    return [hex.slice(-8) == addrHash.slice(0, 8), netByte.toString()];
}

const hextobin = (hex: string) => {
    if (hex.length % 2 !== 0) throw "Hex string has invalid length!";
    const res = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length / 2; ++i) {
        res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return res;
}
