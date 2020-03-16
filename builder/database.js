const path = require('path')
const Loki = require('lokijs')

// const imageCache = new Loki(path.join(process.cwd(), '.cache', 'image.db'), {
//   autoload: true,
//   autosave: true,
//   autoloadCallback: initDatabase
//   autosaveInterval: 4000
// })

// function initDatabase() {
//   let processed = imageCache.getCollection('processed')
//   if (processed === null) {
//     processed = imageCache.addCollection('processed')
//   }
// }

const imageCache = new Loki(path.join(process.cwd(), '.cache', 'image.db'))
const processed = imageCache.addCollection('processed')

exports.imageCache = imageCache