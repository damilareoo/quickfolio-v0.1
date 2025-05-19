import type { ReactNode } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Icons } from "@/components/icons"

interface DashboardLayoutProps {
  children: ReactNode
  heading?: string
  text?: string
  action?: ReactNode
}

export function DashboardLayout({ children, heading, text, action }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <nav className="grid items-start gap-2 py-4">
            <a
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Icons.dashboard className="h-4 w-4" />
              Dashboard
            </a>
            <a
              href="/dashboard/new"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Icons.add className="h-4 w-4" />
              New Portfolio
            </a>
            <a
              href="/dashboard/templates"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Icons.template className="h-4 w-4" />
              Templates
            </a>
            <a
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Icons.settings className="h-4 w-4" />
              Settings
            </a>
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <DashboardShell>
            {heading && <DashboardHeader heading={heading} text={text} action={action} />}
            {children}
          </DashboardShell>
        </main>
      </div>
    </div>
  )
}
