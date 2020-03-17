import { run } from 'qmulo'

function green(msg) {
  return '\u001b[1m\u001b[32m' + msg + '\u001b[39m\u001b[22m'
}

export default function qmulo() {
  return {
    name: 'qmulo',
    generateBundle: function() {
      return run()
    }
  }
}