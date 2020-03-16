const sharp = require('sharp')
const path = require('path')
const crypto = require('crypto')

const { getDatabase } = require('../builder/database')

exports.transform = async function(args) {
  const imageCache = await getDatabase()
  const processed = imageCache.getCollection('processed')
  
  const id = crypto
    .createHash('md5')
    .update(JSON.stringify(args))
    .digest('hex')
  const result = processed.find({ id: { '$eq': id } })
  if (result) {
    console.log(`Skipped: ${args.input} has already been processed.`)
    return
  }

  const { input, width, ext, output } = args
  try {
    await sharp(input)
      .resize(width)
      .toFile(output)

    processed.insert({
      id,
      args,
    })
  } catch(err) {
    throw err
  }

  console.log('image done')
}