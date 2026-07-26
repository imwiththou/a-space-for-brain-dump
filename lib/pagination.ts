export const POSTS_PER_PAGE = 10

export function getPaginatedPosts<T extends { date: string }>(
  posts: T[],
  page: number
): { paginatedPosts: T[]; totalPages: number } {
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1
    } else {
      return 1
    }
  })

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex)

  return { paginatedPosts, totalPages }
}
