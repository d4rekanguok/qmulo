import { spawn } from 'child_process'

const pids = new Set()

function green(msg) {
  return '\u001b[1m\u001b[32m' + msg + '\u001b[39m\u001b[22m'
}

export default function eleventy() {
  return {
    name: '11ty',
    generateBundle: function() {

      if (pids.size > 0) {
        for (let pid of pids) {
          process.kill(pid, 'SIGINT')
          // don't remove the pid from pids here
          // since that'll be handled by cp.on('close')
        }
      }

      const cp = spawn('eleventy', {
        stdio: 'inherit',
        shell: true
      })

      const current_pid = cp.pid
      pids.add(current_pid)

      cp.on('close', () => {
        pids.delete(current_pid)
        console.log(green('11ty done'))
      })

      cp.on('error', (err) => {
        pids.delete(current_pid)
        this.error(err)
      })
    }
  }
}