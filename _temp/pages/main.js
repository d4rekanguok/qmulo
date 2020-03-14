'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vhtml$1 = _interopDefault(require('vhtml'));

var vhtml = {
  frag: ({
    children
  }) => vhtml$1(null, null, ...children),
  h: vhtml$1
};

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

const styled = tag_name => options => {
  const Tag = tag_name;
  const {
    vars
  } = options;
  return ({
    children,
    className,
    style,
    ...props
  }) => {
    const variables = serialize_variables(vars, {
      props
    });
    const filtered_props = filter_props(props);
    return vhtml.h(Tag, _extends({}, filtered_props, {
      style: [style, variables].join(' '),
      className: [options.class, className].join(' ')
    }), children);
  };
};

function serialize_variables(vars, {
  props
}) {
  return Object.entries(vars).map(([variable_name, fns]) => {
    const value = fns[0](props);
    return `--${variable_name}: ${value};`;
  }).join('');
}

function filter_props(props) {
  return Object.keys(props).reduce((valid_props, key) => {
    if (index(key)) {
      valid_props[key] = props[key];
    }

    return valid_props;
  }, {});
}

const Box =
/*#__PURE__*/
styled("div")({
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
  const $ref = "x5EM76gV0";
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
