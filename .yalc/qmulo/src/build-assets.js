import path from 'path'
import { transform } from '../../../plugins/sharp'

const processList = []

export function addToProcessList(jobArguments) {
  const { output } = jobArguments
  
  const siteDir = path.join(process.cwd(), '_site/')
  const dest = path.join(siteDir, output)

  processList.push({
    ...jobArguments,
    output: dest
  })
}

export function processAssets({ processed }) {
  const processP = processList.map((jobArguments) => transform(jobArguments, { processed }))
  return Promise.all(processP)
}