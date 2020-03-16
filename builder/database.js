const Loki = require('lokijs')

const imageCache = new Loki(path.join(process.cwd(), '.cache', 'image.db'), {
  autoload: true,
  autosave: true,
  autoloadCallback: initDatabase, 
})

function initDatabase() {
  let processed = imageCache.getCollection('processed')
  if (processed === null) {
    processed = imageCache.addCollection('processed')
  }
}

exports.imageCache = imageCache