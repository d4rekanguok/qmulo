import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: path.join(__dirname, './src/index.js'),
  output: {
    file: path.join(__dirname, './cjs/index.js'),
    format: 'cjs',
  },
  external: [
    'vhtml',
  ],
  plugins: [
    resolve(),
    commonjs(),
  ],
}