'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vhtml = _interopDefault(require('_vhtml'));
var react = require('linaria/react');

const global_style = "g1v83qto";
const HTML = ({
  title = 'Pen&Pillow',
  children,
  head = null
}) => vhtml.h("html", {
  lang: "en"
}, vhtml.h("head", null, vhtml.h("meta", {
  charset: "UTF-8"
}), vhtml.h("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1.0"
}), vhtml.h("meta", {
  "http-equiv": "X-UA-Compatible",
  content: "ie=edge"
}), vhtml.h("title", null, title), head), vhtml.h("script", {
  src: "/js/instantpage.js",
  type: "module",
  defer: true
}), vhtml.h("body", {
  class: global_style
}, children));

const Footer = ({
  year = 1000
}) => vhtml.h("p", null, "Footer ", year);

const Box =
/*#__PURE__*/
react.styled("div")({
  name: "Box",
  class: "bdmcdfn",
  vars: {
    "bdmcdfn-0": [({
      color
    }) => color || 'green'],
    "bdmcdfn-1": [({
      br
    }) => br ? br : '4px']
  }
});

// code
const Test = ({
  children
}) => {
  const $ref = "SchIn2Lvc";
  return vhtml.h("button", {
    "data-ref": $ref
  }, children);
};

const header_style = "h13ak7e3";
function main ({
  site,
  collections
}) {
  return vhtml.h(HTML, {
    head: vhtml.h(vhtml.frag, null, vhtml.h("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "/css/main.css"
    }), vhtml.h("script", {
      src: "/js/main.extracted.js",
      defer: true
    }))
  }, vhtml.h(Test, null, "Hey this should work"), vhtml.h(Box, {
    br: `500px`
  }), site.title, " ", site.url, vhtml.h("h1", {
    className: header_style
  }, "Main Page"), vhtml.h("ul", null, collections.post.map(post => vhtml.h("a", {
    href: post.url
  }, vhtml.h("li", null, post.data.title)))), vhtml.h(Footer, {
    year: 1500
  }));
}

module.exports = main;
