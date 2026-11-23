import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const loader = (base: string) => glob({
  base,
  pattern: '**/*.mdx',
  generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
});

const posts = defineCollection({
  loader: loader('./content/posts'),
  schema: z.object({ title: z.string(), description: z.string().optional(), date: z.coerce.date() }),
});
const pages = defineCollection({
  loader: loader('./content/pages'),
  schema: z.object({ title: z.string(), description: z.string().optional() }),
});
export const collections = { posts, pages };
