import { css } from 'linaria'
import h from 'vhtml'

import { Footer } from '../components/footer'
import { Test } from '../components/test'

const global_style = css`
  :global() {
    html {
      font-family: sans-serif;
      background-color: lavender;
    }
  }
`

const header_style = css` 
  color: blue;
  font-size: 2rem;
`

export default ({ title = 'Pen&Pillow', content }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{ title }</title>
      <link rel="stylesheet" type="text/css" href="/css/styles.css" />
    </head>
    <body class={global_style}>
      <Test>Hello Mello</Test>
      <h1 className={header_style}>Hello World</h1>
      <div dangerouslySetInnerHTML={{
        __html: content,
      }}></div>
      <Footer year={2020} />
    </body>
  </html>
)