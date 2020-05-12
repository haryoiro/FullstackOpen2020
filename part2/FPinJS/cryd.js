const fs = require('fs')
const zlib = require('zlib')
const crypto = require('crypto')

const gnzip = zlib.createGunzip()
const read = fs.createReadStream('./P4.zip')
const write = fs.createWriteStream('./P4gun.txt')
const decrypto = crypto.createDecipher('aes192', 'Haryoiro')

read
  .pipe(gnzip)
  .pipe(decrypto)
  .pipe(write)