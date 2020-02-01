import { h, frag } from '../vhtml'
import { css } from 'linaria'

const style = css`
  color: var(--color);
`

export const Test = ({ children, color = 'red' }) => (
  <>
    <div id="hey" className={style} style={`--color: ${color};`}>
      {children}
    </div>
    <div>Frag works!</div>
  </>
)