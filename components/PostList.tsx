import Link from "next/link"
import type { Post } from "contentlayer/generated"

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4 prose dark:prose-invert">
      {posts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h4>{post.title}</h4>
          </Link>
          {post.description && <p className="text-sm">{post.description}</p>}
          {post.date && (
            <p className="text-xs text-grey-900 text-opacity-50 dark:text-slate-400 uppercase">
              {new Date(post.date).toDateString()}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
