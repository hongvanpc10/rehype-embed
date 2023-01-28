import { Element } from 'hast'
import { Options } from '.'

export default function createIframe(src: string, options: Options = {}) {
	return <Element>{
		type: 'element',
		tagName: 'iframe',
		children: [],
		properties: {
			src,
			frameborder: '0',
			allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
			allowfullscreen: true,
			style: 'width: 100%; aspect-ratio: 16 / 9; border-radius: 0.75rem',
			...options,
		},
	}
}
