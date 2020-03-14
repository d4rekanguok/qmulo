import { css } from 'linaria'
import vhtml from '_vhtml'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'
import { Box } from '../components/box'
import { Test } from '../components/test'

const headerStyle = css` 
  color: yellow;
  font-size: 2rem;
`

export function getData() {
  return {
    metadata: {
      permalink: 'index.html',
    }
  }
}

export function render({ site, collections }) {
  return (
    <HTML head={
      <>
        <link rel="stylesheet" type="text/css" href="/css/main.css" />
        <script src="/js/main.extracted.js" defer />
      </>
    }>
      <Test>Hey this should work</Test>
      <Box br={`500px`}></Box>
      {site.title} {site.url}
      <h1 className={headerStyle}>Main Page</h1>
      <ul>{collections.post.map((post) => (
        <a href={post.url}><li>{post.data.title}</li></a>
      ))}</ul>
      <Footer year={1500} />
    </HTML>
  )
}