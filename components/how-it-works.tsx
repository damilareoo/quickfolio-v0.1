"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { TextReveal } from "@/components/ui/text-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { EnhancedCard } from "@/components/ui/enhanced-card"

const steps = [
  {
    title: "Sign up for an account",
    description: "Create your Quickfolio account using email or social login to get started.",
    image: "/how-it-works/signup.png",
  },
  {
    title: "Choose a template",
    description: "Browse our collection of professionally designed templates and select one that matches your style.",
    image: "/how-it-works/choose-template.png",
  },
  {
    title: "Add your content",
    description:
      "Use our AI assistant to generate personalized content or add your own projects, skills, and experience.",
    image: "/how-it-works/add-content.png",
  },
  {
    title: "Customize your design",
    description: "Personalize your portfolio with your preferred colors, fonts, and layout options.",
    image: "/how-it-works/customize.png",
  },
  {
    title: "Preview and publish",
    description: "Preview your portfolio, make any final adjustments, and publish it with one click.",
    image: "/how-it-works/publish.png",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="how-it-works" className="container py-12 md:py-24 lg:py-32 relative" ref={containerRef}>
      <ParallaxSection className="absolute inset-0 pointer-events-none" speed={0.1} direction="down">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-40" />
      </ParallaxSection>

      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <TextReveal>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">How It Works</h2>
        </TextReveal>
        <TextReveal delay={0.1}>
          <p className="max-w-[85%] leading-normal text-neutral-300 sm:text-lg sm:leading-7">
            Create your professional portfolio in just a few simple steps.
          </p>
        </TextReveal>
      </div>

      <div className="mt-16 space-y-16 md:space-y-24">
        {steps.map((step, index) => (
          <StepItem
            key={index}
            step={index + 1}
            title={step.title}
            description={step.description}
            image={step.image}
            isEven={index % 2 === 1}
            delay={0.1 * (index + 2)}
          />
        ))}
      </div>
    </section>
  )
}

interface StepItemProps {
  step: number
  title: string
  description: string
  image: string
  isEven?: boolean
  delay?: number
}

function StepItem({ step, title, description, image, isEven = false, delay = 0 }: StepItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isEven ? [50, 0, 0, 50] : [-50, 0, 0, -50])

  return (
    <TextReveal delay={delay}>
      <motion.div
        ref={ref}
        style={{ opacity }}
        className={cn("flex flex-col items-center gap-8 md:flex-row", isEven && "md:flex-row-reverse")}
      >
        <motion.div style={{ x }} className="flex-1 space-y-4">
          <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            Step {step}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-neutral-300">{description}</p>
        </motion.div>
        <div className="flex-1">
          <EnhancedCard hoverEffect="glow" borderGlow>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={400}
              className="w-full object-cover rounded-xl"
            />
          </EnhancedCard>
        </div>
      </motion.div>
    </TextReveal>
  )
}
