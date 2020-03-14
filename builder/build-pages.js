const fs = require('fs-extra')
const path = require('path')

const templatePage = require('../_temp/pages/main')
const templatePost = require('../_temp/pages/post')

// global data
const globalData = require('../_data/site.json')

const buildDir = path.join(__dirname, '../_site')
fs.ensureDirSync(buildDir)

;[templatePage, templatePost].forEach(page => {
  const allPageData = extractData({ page })
  allPageData.forEach(pageData => {
    const { permalink } = pageData.metadata

    renderHTML({
      buildDir,
      template: page.render,
      data: {
        site: globalData,
        data: pageData,
        collections: {
          post: [],
        },
      },
      permalink,
    })
  })
})

/**
 * get data from page, also make it always an array
 */
function extractData({ page }) {
  let pageData = []
  if (typeof page.getData !== 'function') {
    throw new Error(`[qmulo] Hey this page has no getData`)
  }

  const data = page.getData()
  if (Array.isArray(data)) {
    pageData = pageData.concat(data)
  } else {
    pageData.push(data)
  }

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
  template,
  data,
  permalink,
}) {
  const renderedPage = template(data)
  const htmlPath = permalinkToHTMLPath(permalink)

  fs.ensureFileSync(htmlPath)
  fs.writeFileSync(htmlPath, renderedPage)
}