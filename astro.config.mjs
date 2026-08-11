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
						{ label: '작업 공간 만들기', slug: 'core/00-workspace' },
						{ label: '도구 6종', slug: 'core/01-tools' },
						{ label: '개발 용어 6개', slug: 'core/07-dev-words' },
						{ label: '프롬프트 가이드', slug: 'core/02-prompting' },
						{ label: 'AI 팀으로 만들기', slug: 'core/05-ai-team' },
						{ label: '토큰 절약 설정', slug: 'core/03-token-setup' },
						{ label: '디자인 가져다 쓰기', slug: 'core/06-design-md' },
						{ label: '더 써보고 싶다면', slug: 'core/04-plugins-mcp' },
					],
				},
				{
					label: '회차',
					// 파일 목록 대신 자동 생성 — sessions/ 안의 파일이 파일명 순서대로
					// 사이드바에 올라간다. 회차는 전부 열어두므로 따로 여닫지 않는다.
					// 새 회차는 파일만 추가하면 여기 손대지 않아도 된다.
					items: [{ autogenerate: { directory: 'sessions' } }],
				},
				// 변경 기록은 운영용 문서라 사이드바에서 감춤 (/changelog/ 주소로는 열림)
			],
		}),
	],
});
