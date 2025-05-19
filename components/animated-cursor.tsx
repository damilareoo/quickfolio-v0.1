"use client"

import { useEffect, useState } from "react"

export function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Only show cursor after first mouse movement
      if (!isVisible) {
        setIsVisible(true)
      }
    }

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isVisible])

  // Don't render on mobile devices
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-transparent transition-transform duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isActive ? 0.8 : 1})`,
        }}
      />
      <div
        className="fixed pointer-events-none z-50 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isActive ? 2 : 1})`,
        }}
      />
    </>
  )
}
