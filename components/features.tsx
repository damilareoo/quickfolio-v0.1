"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Icons } from "@/components/icons"
import Image from "next/image"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { TextReveal } from "@/components/ui/text-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"

const features = [
  {
    icon: Icons.sparkles,
    title: "AI-Powered Content",
    description:
      "Generate personalized portfolio content with our AI assistant. Perfect for showcasing your skills and experience.",
    image: "/features/ai-content.jpg",
  },
  {
    icon: Icons.palette,
    title: "Customizable Design",
    description: "Easily customize colors, typography, and layout to match your personal brand and style preferences.",
    image: "/features/customizable-design.jpg",
  },
  {
    icon: Icons.layout,
    title: "Professional Templates",
    description: "Choose from a collection of professionally designed templates for any industry or profession.",
    image: "/features/templates.png",
  },
  {
    icon: Icons.globe,
    title: "Custom Domain",
    description: "Connect your own domain or use our free subdomain to make your portfolio accessible to everyone.",
    image: "/features/custom-domain.png",
  },
  {
    icon: Icons.code,
    title: "Export Code",
    description: "Download your portfolio's source code for self-hosting or further customization by developers.",
    image: "/features/export-code.png",
  },
  {
    icon: Icons.rocket,
    title: "One-Click Deploy",
    description: "Deploy your portfolio to Vercel with a single click, making it instantly available online.",
    image: "/features/deploy.png",
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 relative" ref={ref}>
      <ParallaxSection className="absolute inset-0 pointer-events-none" speed={0.1} direction="down">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-40" />
      </ParallaxSection>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <TextReveal>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Features</h2>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="max-w-[85%] leading-normal text-neutral-300 sm:text-lg sm:leading-7">
              Quickfolio comes packed with everything you need to create a stunning portfolio in minutes.
            </p>
          </TextReveal>
        </div>

        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-16">
          {features.map((feature, index) => (
            <TextReveal key={index} delay={0.1 * (index + 2)}>
              <EnhancedCard hoverEffect="lift" borderGlow>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-neutral-300">{feature.description}</p>
                </div>
              </EnhancedCard>
            </TextReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
