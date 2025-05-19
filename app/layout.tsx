import type React from "react"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { GridBackground } from "@/components/ui/grid-background"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"

import "@/app/globals.css"
import { Suspense } from "react"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Quickfolio - Create stunning portfolios in minutes",
  description: "AI-powered portfolio builder for professionals and creatives",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <div className="relative flex min-h-screen flex-col">
              <GridBackground />
              <SiteHeader />
              <Suspense>
                <div className="flex-1">{children}</div>
              </Suspense>
              <Footer />
            </div>
            <Toaster />
            <Analytics />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
