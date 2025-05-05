"use client"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PortfolioCreationWizard } from "@/components/portfolio-creation-wizard"

export default function NewPortfolioPage() {
  const router = useRouter()

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Portfolio" text="Start building your professional portfolio." />
      <PortfolioCreationWizard />
    </DashboardShell>
  )
}
