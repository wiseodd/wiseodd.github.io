import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax/chtml'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

export default defineConfig({
	site: 'https://agustinus.kristia.de',
	redirects: {
		'/about': '/',
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon()
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkMath],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			],
			[
				rehypeMathjax,
				{
					chtml: {
						fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
					},
					tex: {
						macros: {
							qed: ['\\tag*{$\\square$}'],
							R: ['\\mathbb{R}'],
							dint: ['\\mathrm{d}'],
							vphi: ['\\boldsymbol{\\phi}'],
							vpi: ['\\boldsymbol{\\pi}'],
							vpsi: ['\\boldsymbol{\\psi}'],
							vomg: ['\\boldsymbol{\\omega}'],
							vsigma: ['\\boldsymbol{\\sigma}'],
							vzeta: ['\\boldsymbol{\\zeta}'],
							vx: ['\\mathbf{x}'],
							vy: ['\\mathbf{y}'],
							vz: ['\\mathbf{z}'],
							vh: ['\\mathbf{h}'],
							b: ['\\mathbf'],
							vec: ['\\mathrm{vec}'],
							vecemph: ['\\mathrm{vec}'],
							mvn: ['\\mathcal{MN}'],
							G: ['\\mathcal{G}'],
							M: ['\\mathcal{M}'],
							N: ['\\mathcal{N}'],
							S: ['\\mathcal{S}'],
							I: ['\\mathcal{I}'],
							diag: ['\\mathrm{diag}(#1)', 1],
							diagemph: ['\\mathrm{diag}(#1)', 1],
							tr: ['\\mathrm{tr}(#1)', 1],
							C: ['\\mathbb{C}'],
							E: ['\\mathbb{E}'],
							D: ['\\mathcal{D}'],
							inner: ['\\langle #1 \\rangle', 1],
							innerbig: ['\\left \\langle #1 \\right \\rangle', 1],
							abs: ['\\lvert #1 \\rvert', 1],
							norm: ['\\lVert #1 \\rVert', 1],
							two: ['\\mathrm{II}'],
							GL: ['\\mathrm{GL}'],
							Id: ['\\mathrm{Id}'],
							grad: ['\\mathrm{grad} \\, #1', 1],
							gradat: ['\\mathrm{grad} \\, #1 \\, \\vert_{#2}', 2],
							Hess: ['\\mathrm{Hess} \\, #1', 1],
							T: ['\\mathrm{T}'],
							dim: ['\\mathrm{dim} \\, #1', 1],
							partder: ['\\frac{\\partial #1}{\\partial #2}', 2],
							rank: ['\\mathrm{rank} \\, #1', 1],
							inv: ['-1'],
							map: ['\\mathrm{MAP}'],
							L: ['\\mathcal{L}'],
							argmax: ['\\operatorname{arg,max}'],
							argmin: ['\\operatorname{arg,min}']
						}
					}
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true
})
