import linaria from 'linaria/rollup'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/layout/main.js',
  output: {
    file: '_11ty/layout/main.11ty.js',
    format: 'cjs'
  },
  plugins: [
    babel(),
    resolve(),
    commonjs(),
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    css({
      output: '_11ty/css/styles.css',
    }),
  ],
}