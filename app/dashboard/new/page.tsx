"use client"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PortfolioCreationWizard } from "@/components/portfolio-creation-wizard"

export default function NewPortfolioPage() {
  const router = useRouter()

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Portfolio" text="Start building your professional portfolio." />
      <Suspense fallback={<div className="flex items-center justify-center p-8">Loading...</div>}>
        <PortfolioCreationWizard />
      </Suspense>
    </DashboardShell>
  )
}
