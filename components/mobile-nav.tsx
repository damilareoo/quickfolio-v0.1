"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

const navItems = [
  { href: "/templates", label: "Templates" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/showcase", label: "Showcase" },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // Close the mobile nav when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Close the mobile nav when route changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md md:hidden"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 h-full w-full max-w-xs bg-surface-bright border-l border-white/5 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <Logo className="h-8 w-8" />
                <span className="font-display text-xl font-medium">Quickfolio</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <Link href="/auth/login" className="block w-full">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/register" className="block w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
