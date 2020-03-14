import { css } from 'linaria'
import vhtml from '_vhtml'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'
import { Test } from '../components/test'

const header_style = css` 
  color: green;
  font-size: 2rem;
`

export function getData() {
  return [{
    metadata: {
      permalink: 'post/hello-world',
      title: 'Hello World'
    },
    content: {
      html: '<h1>Hi, Hello</h1><p>super cool</p>'
    }
  }]
}

export default function ({ data }) {
  const { metadata, content } = data
  return (
    <HTML head={
      <>
        <link rel="stylesheet" type="text/css" href="/css/post.css" />
        <script src="/js/post.extracted.js" defer />
      </>
    }>
      <h1 className={header_style}>Hello World</h1>
      <div dangerouslySetInnerHTML={{
        __html: content.html,
      }}></div>
      <Test>Heooo</Test>
      <Footer year={2020} />
    </HTML>
  )
}