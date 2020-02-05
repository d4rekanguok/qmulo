import { exec } from 'child_process'

export default function eleventy() {
  return {
    name: 'rollup-plugin-11ty',
    generateBundle: function () {
      this.warn('runn')
      exec('eleventy', (err, stdout, stderr) => {
        if (err) {
          this.error(err)
        }

        console.log('11ty built')
      })
    }
  }
}