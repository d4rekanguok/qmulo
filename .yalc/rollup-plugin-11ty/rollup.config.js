export default {
  input: 'index.js',
  output: {
    file: 'index.cjs.js',
    format: 'cjs',
  },
  external: ['child_process'],
}