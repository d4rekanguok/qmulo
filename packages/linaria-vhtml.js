import vhtml from './vhtml'
import is_prop_valid from '@emotion/is-prop-valid'

export const styled = (tag_name) => (options) => {
  const Tag = tag_name
  const { vars } = options
  return ({ children, className, style, ...props }) => {
    const variables = serialize_variables(vars, { props })
    const filtered_props = filter_props(props)
    return (
      <Tag 
        {...filtered_props}
        style={[style, variables].join(' ')} 
        className={[options.class, className].join(' ')}>
          { children }
      </Tag>
    )
  }
}

function serialize_variables(vars, { props }) {
  return Object.entries(vars).map(([ variable_name, fns ]) => {
    const value = fns[0](props)
    return `--${variable_name}: ${value};`
  }).join('')
}

function filter_props(props) {
  return Object
    .keys(props)
    .reduce((valid_props, key) => {
      if (is_prop_valid(key)) {
        valid_props[key] = props[key]
      }
      return valid_props
    }, {})
}
