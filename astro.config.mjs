// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: '코딩 없이 코딩',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/In-HyeokJang/coding-without-coding' }],
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
					items: [
						{ label: '1회차 · 아이디어', slug: 'sessions/session-1-idea' },
						{ label: '2회차 · 설계', slug: 'sessions/session-2-design' },
						{ label: '3회차 · 뼈대', slug: 'sessions/session-3-skeleton' },
						{ label: '4회차 · 기능', slug: 'sessions/session-4-feature' },
						{ label: '5회차 · 다듬기', slug: 'sessions/session-5-polish' },
						{ label: '6회차 · 배포', slug: 'sessions/session-6-deploy' },
					],
				},
				{ label: '변경 기록', link: '/changelog/' },
			],
		}),
	],
});
