// Purpose: The layout component that wraps around all pages.
import Link from "next/link"
import "./globals.css"
import { PageSize } from "@/components/page-size"



// Define the metadata for the site
export const metadata = {
  title: "A space for brain dump",
  description: "Don't take them too seriously, though ideas are extremely fragile.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

// The layout component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-white dark:bg-black text-slate-950 dark:text-slate-50">
        <div className="max-w-3xl mx-auto py-10 px-4">
            <header className="w-full">
              <div className="flex items-center justify-between">
                <nav className="ml-auto text-sm font-medium space-x-2">
                  <Link href="/" className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition no-underline">Home</Link>
                  <Link href="/about" className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition no-underline">About</Link>
                  <Link href="/quotes" className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition no-underline">Quotes</Link>
                </nav>
              </div>
            </header>
            <main className="w-full">
              {children}
              <br />
              <span className="text-xs uppercase tracking-wide text-slate-400 mb-8">
                &copy; Steve 6202. All rights reserved.
                <PageSize />
              </span>
            </main>
        </div>
      </body>
    </html>
  )
}