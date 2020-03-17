import vhtml from 'vhtml-frag'
import { createScript, createRef } from '@d4rekanguok/harvest'

// code
export const Test = ({ children }) => {
  const $ref = createRef()
  createScript(() => {
    $ref.onclick = () => alert('hey')
  })
  return (
    <button data-ref={$ref}>
      {children}
    </button>
)}