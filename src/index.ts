import { Root } from 'hast'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface Options {
	style?: string
	allow?: string
	allowfullscreen?: boolean
	class?: string
}

const defaultOptions: Options = {
	allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
	allowfullscreen: true,
	style: 'width: 100%; aspect-ratio: 16 / 9; border-radius: 0.75rem',
}

const rehypeEmbed: Plugin<[Options?], Root> = options => tree =>
	visit(tree, 'element', node => {
		if (node.tagName === 'p') {
			const youtubeUrlRegex =
				/https:\/\/(www\.)?youtu\.?be(\.com)?\/(watch\?v=)?[A-Za-z0-9-_]{11}((&|\?).+)?/

			const embedRegex =
				/\{@embed:https:\/\/(www\.)?youtu\.?be(\.com)?\/(watch\?v=)?[A-Za-z0-9-_]{11}((&|\?).+)?\}/

			const children = node.children

			if (
				children.length === 1 &&
				children[0].type === 'text' &&
				embedRegex.test(children[0].value)
			) {
				const src =
					'https://www.youtube.com/embed/' +
					children[0].value.match(/[A-Za-z0-9-_]{11}/)?.[0]

				node.children = [
					{
						type: 'element',
						tagName: 'iframe',
						children: [],
						properties: {
							src,
							frameborder: '0',
							allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
							allowfullscreen: true,
						},
					},
				]
			}

			if (
				children.length === 2 &&
				children[0].type === 'text' &&
				/\{@embed:/.test(children[0].value) &&
				children[1].type === 'element' &&
				children[1].children[0].type === 'text' &&
				youtubeUrlRegex.test(children[1].children[0].value)
			) {
				const src =
					'https://www.youtube.com/embed/' +
					children[1].children[0].value.match(
						/[A-Za-z0-9-_]{11}/
					)?.[0]

				node.children = [
					{
						type: 'element',
						tagName: 'iframe',
						children: [],
						properties: {
							src,
							frameborder: '0',
							...defaultOptions,
							...options,
						},
					},
				]
			}
		}
	})

export default rehypeEmbed
