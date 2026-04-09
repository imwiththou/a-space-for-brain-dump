import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"
import { Pagination } from "@/components/Pagination"
import { getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/pagination"
import { notFound } from "next/navigation"

// Enable ISR: revalidate every hour (3600 seconds)
export const revalidate = 3600

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(allPosts, 1)
  
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }))
}

export function generateMetadata({
  params,
}: {
  params: { page: string }
}) {
  return {
    title: `Posts - Page ${params.page}`,
  }
}

export default function PostsPage({
  params,
}: {
  params: { page: string }
}) {
  const pageNumber = parseInt(params.page, 10)
  const { paginatedPosts, totalPages } = getPaginatedPosts(allPosts, pageNumber)

  if (pageNumber < 1 || pageNumber > totalPages) {
    notFound()
  }

  return (
    <>
      <div className="space-y-4 prose dark:prose-invert">
        {paginatedPosts.map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h3>{post.title}</h3>
            </Link>
            {post.description && 
            <p className="text-sm">{post.description}</p> 
            }
            {post.date && 
            <p className="text-xs text-grey-900 text-opacity-50 dark:text-slate-400 uppercase">{new Date(post.date).toDateString()}</p>
            }
          </article>
        ))}
      </div>
      {totalPages > 1 && <Pagination currentPage={pageNumber} totalPages={totalPages} />}
    </>
  )
}
