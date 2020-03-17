const path = require('path')
const { transform } = require('../plugins/sharp')

const processList = []

exports.addToProcessList = function(jobArguments) {
  const { output } = jobArguments
  
  const siteDir = path.join(process.cwd(), '_site/')
  const dest = path.join(siteDir, output)

  processList.push({
    ...jobArguments,
    output: dest
  })
}

exports.processAssets = function({ processed }) {
  const processP = processList.map((jobArguments) => transform(jobArguments, { processed }))
  return Promise.all(processP)
}