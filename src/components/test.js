import vhtml from '_vhtml'
import { css } from 'linaria'

import { Script } from './script'

const style = css`
  color: var(--color);
`

export const Test = ({ children, color = 'red' }) => (
  <>
    <div id="hey" className={style} style={`--color: ${color};`}>
      {children}
    </div>
    <Script>
      {`
        const $hey = document.getElementById('hey')
        $hey.onclick = () => {
          console.log('adads')
        }
      `}
    </Script>
  </>
)