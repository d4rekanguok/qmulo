import { css } from 'linaria'
import vhtml from '_vhtml'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'
import { Test } from '../components/test'

const header_style = css` 
  color: green;
  font-size: 2rem;
`

export default function ({ title = 'Pen&Pillow', content }) {
  return (
    <HTML head={
      <>
        <link rel="stylesheet" type="text/css" href="/css/post.css" />
        <script src="/js/post.extracted.js" defer />
      </>
    }>
      <h1 className={header_style}>Hello World</h1>
      <div dangerouslySetInnerHTML={{
        __html: content,
      }}></div>
      <Test>Heooo</Test>
      <Footer year={2020} />
    </HTML>
  )
}