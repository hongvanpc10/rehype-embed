import { Root } from 'hast'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import createIframe from './createIframe'

export interface Options {
	style?: string
	allow?: string
	allowfullscreen?: boolean
	class?: string
}

const rehypeEmbed: Plugin<[Options?], Root> = options => tree =>
	visit(tree, 'element', node => {
		if (node.tagName === 'p') {
			const embedRegex =
				/@embed:https:\/\/(www\.)?youtu\.?be(\.com)?\/(watch\?v=)?[A-Za-z0-9-_]{11}((&|\?).+)?/

			const children = node.children

			if (
				children.length === 1 &&
				children[0].type === 'text' &&
				embedRegex.test(children[0].value)
			) {
				const src =
					'https://www.youtube.com/embed/' +
					children[0].value.match(/[A-Za-z0-9-_]{11}/)?.[0]

				node.children = [createIframe(src, options)]
			}

			if (
				children.length === 2 &&
				children[0].type === 'text' &&
				children[1].type === 'element' &&
				children[1].children.length === 1 &&
				children[1].children[0].type === 'text' &&
				embedRegex.test(
					children[0].value + children[1].children[0].value
				)
			) {
				const src =
					'https://www.youtube.com/embed/' +
					children[1].children[0].value.match(
						/[A-Za-z0-9-_]{11}/
					)?.[0]

				node.children = [createIframe(src, options)]
			}
		}
	})

export default rehypeEmbed
