"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { TextReveal } from "@/components/ui/text-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { MagneticButton } from "@/components/ui/magnetic-button"

// Our three focused templates
const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean developer portfolio with a focus on projects and skills",
    image: "/templates/minimalist-template.jpg",
    category: "Developer",
    featured: true,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Elegant and structured design for a polished presentation",
    image: "/templates/professional-template.jpg",
    category: "Professional",
    featured: false,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and expressive design for creative professionals",
    image: "/templates/creative-template.jpg",
    category: "Creative",
    featured: false,
  },
]

export function TemplateShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative" id="templates" ref={ref}>
      <ParallaxSection className="absolute inset-0 pointer-events-none" speed={0.1} direction="up">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-40" />
      </ParallaxSection>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-16">
          <TextReveal>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">Templates</span>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Professional Templates</h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="max-w-[85%] text-neutral-300 md:text-lg">
              Choose from our collection of professionally designed templates and customize them to match your personal
              style.
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <TextReveal key={template.id} delay={0.1 * (index + 3)}>
              <EnhancedCard hoverEffect="lift" borderGlow clickEffect>
                <div className="relative aspect-[3/4]">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <MagneticButton as="a" href={`/dashboard/new?template=${template.id}`} className="z-10">
                      <Button className="rounded-full bg-white text-black hover:bg-white/90" size="lg">
                        Use Template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </MagneticButton>
                  </div>
                  {template.featured && (
                    <div className="absolute top-2 left-2 bg-white text-black text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-medium mb-1">{template.name}</h3>
                  <p className="text-sm text-neutral-300">{template.description}</p>
                </div>
              </EnhancedCard>
            </TextReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <TextReveal delay={0.5}>
            <MagneticButton as="a" href="/auth/register" className="inline-block">
              <Button variant="outline" size="lg" className="rounded-full px-8 border-white/20 hover:bg-white/10">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </MagneticButton>
          </TextReveal>
        </div>
      </div>
    </section>
  )
}
