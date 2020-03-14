const fs = require('fs-extra')
const path = require('path')

const template_page = require('../_temp/pages/main')
const template_post = require('../_temp/pages/post')

// global data
const data = require('../_data/site.json')

let post_data
if (typeof template_post.getData === 'function') {
  post_data = template_post.getData()
}

const build_dir = path.join(__dirname, '../_site')
fs.ensureDirSync(build_dir)

render_html({
  build_dir,
  template: template_page.default,
  data: {
    site: data,
    collections: {
      post: [],
    },
  },
  html_path: template_page.getData()
})

render_html({
  build_dir,
  template: template_post.default,
  data: {
    data: post_data[0],
    site: data,
  },
  html_path: post_data[0].metadata.permalink,
})

/**
 * If path_name is not already a `something.html`,
 * append `/index.html` to it (i.e `post/hello-word` -> `post/hello-word/index.html`)
 * @param {string} path_name 
 */
function append_html_ext(path_name) {
  const { ext } = path.parse(path_name)
  if (ext === '.html') return path_name

  return path_name + '/index.html'
}

/**
 * Render each page
 */
function render_html({
  build_dir,
  template,
  data,
  html_path,
}) {
  const rendered_page = template(data)
  const _html_path = append_html_ext(path.join(build_dir, html_path))

  fs.ensureFileSync(_html_path)
  fs.writeFileSync(_html_path, rendered_page)
}