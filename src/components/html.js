import vhtml from '_vhtml'
import { css } from 'linaria'

const global_style = css`
  :global() {
    html {
      font-family: sans-serif;
      background-color: lightblue;
    }
  }
`

export const HTML = ({ title = 'Pen&Pillow', children, head = null }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{ title }</title>
      {head}
    </head>
    <script src="/js/instantpage.js" type="module" defer />
    <body class={global_style}>
      {children}
    </body>
  </html>
)