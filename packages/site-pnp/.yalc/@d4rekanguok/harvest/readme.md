Your components
```js
import { createRef, createScript } from 'seesee'

export function Element() {
  const $ref = createRef()
  createScript(() => {
    $ref.onclick = () => console.log('what')
  })
  return `<button data-ref="${$ref}">Hello</button>`
}
```

Output
```js
/* bundle.js */
/* ... */
function Element() {
  const $ref = "qUk3s0Ah7";
  return `<button data-ref="${$ref}">Hello</button>`;
}

/* extracted.js */
(() => {
  const $elems = document.querySelectorAll('[data-ref="qUk3s0Ah7"]');
  Array.from($elems).forEach($elem => {
    
$ref.onclick = () => console.log('what')

  });
})();
```
