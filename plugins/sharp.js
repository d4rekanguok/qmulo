import sharp from 'sharp'

function transform({ input, width, ext, output }) {
  return sharp(input)
    .resize(width)
    .toFile(output)
}