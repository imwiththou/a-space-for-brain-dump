import { Pagination } from "@/components/Pagination"
import { PostList } from "@/components/PostList"
import { getPaginatedPosts } from "@/lib/pagination"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1)

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }))
}

export function generateMetadata({ params }: { params: { page: string } }) {
  return {
    title: `Posts - Page ${params.page}`,
  }
}

export default function PostsPage({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page, 10)
  const { paginatedPosts, totalPages } = getPaginatedPosts(pageNumber)

  if (pageNumber < 1 || pageNumber > totalPages) {
    notFound()
  }

  return (
    <>
      <PostList posts={paginatedPosts} />
      {totalPages > 1 && <Pagination currentPage={pageNumber} totalPages={totalPages} />}
    </>
  )
}
