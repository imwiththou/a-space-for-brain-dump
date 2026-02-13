import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisible = 5
  let visiblePages: number[]

  if (totalPages <= maxVisible) {
    visiblePages = pages
  } else {
    const halfVisible = Math.floor(maxVisible / 2)
    const start = Math.max(1, currentPage - halfVisible)
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end === totalPages) {
      visiblePages = pages.slice(Math.max(0, end - maxVisible), end)
    } else {
      visiblePages = pages.slice(start - 1, end)
    }
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8 mb-8">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? "/" : `/page/${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium no-underline rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Previous
        </Link>
      )}

      {/* First page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href="/"
            className="w-9 h-9 flex items-center justify-center text-sm font-medium no-underline hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            1
          </Link>
          {visiblePages[0] > 2 && (
            <span className="px-2 py-2 text-gray-500">…</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {visiblePages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? "/" : `/page/${page}`}
          className={`w-9 h-9 flex items-center justify-center text-sm font-medium no-underline transition ${
            page === currentPage
              ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page if not visible */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500">…</span>
          )}
          <Link
            href={`/page/${totalPages}`}
            className="w-9 h-9 flex items-center justify-center text-sm font-medium no-underline hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={`/page/${currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium no-underline rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Next →
        </Link>
      )}
    </nav>
  )
}
