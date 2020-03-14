import path from 'path'
import glob from 'glob'

import linaria from 'linaria/rollup'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import eleventy from './packages/rollups-plugin-11ty'
import serve from 'rollup-plugin-serve'
import css from 'rollup-plugin-css-only'
import harvest from '@d4rekanguok/harvest/rollup'

const is_dev = process.env.ROLLUP_WATCH === 'true'

const get_file_name = (input) => {
  const { name } = path.parse(input)
  return { name }
}

const apply_config = (input, i) => {
  const { name } = get_file_name(input)
  return {
    input,
    output: {
      file: `_11ty/layout/${name}.11ty.js`,
      format: 'cjs',
    },
    external: ['vhtml'],
    plugins: [
      alias({
        entries: {
          '_vhtml': path.resolve(__dirname, './packages/vhtml'),
          'linaria/react': path.resolve(__dirname, './packages/linaria-vhtml')
        }
      }),
      babel(),
      resolve(),
      commonjs(),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      css({
        output: `_11ty/css/${name}.css`,
      }),
      harvest({
        output: path.resolve(__dirname, `_site/js/${name}.extracted.js`)
      }),
      is_dev && eleventy()
    ],
  }
}

const add_dev_plugins = (configs) => {
  if (is_dev) {
    configs[configs.length - 1].plugins.push(
      serve({
        contentBase: '_site',
        port: 8080
      })
    )
  }

  return configs
}

const configs = glob.sync('src/layout/*.js').map(apply_config)
export default add_dev_plugins(configs)