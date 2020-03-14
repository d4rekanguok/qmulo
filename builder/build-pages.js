const fs = require('fs-extra')
const path = require('path')

const main_page = require('../_11ty/layout/main.11ty')

const data = require('../_data/site.json')
const rendered = main_page({
  site: data,
  collections: {
    post: [],
  },
})

const build_dir = path.join(__dirname, '../_bare_site')

fs.ensureDirSync(build_dir)
fs.writeFileSync(path.join(build_dir, 'index.html'), rendered)
console.log('built.')