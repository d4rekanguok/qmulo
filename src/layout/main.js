import { css } from 'linaria'
import vhtml from '_vhtml'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'
import { Box } from '../components/box'
import { Test } from '../components/test'

const header_style = css` 
  color: yellow;
  font-size: 2rem;
`

export default function ({ site, collections }) {
  return (
    <HTML head={
      <>
        <link rel="stylesheet" type="text/css" href="/css/main.css" />
        <script src="/js/main.extracted.js" defer />
      </>
    }>
      <Test>Hey this should work</Test>
      <Box br={`500px`}></Box>
      {site.title} {site.url} {this.double(120)}
      <h1 className={header_style}>Main Page</h1>
      <ul>{collections.post.map((post) => (
        <a href={post.url}><li>{post.data.title}</li></a>
      ))}</ul>
      <Footer year={1500} />
    </HTML>
  )
}