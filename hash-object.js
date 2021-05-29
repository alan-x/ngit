const zlib = require('zlib');
const fs = require('fs');
const Buffer = require('buffer').Buffer
const crypto = require('crypto');

const type = 'blob'
const content = process.argv[2]

const store = `${type} ${content.length}\0${content}`

const hash = crypto.createHash('sha1');
hash.update(store)
const objectID = hash.digest('hex')
const result = zlib.deflateSync(Buffer.from(store))

const path = '.git/objects'
const [a, b, ...file] = objectID
const dirPath = `${path}/${a}${b}`
const filePath = `${dirPath}/${file.join('')}`
fs.mkdirSync(dirPath)
fs.writeFileSync(filePath)
