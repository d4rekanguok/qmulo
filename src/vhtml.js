import vhtml from 'vhtml'

export default {
  frag: ({ children }) => vhtml(null, null, ...children),
  h: vhtml,
}