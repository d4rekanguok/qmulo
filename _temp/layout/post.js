'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vhtml = _interopDefault(require('_vhtml'));

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

// code
const Test = ({
  children
}) => {
  const $ref = "rsFXRSdi46";
  return vhtml.h("button", {
    "data-ref": $ref
  }, children);
};

const header_style = "h1d3w40g";
function post ({
  title = 'Pen&Pillow',
  content
}) {
  return vhtml.h(HTML, {
    head: vhtml.h(vhtml.frag, null, vhtml.h("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "/css/post.css"
    }), vhtml.h("script", {
      src: "/js/post.extracted.js",
      defer: true
    }))
  }, vhtml.h("h1", {
    className: header_style
  }, "Hello World"), vhtml.h("div", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), vhtml.h(Test, null, "Heooo"), vhtml.h(Footer, {
    year: 2020
  }));
}

module.exports = post;
