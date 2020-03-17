'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vhtml = _interopDefault(require('vhtml'));

var index = {
  frag: ({ children }) => vhtml(null, null, ...children),
  h: vhtml,
};

module.exports = index;
