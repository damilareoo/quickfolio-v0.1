"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Settings, Globe, Code, BarChart3, Search, Palette, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface PortfolioSettingsNavProps {
  portfolioId: string
}

export function PortfolioSettingsNav({ portfolioId }: PortfolioSettingsNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "General",
      href: `/dashboard/portfolios/${portfolioId}/settings`,
      icon: Settings,
    },
    {
      title: "Custom Domain",
      href: `/dashboard/portfolios/${portfolioId}/domains`,
      icon: Globe,
    },
    {
      title: "Analytics",
      href: `/dashboard/portfolios/${portfolioId}/analytics`,
      icon: BarChart3,
    },
    {
      title: "SEO",
      href: `/dashboard/portfolios/${portfolioId}/seo`,
      icon: Search,
    },
    {
      title: "Customize",
      href: `/dashboard/portfolios/${portfolioId}/customize`,
      icon: Palette,
    },
    {
      title: "Export",
      href: `/dashboard/portfolios/${portfolioId}/export`,
      icon: Code,
    },
    {
      title: "Danger Zone",
      href: `/dashboard/portfolios/${portfolioId}/danger`,
      icon: Trash2,
      variant: "destructive" as const,
    },
  ]

  return (
    <nav className="grid gap-2 p-4 md:p-0">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            item.variant === "destructive" && "text-destructive hover:text-destructive",
            "justify-start",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
