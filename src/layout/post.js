import { css } from 'linaria'
import vhtml from '_vhtml'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'

const header_style = css` 
  color: green;
  font-size: 2rem;
`

export default ({ title = 'Pen&Pillow', content }) => (
  <HTML head={
    <link rel="stylesheet" type="text/css" href="/css/post.css" />
  }>
    <h1 className={header_style}>Hello World</h1>
    <div dangerouslySetInnerHTML={{
      __html: content,
    }}></div>
    <Footer year={2020} />
  </HTML>
)