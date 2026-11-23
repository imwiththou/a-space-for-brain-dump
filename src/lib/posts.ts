import { getCollection } from 'astro:content';
export const POSTS_PER_PAGE = 10;
export async function getPosts() {
  return (await getCollection('posts')).sort ( (a, b) => b.data.date.getTime() - a.data.date.getTime());
}
