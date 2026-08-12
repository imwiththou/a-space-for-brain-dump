import { Pagination } from "@/components/Pagination"
import { PostList } from "@/components/PostList"
import { getPaginatedPosts } from "@/lib/pagination"

export const revalidate = 3600

export default function Home() {
  const { paginatedPosts, totalPages } = getPaginatedPosts(1)

  return (
    <>
      <PostList posts={paginatedPosts} />
      {totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
    </>
  )
}
