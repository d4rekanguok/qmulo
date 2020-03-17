'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vhtml = _interopDefault(require('vhtml-frag'));
var is_prop_valid = _interopDefault(require('@emotion/is-prop-valid'));

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
    if (is_prop_valid(key)) {
      valid_props[key] = props[key];
    }

    return valid_props;
  }, {});
}

exports.styled = styled;
