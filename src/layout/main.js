import { css } from 'linaria'
import vhtml from '../vhtml'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'
import { Test } from '../components/test'

const header_style = css` 
  color: yellow;
  font-size: 2rem;
`

export default ({ title = 'Pen&Pillow', collections }) => (
  <HTML head={
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
  }>
    <h1 className={header_style}>Main Page</h1>
    <ul>{collections.post.map((post) => (
      <a href={post.url}><li>{post.data.title}</li></a>
    ))}</ul>
    <Footer year={1500} />
  </HTML>
)