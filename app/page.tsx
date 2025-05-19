"use client"

import { GridBackground } from "@/components/ui/grid-background"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { TemplateShowcase } from "@/components/template-showcase"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Analytics } from "@/components/analytics"

export default function Home() {
  return (
    <>
      <GridBackground />
      <Hero />
      <Features />
      <HowItWorks />
      <TemplateShowcase />
      <Pricing />
      <FAQ />
      <Analytics />
    </>
  )
}
