"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Sign up for an account",
    description: "Create your Quickfolio account using email or social login to get started.",
    image: "/placeholder.svg?key=xagwz",
  },
  {
    title: "Choose a template",
    description: "Browse our collection of professionally designed templates and select one that matches your style.",
    image: "/placeholder.svg?key=0z9od",
  },
  {
    title: "Add your content",
    description:
      "Use our AI assistant to generate personalized content or add your own projects, skills, and experience.",
    image: "/placeholder.svg?key=w4fr9",
  },
  {
    title: "Customize your design",
    description: "Personalize your portfolio with your preferred colors, fonts, and layout options.",
    image: "/placeholder.svg?key=0bp2j",
  },
  {
    title: "Preview and publish",
    description: "Preview your portfolio, make any final adjustments, and publish it with one click.",
    image: "/placeholder.svg?key=v3tmy",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="how-it-works" className="container py-12 md:py-24 lg:py-32" ref={containerRef}>
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">How It Works</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Create your professional portfolio in just a few simple steps.
        </p>
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
}

function StepItem({ step, title, description, image, isEven = false }: StepItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isEven ? [50, 0, 0, 50] : [-50, 0, 0, -50])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={cn("flex flex-col items-center gap-8 md:flex-row", isEven && "md:flex-row-reverse")}
    >
      <motion.div style={{ x }} className="flex-1 space-y-4">
        <div className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
          Step {step}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>
      <div className="flex-1 overflow-hidden rounded-lg border">
        <Image src={image || "/placeholder.svg"} alt={title} width={600} height={400} className="w-full object-cover" />
      </div>
    </motion.div>
  )
}
