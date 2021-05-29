const fs = require('fs');
const Buffer = require('buffer').Buffer
const crypto = require('crypto');

const toBit = (buffer) => {
    const result = []
    buffer.forEach(b => {
        const num = Number(b).toString(2)
        const num2 = Array(8 - num.length).fill(0).join('') + num
        result.push(num2)
    })
    return result.join('')
}


const bitToString = (bit) => {
    return bit.match(/\d{8}/g).map(d=>parseInt(d,2).toString(16)).join('')
}

const buffer = fs.readFileSync('/Users/lyxxxx/Own/git-test/.git/index')
console.log(buffer)

const identity = buffer.slice(0, 4).toString()

const version = +buffer.slice(4, 8).map(d => Number(d)).join('')
const fileNum = parseInt(toBit(buffer.slice(8, 12)), 2)

const ctimeSecond = parseInt(toBit(buffer.slice(12, 16)), 2)
const ctimeNanoSecond = parseInt(toBit(buffer.slice(16, 20)), 2)

const mtimeSecond = parseInt(toBit(buffer.slice(20, 24)),2)
const mtimeNanoSecond = parseInt(toBit(buffer.slice(24, 28)),2)

const dev = buffer.slice(28, 32)
const ino = buffer.slice(32, 36)

const mode = parseInt(toBit(buffer.slice(36, 40)), 2).toString(8)

const uid = parseInt(toBit(buffer.slice(40, 44)),2 )

const gid = parseInt(toBit(buffer.slice(44, 48)), 2)

const size = parseInt(toBit(buffer.slice(48, 52)), 2)

const sha = bitToString(toBit(buffer.slice(52, 72)))

const flags = toBit(buffer.slice(72, 74))
const nameLength = parseInt(flags.split('').slice(3, 16).join(''), 2)

const fileName = buffer.slice(74, 74+nameLength).toString()

const nextStart = 74+10
const sha2 = bitToString(toBit(buffer.slice(nextStart, buffer.length)))

const contentSum=crypto.createHash('sha1').update(buffer.slice(0, buffer.length-20)).digest('hex')

console.log({
    identity,
    version,
    fileNum,
    ctimeSecond,
    ctimeNanoSecond,
    mtimeSecond,
    mtimeNanoSecond,
    dev,
    ino,
    mode,
    uid,
    gid,
    size,
    sha,
    flags,
    fileName,
    nameLength,
    nextStart,
    bufferLength: buffer.length,
    sha2,
    contentSum,
})
