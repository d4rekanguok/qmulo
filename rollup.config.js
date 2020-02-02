import path from 'path'
import glob from 'glob'

import linaria from 'linaria/rollup'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'

const get_output = (input) => {
  const { name } = path.parse(input)
  return {
    output_file: `_11ty/layout/${name}.11ty.js`,
    output_css: `_11ty/css/${name}.css`,
  }
}

const apply_config = (input) => {
  const { output_file, output_css } = get_output(input)
  return {
    input,
    output: {
      file: output_file,
      format: 'cjs',
    },
    external: ['vhtml'],
    plugins: [
      babel(),
      resolve(),
      commonjs(),
      linaria({
        sourceMap: process.env.NODE_ENV !== 'production',
      }),
      css({
        output: output_css,
      }),
    ],
  }
}

export default glob.sync('src/layout/*.js').map(apply_config)