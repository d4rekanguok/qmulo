const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const { processAssets } = require('./build-assets')
const { getDatabase } = require('./database')

const buildDir = path.join(process.cwd(), './_site')
fs.ensureDirSync(buildDir)

// collections
const collections = {
  pages: []
}

run()

async function run() {
  // init database
  const database = await getDatabase()

  const pages = glob
    .sync(path.join(process.cwd(), './_temp/pages/*.js'))
    .map(filePath => require(filePath))

  const globalData = glob
    .sync(path.join(process.cwd(), './_data/*.json'))
    .reduce((acc, filePath) => {
      const { name } = path.parse(filePath)
      acc[name] = require(filePath)
      return acc
    }, {})

  const allPageData = pages.reduce((acc, page) => {
    const pageData = processData({ page })
    acc = acc.concat(pageData)
    return acc
  }, [])

  collections.pages = allPageData.map(allPageData => allPageData.metadata)

  console.log('[qmulo] Rendering pages')
  // render pages
  const renderP = allPageData.map(pageData => {
    const { renderer, ..._pageData } = pageData
    const { permalink } = _pageData.metadata
    return renderHTML({
      buildDir,
      renderer,
      data: {
        ...globalData,
        data: _pageData,
        collections,
      },
      permalink,
    })
  })
  
  Promise.all(renderP)

  // build assets post-render
  console.log('[qmulo] Building Assets')
  const processed = database.getCollection('processed')
  await processAssets({ processed })

  console.log('[qmulo] Done')
}

/**
 * group data with tags
 */
function populateCollection({ data }) {
  data.forEach(datum => {
    const { tags: _tags } = datum.metadata
    if (_tags) {
      const tags = Array.isArray(_tags)
        ? _tags
        : [_tags]
      
      tags.forEach(tag => {
        if (typeof collections[tag] === 'undefined') collections[tag] = []
        collections[tag].push(datum.metadata)
      })
    }
  })
}

function permalinkToUrl(permalink) {
  if (permalink.endsWith('/')) return permalink
  if (path.parse(permalink).ext === '') {
    return permalink + '/'
  }
  return permalink
}

/**
 * get data from page, also make it always an array
 */
function processData({ page }) {
  const renderer = page.render

  if (typeof page.getData !== 'function') {
    throw new Error(`[qmulo] Hey this page has no getData`)
  }

  const data = page.getData()
  const _pageData = Array.isArray(data)
    ? data
    : [data]

  const pageData = _pageData.map(data => {
    data.renderer = renderer
    data.metadata.permalink = permalinkToUrl(data.metadata.permalink)
    return data
  })

  populateCollection({ data: pageData })
  
  return pageData
}

/**
 * If path_name is not already a `something.html`,
 * append `/index.html` to it (i.e `post/hello-word` -> `post/hello-word/index.html`)
 * @param {string} path_name 
 */
function appendHTMLExt(path_name) {
  const { ext } = path.parse(path_name)
  if (ext === '.html') return path_name

  return path_name + '/index.html'
}

/**
 * TODO: filter out all weird character stuff
 * @param {string} permalink 
 */
function permalinkToHTMLPath(permalink) {
  return appendHTMLExt(path.join(buildDir, permalink))
}

/**
 * Render each page
 */
async function renderHTML({
  buildDir,
  renderer,
  data,
  permalink,
}) {
  const renderedPage = renderer(data)
  const htmlPath = permalinkToHTMLPath(permalink)

  await fs.ensureFile(htmlPath)
  await fs.writeFile(htmlPath, renderedPage)
}