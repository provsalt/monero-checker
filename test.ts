const index = require("./index")

test("should check for a valid address", () => {
    expect(index.checkAddress("46ZuzExCYzhEntqwZg1XceExUWqKiTtbpPdAX56PWsJhRQqFKuJ86ADQzqLEkCaKvCeCNLw8vWLC9LGKnu8rgGjmPayhMXd")).toBe(true)
});

test("should work with subaddress", () => {
    expect(index.checkAddress("86XvTofZRPJT4avRkPcLn3ASupzbWB8os7Hemt6mzYAkPb8oD3pJcnwGEtW9tz4nNuEuBP6QNX4YgBx77GBANMzP9TLMLCv")).toBe(true)
})

// test("should work with integrated address", () => {
//     expect(index.checkAddress("4LL9oSLmtpccfufTMvppY6JwXNouMBzSkbLYfpAV5Usx3skxNgYeYTRj5UzqtReoS44qo9mtmXCqY45DJ852K5Jv2bYXZKKQePHES9khPK")).toBe(true)
// })

test("should not work with garbage letters", () => {
    expect(index.checkAddress("hello world")).toBe(false)
})