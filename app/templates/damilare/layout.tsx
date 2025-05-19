import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Damilare Ojo | Frontend Developer",
  description: "Personal portfolio of Damilare Ojo, a frontend developer specializing in React and Next.js",
}

export default function DamilareLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
