const { transform } = require('../plugins/sharp')

const processList = []

exports.addToProcessList = function(job) {
  processList.push(job)
}
