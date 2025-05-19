"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { motion } from "framer-motion"

const navItems = [
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/showcase", label: "Showcase" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)

  // Don't show header on auth pages
  useEffect(() => {
    setShowHeader(!pathname?.startsWith("/auth"))
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!showHeader) {
    return null
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-10">
          <span className="text-xl font-medium">Quickfolio</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium text-neutral-300 transition-colors hover:text-white",
                pathname === item.href && "text-white",
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full block h-[2px] w-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <MagneticButton as="a" href="/auth/login" strength={20}>
            <Button variant="ghost" size="sm" className="text-sm">
              Sign in
            </Button>
          </MagneticButton>
          <MagneticButton as="a" href="/auth/register" strength={20}>
            <Button size="sm" className="text-sm">
              Get Started
            </Button>
          </MagneticButton>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>

      {/* Mobile navigation would go here */}
    </motion.header>
  )
}
