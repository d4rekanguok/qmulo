import handler from 'serve-handler'
import http from 'http'

function green(msg) {
  return '\u001b[1m\u001b[32m' + msg + '\u001b[39m\u001b[22m'
}

export default function serve(options) {
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      ...options,
    })
  })

  return {
    name: 'zeit-serve',
    generateBundle: () => {
      server.listen(5000, () => {
        console.log(green('Running at http://localhost:5000'));
      });
    }
  }
}