// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: 'https://in-hyeokjang.github.io',
	base: '/coding-without-coding',
	integrations: [
		mermaid({
			theme: 'forest',
			autoTheme: true,
			mermaidConfig: {
				themeVariables: {
					primaryBorderColor: '#e8562e',
					lineColor: '#e8562e',
					clusterBorder: '#e8562e',
					clusterBkg: 'rgba(232, 86, 46, 0.08)',
				},
			},
		}),
		starlight({
			title: '코딩 없이 코딩',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/In-HyeokJang/coding-without-coding' }],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: true },
				},
			],
			sidebar: [
				{ label: '시작하기', link: '/' },
				{
					label: '준비',
					items: [
						{ label: '도구 6종', slug: 'core/01-tools' },
						{ label: '프롬프트 가이드', slug: 'core/02-prompting' },
						{ label: '토큰 절약 설정', slug: 'core/03-token-setup' },
					],
				},
				{
					label: '회차',
					// 파일 목록 대신 자동 생성 — draft: true인 회차는 자동으로 사이드바에서
					// 빠진다. 매주 해당 회차 파일에서 draft: true만 지우면 열린다.
					items: [{ autogenerate: { directory: 'sessions' } }],
				},
				{ label: '변경 기록', link: '/changelog/' },
			],
		}),
	],
});
