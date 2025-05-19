"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { type ReactNode, useState } from "react"

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: "lift" | "glow" | "scale" | "tilt" | "none"
  clickEffect?: boolean
  borderGlow?: boolean
  interactive?: boolean
}

export function EnhancedCard({
  children,
  className,
  hoverEffect = "lift",
  clickEffect = false,
  borderGlow = false,
  interactive = true,
}: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Base styles
  const baseClasses = "rounded-xl overflow-hidden bg-black border border-white/10 transition-all duration-300"

  // Hover effect variants
  const hoverVariants = {
    lift: {
      rest: { y: 0 },
      hover: { y: -8, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)" },
    },
    glow: {
      rest: { boxShadow: "0 0 0 rgba(255, 255, 255, 0)" },
      hover: { boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" },
    },
    scale: {
      rest: { scale: 1 },
      hover: { scale: 1.02 },
    },
    tilt: {
      rest: { rotateX: 0, rotateY: 0 },
      hover: { rotateX: "2deg", rotateY: "2deg" },
    },
    none: {
      rest: {},
      hover: {},
    },
  }

  // Click effect
  const clickVariants = {
    rest: { scale: 1 },
    pressed: { scale: 0.98 },
  }

  // Border glow effect
  const borderVariants = {
    rest: { borderColor: "rgba(255, 255, 255, 0.1)" },
    hover: { borderColor: "rgba(255, 255, 255, 0.3)" },
  }

  return (
    <motion.div
      className={cn(baseClasses, className)}
      initial="rest"
      animate={[isHovered ? "hover" : "rest", isPressed ? "pressed" : "rest"]}
      variants={{
        ...hoverVariants[hoverEffect],
        ...(clickEffect ? clickVariants : {}),
        ...(borderGlow ? borderVariants : {}),
      }}
      onHoverStart={() => interactive && setIsHovered(true)}
      onHoverEnd={() => interactive && setIsHovered(false)}
      onTapStart={() => interactive && clickEffect && setIsPressed(true)}
      onTap={() => interactive && clickEffect && setIsPressed(false)}
      onTapCancel={() => interactive && clickEffect && setIsPressed(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}
