import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// openDate: 이 날짜(KST) 자정에 자동으로 draft가 풀리도록
			// .github/workflows/auto-open-sessions.yml 가 매일 확인한다.
			extend: z.object({ openDate: z.string().optional() }),
		}),
	}),
};
