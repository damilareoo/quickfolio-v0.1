"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  // Don't show header on auth pages
  if (pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {pathname !== "/dashboard" ? (
              <>
                <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-4")}>
                  Login
                </Link>
                <Link href="/auth/register" className={cn(buttonVariants({ size: "sm" }), "px-4")}>
                  Sign Up
                </Link>
              </>
            ) : (
              <Link href="/dashboard/new" className={cn(buttonVariants({ size: "sm" }), "px-4")}>
                <Icons.plus className="mr-2 h-4 w-4" />
                New Portfolio
              </Link>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
