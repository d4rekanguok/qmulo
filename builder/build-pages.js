const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')

const templatePage = require('../_temp/pages/main')
const templatePost = require('../_temp/pages/post')

// global data
const globalData = require('../_data/site.json')

// collections
const collections = {}

const buildDir = path.join(__dirname, '../_site')
fs.ensureDirSync(buildDir)

const pages = glob
  .sync(path.join(__dirname, '../_temp/pages/*.js'))
  .map(filePath => require(filePath))

const allPageData = pages.reduce((acc, page) => {
  const pageData = processData({ page })
  acc = acc.concat(pageData)
  return acc
}, [])

allPageData.forEach(pageData => {
  const { renderer, ..._pageData } = pageData
  const { permalink } = _pageData.metadata
  renderHTML({
    buildDir,
    renderer,
    data: {
      site: globalData,
      data: _pageData,
      collections,
    },
    permalink,
  })
})

/**
 * group data with tags
 */
function populateCollection({ data }) {
  data.forEach(datum => {
    const { permalink, tags: _tags, title } = datum.metadata
    if (_tags) {
      const tags = Array.isArray(_tags)
        ? _tags
        : [_tags]
      
      tags.forEach(tag => {
        if (typeof collections[tag] === 'undefined') collections[tag] = []
        collections[tag].push({
          permalink,
          title,
        })
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
    const { permalink } = data.metadata
    data.metadata.permalink = permalinkToUrl(permalink)
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
function renderHTML({
  buildDir,
  renderer,
  data,
  permalink,
}) {
  const renderedPage = renderer(data)
  const htmlPath = permalinkToHTMLPath(permalink)

  fs.ensureFileSync(htmlPath)
  fs.writeFileSync(htmlPath, renderedPage)
}