const sharp = require('sharp')
const path = require('path')
const crypto = require('crypto')

const { imageCache } = require('../builder/database')
const processed = imageCache.getCollection('processed')

const md5sum = crypto.createHash('md5')

exports.transform = async function(args) {
  // const id = md5sum.update(JSON.stringify(args)).digest('hex')
  // const result = processed.find({ id })
  // if (result) return

  const { input, width, ext, output } = args
  try {
    console.log({ input })
    await sharp(input)
      .resize(width)
      .toFile(output)
  } catch(err) {
    throw err
  }

  // processed.insert({
  //   id,
  //   args,
  // })

  console.log('image done')
}