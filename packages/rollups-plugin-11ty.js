import { exec } from 'child_process'

export default function eleventy() {
  return {
    name: '11ty',
    generateBundle: function() {
      exec('eleventy', (err) => {
        if (err) this.error(err)
        console.log('11ty built')
      })
    }
  }
}