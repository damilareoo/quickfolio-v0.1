import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="space-y-4">{children}</div>
    </div>
  )
}
