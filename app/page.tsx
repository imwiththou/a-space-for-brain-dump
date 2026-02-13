import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"


export default function Home() {
  const sortedPosts = allPosts.sort((a, b) => {
    if (a.date > b.date) {
      return -1
    } else {
      return 1
    }
  })

  return (
    <div className="space-y-4 prose dark:prose-invert">
      {sortedPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug} className="no-underline">
            <h4 className="underline decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-500 dark:hover:decoration-gray-400 transition-all">{post.title}</h4>
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
  )
}