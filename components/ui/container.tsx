import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ children, className, as: Component = "div", ...props }: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-8 lg:px-12", className)} {...props}>
      {children}
    </Component>
  )
}
