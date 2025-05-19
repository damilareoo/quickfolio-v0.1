"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, threshold })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
