import path from 'path'
import Loki from 'lokijs'

let database = null

// TODO: Need a way to confirm the output file still exists. If not, remove them from db.
export function getDatabase() {
  return new Promise((resolve, reject) => {
    if (database !== null) {
      resolve(database)
    } else {
      const _database = new Loki(path.join(process.cwd(), '.cache', 'image.db'), {
        autoload: true,
        autoloadCallback: cb,
        autosave: true,
        autosaveInterval: 4000,
      })
      
      function cb(err) {
        if (err) reject(err)
        let processed = _database.getCollection('processed')
        if (processed === null) {
          processed = _database.addCollection('processed')
        }
        database = _database
        resolve(database)
      }
    }
  })
}
