"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6 text-primary" />
        <span className="font-bold">Quickfolio</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/templates"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/templates" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Templates
        </Link>
        <Link
          href="/pricing"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/pricing" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Pricing
        </Link>
        <Link
          href="/showcase"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/showcase" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Showcase
        </Link>
      </nav>
    </div>
  )
}
