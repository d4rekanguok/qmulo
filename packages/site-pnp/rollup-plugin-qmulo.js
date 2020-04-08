import { run } from 'qmulo'

function green(msg) {
  return '\u001b[1m\u001b[32m' + msg + '\u001b[39m\u001b[22m'
}

let count = 0

export default function qmulo() {
  return {
    name: 'qmulo',
    writeBundle: function() {
      console.log(`called ${count++}`)
      return run()
    }
  }
}