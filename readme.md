# @hongvanpc10/rehype-embed

Add improved video syntax: support embeds videos from youtube links.

## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be import instead of require.

```bash
npm install @hongvanpc10/rehype-embed
```

Or

```bash
yarn add @hongvanpc10/rehype-embed
```

## Usage

```js
import { unified } from 'unified'
import remark2rehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeEmbed from '@hongvanpc10/rehype-embed'
import stringify from 'rehype-stringify'

const string = `{@embed:https://www.youtube.com/watch?v=xsI0j3pO7vc}`

const htmlStr = unified()
  .use(remarkParse)
  .use(remark2rehype)
  .use(rehypeEmbed)
  .use(stringify)
  .processSync(string)
  .toString()
```

Output:

```html
<p>
  <iframe
    src="https://www.youtube.com/embed/xsI0j3pO7vc"
    style="width: 100%; aspect-ratio: 16 / 9; border-radius: 0.75rem"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen=""
  ></iframe>
</p>
```

## Custom Style

```js
const string = `{@embed:https://www.youtube.com/watch?v=xsI0j3pO7vc}`
const htmlStr = unified()
  .use(remarkParse)
  .use(remark2rehype)
  .use(rehypeEmbed, {
    style: 'width: 100%; aspect-ratio: 16 / 9; border-radius: 20px;',
    class: 'iframe'
  })
  .use(stringify)
  .processSync(string)
  .toString()
```

Output:

```html
<p>
  <iframe
    src="https://www.youtube.com/embed/xsI0j3pO7vc"
    style="width: 100%; aspect-ratio: 16 / 9; border-radius: 20px"
    class="iframe"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen=""
  ></iframe>
</p>
```

## Options

| Option | Type | Default |
| --- | --- | --- |
| **style** | `string` | `'width: 100%; aspect-ratio: 16 / 9; border-radius: 0.75rem'` |
| **allow** | `string` | `'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'` |
| **allowfullscreen** | `boolean` | `true` |
| **class** | `string` | |

## License

MIT © [Hong Van](https://github.com/hongvanpc10)
