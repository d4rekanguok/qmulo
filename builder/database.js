const path = require('path')
const Loki = require('lokijs')

let imageCache = null

function getDatabase() {
  return new Promise((resolve, reject) => {
    if (imageCache !== null) {
      resolve(imageCache)
    } else {
      const _imageCache = new Loki(path.join(process.cwd(), '.cache', 'image.db'), {
        autoload: true,
        autoloadCallback: cb,
        autosave: true,
        autosaveInterval: 4000,
      })
      
      function cb(err) {
        if (err) {
          reject(err)
        }
        let processed = _imageCache.getCollection('processed')
        if (processed === null) {
          processed = _imageCache.addCollection('processed')
        }
        imageCache = _imageCache
        resolve(imageCache)
      }
    }
  })
}

// const imageCache = new Loki(path.join(process.cwd(), '.cache', 'image.db'))
// const processed = imageCache.addCollection('processed')

exports.getDatabase = getDatabase