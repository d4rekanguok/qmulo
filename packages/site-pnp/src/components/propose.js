import vhtml from 'vhtml-frag'
import { css } from 'linaria'

const style = css`
  color: var(--color);
`

export const Test = ({ children, color = 'red' }) => {
  const ref = useRef()
  useScript(({ color }) => {
    ref.onclick = () => {
      console.log(`current color: ${color}`)
    }
  })

  return (
    <div data-ref={ref} className={style} style={`--color: ${color};`}>
      {children}
    </div>
)}

function useRef() {
  return 'uniqueId'
}