import handler from 'serve-handler'
import http from 'http'

function green(msg) {
  return '\u001b[1m\u001b[32m' + msg + '\u001b[39m\u001b[22m'
}

let server = null

export default function serve(options) {
  if (server === null) {
    server = http.createServer((request, response) => {
      return handler(request, response, {
        ...options,
      })
    })
  }

  return {
    name: 'zeit-serve',
    writeBundle: () => {
      if (server.listening) {
        console.log(green('Running at http://localhost:5000'))
        return
      }

      server.listen(5000, () => {
        console.log(green('Running at http://localhost:5000'))
      });
    }
  }
}