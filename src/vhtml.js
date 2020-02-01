import vhtml from 'vhtml'

export const frag = ({ children }) => vhtml(null, null, ...children)
export const h = vhtml