import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  const sortedPosts = allPosts.sort((a, b) => a.date > b.date)

  return (
    <div className="prose dark:prose-invert">
      {sortedPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}