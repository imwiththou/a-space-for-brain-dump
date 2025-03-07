// Purpose: The layout component that wraps around all pages.
import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Import the font
import { Host_Grotesk } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  variable: '--font-host-grotesk',
})

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
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-black text-slate-950 dark:text-slate-50 ${hostGrotesk.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-3xl mx-auto py-10 px-4">
            <header className="w-full">
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/quotes">Quotes</Link>
                </nav>
              </div>
            </header>
            <main className="w-full">
              {children}
              <br />
              <span className="text-xs uppercase tracking-wide text-slate-400">&copy; Steve 5202. All rights reserved.</span>
            </main>
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
   )
}