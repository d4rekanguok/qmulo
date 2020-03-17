import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: path.join(__dirname, './src/index.js'),
  output: {
    file: path.join(__dirname, './dist/index.js'),
    format: 'cjs',
  },
  external: [
    'path',
    'fs-extra', 
    'image-size',
    'glob',
    'sharp',
    'lokijs',
    'crypto',
  ],
  plugins: [
    resolve(),
    commonjs(),
  ],
}