"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { TemplateShowcase } from "@/components/template-showcase"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/templates" className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
              30+ Professional Templates
              <ArrowRight className="ml-1 h-4 w-4 inline" />
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Create your professional portfolio in <span className="text-gradient">minutes</span>, not days
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          >
            Quickfolio is an AI-powered portfolio builder that helps you create stunning, personalized portfolios with
            just a few clicks. Choose from professionally designed templates, customize with ease, and deploy instantly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-x-4"
          >
            <Link href="/auth/register" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link href="/showcase" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              View Examples
            </Link>
          </motion.div>
        </div>
      </section>
      <TemplateShowcase />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  )
}
