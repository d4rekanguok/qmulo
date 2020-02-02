---
layout: post.11ty.js
tags: post
title: Hello
permalink: post/hello/index.html
---

# Hello!
This blog is now powered by Eleventy. I no longer use Gatsby for many reasons, but that's a topic for another day.

# 11ty
Eleventy is fun, but I miss writing template with JSX. I miss CSS-in-JS. Then I found that Eleventy can use `.js` as template file... it means I can hack together something like this!

If you peek at the source of this starter, you'll find something like this:

```js
import vhtml from '../vhtml'
import { css } from 'linaria'

const style = css`
  color: var(--color);
`

export const Test = ({ children, color = 'red' }) => (
  <>
    <div id="hey" className={style} style={`--color: ${color};`}>
      {children}
    </div>
    <div>Frag works!</div>
  </>
)
```

That's how this starter got started.

- Rollup
- CSS-in-JS
- JSX