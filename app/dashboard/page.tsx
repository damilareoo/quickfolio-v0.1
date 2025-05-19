"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Sample portfolio data
const portfolios = [
  {
    id: "1",
    name: "Personal Portfolio",
    description: "My professional web development portfolio",
    image: "/templates/damilare-template.png",
    lastUpdated: "2 days ago",
    status: "published",
    template: "Damilare",
  },
  {
    id: "2",
    name: "Photography Showcase",
    description: "Collection of my best photography work",
    image: "/templates/masid-template.png",
    lastUpdated: "1 week ago",
    status: "draft",
    template: "Masid",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [portfolioList, setPortfolioList] = useState(portfolios)

  const handleDelete = (id: string) => {
    setIsDeleting(id)
    // Simulate deletion
    setTimeout(() => {
      setPortfolioList(portfolioList.filter((portfolio) => portfolio.id !== id))
      setIsDeleting(null)
      toast({
        title: "Portfolio deleted",
        description: "Your portfolio has been successfully deleted.",
      })
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Your Portfolios" text="Create and manage your professional portfolios.">
        <Link href="/dashboard/new">
          <div className={cn(buttonVariants(), "rounded-full")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Portfolio
          </div>
        </Link>
      </DashboardHeader>
      <div>
        {portfolioList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden h-full flex flex-col border-dashed">
                <Link
                  href="/dashboard/new"
                  className="flex h-full flex-col items-center justify-center p-10 text-center"
                >
                  <div className="rounded-full bg-muted p-6">
                    <PlusCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Create new portfolio</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Start building a new professional portfolio</p>
                </Link>
              </Card>
            </motion.div>
            {portfolioList.map((portfolio) => (
              <motion.div key={portfolio.id} variants={itemVariants}>
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video">
                    <Image
                      src={portfolio.image || "/placeholder.svg"}
                      alt={portfolio.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                          <Icons.ellipsis className="h-4 w-4" />
                          <span className="sr-only">Open</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              toast({
                                title: "Edit mode",
                                description: "Editing portfolio: " + portfolio.name,
                              })
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toast({
                                title: "Preview mode",
                                description: "Previewing portfolio: " + portfolio.name,
                              })
                            }}
                          >
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(portfolio.id)}
                          >
                            {isDeleting === portfolio.id ? (
                              <>
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>Delete</>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {portfolio.status === "published" ? (
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Published</Badge>
                    ) : (
                      <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">Draft</Badge>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                    <CardDescription>{portfolio.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 mt-auto flex justify-between text-xs text-muted-foreground">
                    <div>Template: {portfolio.template}</div>
                    <div>Updated {portfolio.lastUpdated}</div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="fileText" />
            <EmptyPlaceholder.Title>No portfolios created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any portfolios yet. Start creating one.
            </EmptyPlaceholder.Description>
            <Link href="/dashboard/new">
              <div className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Portfolio
              </div>
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
