import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { TextReveal } from "@/components/ui/text-reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80 backdrop-blur-sm">
      <div className="container flex flex-col gap-10 py-12 md:flex-row md:py-24">
        <TextReveal className="flex flex-1 flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-white" />
            <span className="font-bold">Quickfolio</span>
          </Link>
          <p className="text-neutral-300 max-w-xs">
            Create stunning, personalized portfolios in minutes with AI-powered tools and professional templates.
          </p>
          <div className="flex gap-4">
            <MagneticButton as="a" href={siteConfig.links.twitter} target="_blank" rel="noreferrer" strength={15}>
              <div className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hover:text-twitter")}>
                <Icons.twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </div>
            </MagneticButton>
            <MagneticButton as="a" href={siteConfig.links.github} target="_blank" rel="noreferrer" strength={15}>
              <div className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </MagneticButton>
          </div>
        </TextReveal>
        <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
          <TextReveal className="space-y-3" delay={0.1}>
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Showcase
                </Link>
              </li>
            </ul>
          </TextReveal>
          <TextReveal className="space-y-3" delay={0.2}>
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </TextReveal>
          <TextReveal className="space-y-3" delay={0.3}>
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-neutral-300 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </TextReveal>
        </div>
      </div>
      <div className="container border-t border-white/5 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-neutral-300 md:text-left">
            &copy; {new Date().getFullYear()} Quickfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-neutral-300 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-neutral-300 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
