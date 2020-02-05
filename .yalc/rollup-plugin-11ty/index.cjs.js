'use strict';

var child_process = require('child_process');

function eleventy() {
  return {
    name: 'rollup-plugin-11ty',
    generateBundle: function () {
      this.warn('runn');
      child_process.exec('eleventy', (err, stdout, stderr) => {
        if (err) {
          this.error(err);
        }

        console.log('11ty built');
      });
    }
  }
}

module.exports = eleventy;
