# Monero checker

### Easy to use monero address checker for sub-addresses and standard addresses no regex bs.

Integrated address support will come later.

### Installing
#### NPM
```bash
npm i monero-checker
bun i monero-checker
```

#### JSR with Deno
```bash
deno add jsr:@provsalt/monero-checker
```

### Checking if address is valid

```js
import {checkAddress} from "monero-checker";

console.log(checkAddress("something").isValid) // false
```
See the documentation in the source for more information on how to use the package.

### Contributing
currently, integrated address doesn't validate for some reason. gotta fix this. would love if someone could help contribute.

### Donating
Would be nice if you can tip me some monero if you liked the project, 
``856GjQgWDtbbWuwg97ZLuLiUEy9Nj3n9wD7grRE9nqPfQDw4iMCG9roZu3QvpHGzwwYCaFiayM45hZZb6GNawygH9NLQQbF``
