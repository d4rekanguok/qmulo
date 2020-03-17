import sharp from 'sharp'
import path from 'path'
import crypto from 'crypto'

export async function transform(args, { processed }) {
  const id = crypto
    .createHash('md5')
    .update(JSON.stringify(args))
    .digest('hex')
  const result = processed.find({ id: { '$eq': id } })
  if (result) {
    const { fileName, width } = args
    console.log(`Skipped: ${args.fileName} -> ${width} has already been transformed.`)
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