import { css } from 'linaria'
import vhtml from 'vhtml-frag'

import { HTML } from '../components/html'
import { Footer } from '../components/footer'
import { Box } from '../components/box'
import { Test } from '../components/test'

import { Image } from 'qmulo-plugin-sharp'

const imageStyle = css`
  position: relative;
  display: block;
  border: 1px solid red;
`

const List = ({ post }) => {
  const { permalink, featuredImage, title } = post
  return (
    <a href={permalink}>
      { featuredImage
        ? (
          <Image src={featuredImage} alt="wut" className={imageStyle} />
        )
        : null
      }
      <span>{ title }</span>
    </a>
  )
}

export function render({ site, collections }) {
  const { post } = collections
  return (
    <HTML head={
      <>
        <link rel="stylesheet" type="text/css" href="/css/main.css" />
        <script src="/js/main.extracted.js" defer />
      </>
    }>
      <Test>Hey this should work</Test>
      {site.title} {site.url}
      <h1>Main Page</h1>
      <ul>{post.map((post) => (
        <li>
          <List post={post} />
        </li>
      ))}</ul>
      <Footer year={1500} />
    </HTML>
  )
}

export function getData() {
  return {
    metadata: {
      permalink: 'index.html',
    }
  }
}