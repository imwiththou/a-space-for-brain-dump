import { sortedPosts } from "./posts"

export const POSTS_PER_PAGE = 10

export function getPaginatedPosts(page: number) {
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return { paginatedPosts, totalPages }
}
