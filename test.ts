const index = require("./index")

test("should check for a valid address", () => {
    expect(index.checkAddress("46ZuzExCYzhEntqwZg1XceExUWqKiTtbpPdAX56PWsJhRQqFKuJ86ADQzqLEkCaKvCeCNLw8vWLC9LGKnu8rgGjmPayhMXd")).toBe([true, "12"])
});

test("should work with subaddress", () => {
    expect(index.checkAddress("856GjQgWDtbbWuwg97ZLuLiUEy9Nj3n9wD7grRE9nqPfQDw4iMCG9roZu3QvpHGzwwYCaFiayM45hZZb6GNawygH9NLQQbF")).toBe([true, "2a"])
})

// test("should work with integrated address", () => {
//     expect(index.checkAddress("4LL9oSLmtpccfufTMvppY6JwXNouMBzSkbLYfpAV5Usx3skxNgYeYTRj5UzqtReoS44qo9mtmXCqY45DJ852K5Jv2bYXZKKQePHES9khPK")).toBe(true)
// })

test("should not work with garbage letters", () => {
    expect(index.checkAddress("hello world")).toBe([false, null])
})
