import { allPosts } from "contentlayer/generated"

// Posts are static at build time; sort once instead of on every pagination call.
export const sortedPosts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date))
