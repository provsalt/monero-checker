// @ts-ignore
import * as base58 from "base58-monero";
import { keccak256 } from "js-sha3";

/**
 * Represents the truncated address network byte.
 */
export type Truncated = "11";

/**
 * Represents the standard address network byte.
 */
export type Standard = "12";

/**
 * Represents the sub-address network byte.
 */
export type SubAddress = "2a";

/**
 * Represents the integrated address network byte.
 */
export type Integrated = "13";


/**
 * AddressByteTypes represents the possible byte identifiers of a Monero address Identifiers.
 */

export type AddressByteTypes = Truncated | Standard | SubAddress | Integrated;

/**
 * AddressTypes represents the possible types of a Monero address in string
 */
export type AddressLabel =
  | "Truncated"
  | "Standard"
  | "SubAddress"
  | "Integrated";

export type AddressByte = "11" | "12" | "2a" | "13";

export const AddressLabelToByte: Record<AddressLabel, AddressByte> = {
    Truncated: "11",
    Standard: "12",
    SubAddress: "2a",
    Integrated: "13"
};

export type NetworkByteTypes = {
    [key in AddressByte]: AddressLabel;
};

export const ByteToAddressLabel: NetworkByteTypes = {
    "11": "Truncated",
    "12": "Standard",
    "2a": "SubAddress",
    "13": "Integrated"
};


/**
 * Interface representing the result of a Monero address check.
 */
export type CheckAddressResult =
  | { isValid: true; networkByte: AddressByteTypes; type: AddressLabel }
  | { isValid: false };


/**
 * Checks the provided Monero address and returns an object indicating whether the address is valid
 * and its network id.
 *
 * @param address - The Monero address as a string.
 * @returns An object of type CheckAddressResult with properties isValid and networkId.
 */
export const checkAddress = (address: string): CheckAddressResult => {
    let netByte: AddressByteTypes;

    if (
      address.length !== 95 &&
      address.length !== 97 &&
      address.length !== 51 &&
      address.length !== 106
    ) {
        return { isValid: false };
    }

    const BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]+$/;

    if (!BASE58_REGEX.test(address)) {
        return { isValid: false };
    }

    const hex = base58.decode(address).toString("hex");

    if (hex.length !== 138 && hex.length !== 140) {
        return { isValid: false };
    }

    if (hex.length === 140) {
        netByte = hex.slice(0, 4);
    } else {
        netByte = hex.slice(0, 2);
    }

    const binData = hexToBin(hex.slice(0, -8));

    const addrHash = keccak256(binData);

    const isValid = hex.slice(-8) === addrHash.slice(0, 8);
    const type = ByteToAddressLabel[netByte]
    return { isValid, networkByte: netByte, type: type};
};

/**
 * Converts a hexadecimal string to a Uint8Array (binary representation).
 *
 * @param hex - The hexadecimal string.
 * @returns The Uint8Array representation of the hex string.
 * @throws Will throw an error if the hex string has an invalid length.
 */
const hexToBin = (hex: string): Uint8Array => {
    if (hex.length % 2 !== 0) throw new Error("Hex string has invalid length!");

    const res = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length / 2; ++i) {
        res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return res;
};
