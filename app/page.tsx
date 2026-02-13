import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"
import { Pagination } from "@/components/Pagination"
import { getPaginatedPosts } from "@/lib/pagination"

export default function Home() {
  const { paginatedPosts, totalPages } = getPaginatedPosts(allPosts, 1)

  return (
    <>
      <div className="space-y-4 prose dark:prose-invert">
        {paginatedPosts.map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h4 className="post-title">{post.title}</h4>
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
      {totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
    </>
  )
}