const zlib = require('zlib');
const fs = require('fs');
const  Buffer = require('buffer').Buffer

const content = fs.readFileSync('/Users/lyxxxx/Own/git-test/.git/objects/03/6686b3c477c3f9b2b78420f42444444f898241')
const result = zlib.inflateSync(Buffer.from(content))
console.log(result)
console.log(result.toString())

