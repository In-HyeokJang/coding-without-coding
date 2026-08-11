import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// openDate: 그 회차의 모임 날짜 기록. 화면에는 안 쓰이고,
			// 문서를 고칠 때 "내일 / 6일 뒤" 같은 표현이 실제 일정과
			// 맞는지 대조하는 용도로만 남겨둔다.
			// (2026-08-11 이전에는 이 날짜에 맞춰 draft 를 자동으로 풀었다.
			//  지금은 회차를 처음부터 다 열어두므로 그 장치는 없앴다.)
			extend: z.object({ openDate: z.string().optional() }),
		}),
	}),
};
