import { expect, test } from "bun:test";
import {checkAddress, Standard} from "../src";

test("should check for a valid address", () => {
    expect(checkAddress("46ZuzExCYzhEntqwZg1XceExUWqKiTtbpPdAX56PWsJhRQqFKuJ86ADQzqLEkCaKvCeCNLw8vWLC9LGKnu8rgGjmPayhMXd")).toEqual({
        isValid: true,
        type: "Standard",
        networkByte: "12"
    })
});

test("should work with subaddress", () => {
    expect(checkAddress("856GjQgWDtbbWuwg97ZLuLiUEy9Nj3n9wD7grRE9nqPfQDw4iMCG9roZu3QvpHGzwwYCaFiayM45hZZb6GNawygH9NLQQbF")).toEqual({
        isValid: true,
        type: "SubAddress",
        networkByte: "2a"
    })
})

test.todo("should work with integrated address", () => {
    expect(checkAddress("4LL9oSLmtpccfufTMvppY6JwXNouMBzSkbLYfpAV5Usx3skxNgYeYTRj5UzqtReoS44qo9mtmXCqY45DJ852K5Jv2bYXZKKQePHES9khPK")).toEqual({
        isValid: true,
        type: "Integrated",
        networkByte: "13"
    })
})

test("should not work with garbage letters", () => {
    expect(checkAddress("hello world")).toEqual({
        isValid: false
    })
})
