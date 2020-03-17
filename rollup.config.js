import path from 'path'
import glob from 'glob'

import linaria from 'linaria/rollup'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import harvest from '@d4rekanguok/harvest/rollup'

import qmulo from './packages/rollup-plugin-qmulo'
import serve from './packages/rollup-plugin-zeit-serve'

const isDev = process.env.ROLLUP_WATCH === 'true'

const getFileName = (input) => {
  const { name } = path.parse(input)
  return { name }
}

const applyConfigs = (input, i) => {
  const { name } = getFileName(input)
  return {
    input,
    output: {
      file: `_temp/pages/${name}.js`,
      format: 'cjs',
    },
    external: [
      'vhtml', 
      '@emotion/is-prop-valid', 
      'path', 
      'fs-extra', 
      'image-size',
      'crypto',
      'qmulo',
    ],
    plugins: [
      alias({
        entries: {
          '_vhtml': path.resolve(__dirname, './packages/vhtml'),
          'linaria/react': path.resolve(__dirname, './packages/linaria-vhtml'),
        }
      }),
      babel(),
      resolve(),
      commonjs(),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      css({
        output: `_site/css/${name}.css`,
      }),
      harvest({
        output: path.resolve(__dirname, `_site/js/${name}.extracted.js`)
      }),
    ],
  }
}

const addDevPlugins = (configs) => {
  if (isDev) {
    configs[configs.length - 1].plugins.push(
      serve({
        public: '_site',
      }),
      qmulo()
    )
  }

  return configs
}

const configs = glob.sync('src/pages/*.js').map(applyConfigs)
export default addDevPlugins(configs)