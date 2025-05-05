"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // You can implement your analytics tracking here
      // Example: window.gtag("config", "GA-MEASUREMENT-ID", { page_path: pathname })
    }
  }, [pathname, searchParams])

  return null
}
