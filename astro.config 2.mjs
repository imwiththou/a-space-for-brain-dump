import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  integrations: [mdx(), react()],
  markdown: { processor: unified({ gfm: true, smartypants: false }) },
});
