module.exports = (config) => {
  config.addJavaScriptFunction('double', x => x * 2)
  config.addPassthroughCopy({
    // node_modules
    'node_modules/instant.page/instantpage.js': 'js/instantpage.js',

    // css
    '_11ty/css/': 'css/'
  })

  config.setUseGitIgnore(false)
  config.addWatchTarget('_11ty/css/')

  return {
    dir: {
      includes: '_11ty/layout'
    }
  }
}