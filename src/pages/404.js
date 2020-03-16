import { css } from 'linaria'
import vhtml from '_vhtml'

import { HTML } from '../components/html'

export function render({ site, collections }) {
  const { pages } = collections
  return (
    <HTML>
      {site.title} {site.url}
      <h1>Dev 404</h1>
      <ul>{pages.map(({ permalink, title }) => (
        <li>
          <a href={permalink}>{ title } ({ permalink })</a>
        </li>
      ))}</ul>
    </HTML>
  )
}

export function getData() {
  return {
    metadata: {
      permalink: '404.html',
    }
  }
}