"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !headingRef.current) return

    // Create a timeline for the heading animation
    const tl = gsap.timeline()

    // Split the heading text into words for animation
    const words = headingRef.current.innerText.split(" ")
    headingRef.current.innerHTML = ""

    // Create spans for each word
    words.forEach((word) => {
      const span = document.createElement("span")
      span.innerText = word + " " // Add space after each word
      span.style.display = "inline-block"
      span.style.opacity = "0"
      span.style.transform = "translateY(20px)"
      headingRef.current?.appendChild(span)
    })

    // Animate each word
    tl.to(headingRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    })

    // Create scroll animation
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0.5,
      y: 200,
    })

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40" ref={containerRef}>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex justify-center"
          >
            <Badge variant="outline" className="rounded-full px-4 py-1 text-sm backdrop-blur-sm">
              <span className="mr-1 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              <span className="ml-1.5">Professional Portfolio Builder</span>
            </Badge>
          </motion.div>

          <h1
            ref={headingRef}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Create your portfolio in minutes, not days
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-lg text-muted-foreground md:text-xl"
          >
            Quickfolio helps you build stunning, personalized portfolios with just a few clicks. Our templates are
            designed to showcase your work exactly as you envision it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/auth/register"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 font-medium button-hover group")}
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#templates"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 font-medium border-white/20 hover:bg-white/5",
              )}
            >
              View Templates
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
