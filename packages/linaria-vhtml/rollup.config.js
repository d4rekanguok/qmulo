import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: path.join(__dirname, './src/index.js'),
  output: {
    file: path.join(__dirname, './cjs/index.js'),
    format: 'cjs',
  },
  external: [
    'vhtml-frag',
    '@emotion/is-prop-valid',
  ],
  plugins: [
    babel(),
    resolve(),
    commonjs(),
  ],
}