import path from 'path'
import { transform } from 'qmulo-plugin-sharp'

let processList = []

export function addToProcessList(jobArguments) {
  const { output } = jobArguments
  
  const siteDir = path.join(process.cwd(), '_site/')
  const dest = path.join(siteDir, output)

  processList.push({
    ...jobArguments,
    output: dest
  })
}

export async function processAssets({ processed }) {
  const processP = processList.map((jobArguments) => transform(jobArguments, { processed }))
  await Promise.all(processP)
  processList = []
}