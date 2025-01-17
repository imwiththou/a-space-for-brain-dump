import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"

import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: "A space for brain dump",
  description: "Don't take them too seriously, though ideas are extremely frigile.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                </nav>
              </div>
            </header>
            <main>
              {children}
            <br></br>
            <a href="https://notbyai.fyi"><img src="/written-by-human-not-by-ai-white.svg" alt="Written by Human, Not by AI"></img></a>
            <span className="text-xs uppercase tracking-wide text-slate-400">&copy; Steve 5202. All rights reserved.</span>
            </main>
            
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
   )
}