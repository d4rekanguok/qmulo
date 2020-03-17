import path from 'path'

export function getFile(filePath) {
  const pageDir = path.join(process.cwd(), '/src/pages')
  return path.resolve(pageDir, filePath)
}