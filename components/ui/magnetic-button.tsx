"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { type MouseEvent, type ReactNode, useRef } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "button" | "div" | "a"
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

export function MagneticButton({
  children,
  className = "",
  strength = 30,
  radius = 300,
  as = "button",
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < radius) {
      // Calculate the strength based on the distance from the center
      const strengthFactor = 1 - distance / radius
      x.set(distanceX * strengthFactor * (strength / 10))
      y.set(distanceY * strengthFactor * (strength / 10))
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = motion[as] as any

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        cursor: "pointer",
      }}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Component>
  )
}
