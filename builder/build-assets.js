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

exports.processAssets = function() {
  const processP = processList.map((jobArguments) => transform(jobArguments))
  return Promise.all(processP)
}