module.exports = (config) => {
  config.addPassthroughCopy({
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