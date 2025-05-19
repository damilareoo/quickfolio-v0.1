"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface GridBackgroundProps {
  className?: string
  gridSize?: number
  lineColor?: string
  dotColor?: string
  dotSize?: number
  interactive?: boolean
}

export function GridBackground({
  className = "",
  gridSize = 40,
  lineColor = "rgba(255, 255, 255, 0.03)",
  dotColor = "rgba(255, 255, 255, 0.07)",
  dotSize = 1,
  interactive = true,
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 0.5

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw dots at intersections
    ctx.fillStyle = dotColor
    for (let x = 0; x <= canvas.width; x += gridSize) {
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw interactive elements if enabled
    if (interactive && mousePosition.x && mousePosition.y) {
      // Draw ripple effect around mouse
      const gradient = ctx.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        gridSize * 5,
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.05)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mousePosition.x, mousePosition.y, gridSize * 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw connecting lines to nearby grid points
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 0.5

      const radius = gridSize * 3
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const dx = mousePosition.x - x
          const dy = mousePosition.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < radius) {
            const opacity = 1 - distance / radius
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
            ctx.beginPath()
            ctx.moveTo(mousePosition.x, mousePosition.y)
            ctx.lineTo(x, y)
            ctx.stroke()
          }
        }
      }
    }
  }, [dimensions, mousePosition, gridSize, lineColor, dotColor, dotSize, interactive])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[-1] ${className}`}
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    />
  )
}
