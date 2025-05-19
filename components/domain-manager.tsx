"use client"

import { useState } from "react"
import { Globe, Plus, Trash2, RefreshCw, ExternalLink, Check, AlertCircle, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import {
  addCustomDomain,
  getDomainStatus,
  removeDomain,
  type DomainStatus,
  type DomainVerification,
} from "@/lib/domainService"

interface DomainManagerProps {
  portfolioId: string
  initialDomain?: string | null
  initialStatus?: DomainStatus | null
}

export function DomainManager({ portfolioId, initialDomain, initialStatus }: DomainManagerProps) {
  const { toast } = useToast()
  const [domain, setDomain] = useState(initialDomain || "")
  const [newDomain, setNewDomain] = useState("")
  const [status, setStatus] = useState<DomainStatus | null>(initialStatus || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [verifications, setVerifications] = useState<DomainVerification[]>([])

  const handleAddDomain = async () => {
    if (!newDomain) {
      toast({
        title: "Domain required",
        description: "Please enter a domain name.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await addCustomDomain(portfolioId, newDomain)

      if (result.success) {
        setDomain(newDomain)
        setNewDomain("")
        setVerifications(result.verifications || [])

        toast({
          title: "Domain added",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add custom domain. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveDomain = async () => {
    setIsLoading(true)

    try {
      const result = await removeDomain(portfolioId)

      if (result.success) {
        setDomain("")
        setStatus(null)
        setVerifications([])

        toast({
          title: "Domain removed",
          description: result.message,
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove custom domain. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckStatus = async () => {
    setIsChecking(true)

    try {
      const result = await getDomainStatus(portfolioId)

      if (result.domain && result.status) {
        setStatus(result.status)

        toast({
          title: "Domain status updated",
          description: result.status.message || "Domain status has been updated.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to check domain status. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check domain status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle>Custom Domain</CardTitle>
        </div>
        <CardDescription>Connect your own domain to your portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {domain ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{domain}</h3>
                {status && (
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-1 text-xs",
                      status.status === "valid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : status.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                    )}
                  >
                    {status.status === "valid" ? (
                      <Check className="h-3 w-3" />
                    ) : status.status === "pending" ? (
                      <Clock className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    <span>
                      {status.status === "valid" ? "Active" : status.status === "pending" ? "Pending" : "Invalid"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCheckStatus} disabled={isChecking}>
                  {isChecking ? (
                    <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-3 w-3" />
                  )}
                  Check Status
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.open(`https://${domain}`, "_blank")}>
                  <ExternalLink className="mr-2 h-3 w-3" />
                  Visit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleRemoveDomain} disabled={isLoading}>
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-3 w-3" />
                  )}
                  Remove
                </Button>
              </div>
            </div>

            {status?.status !== "valid" && verifications.length > 0 && (
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-medium">DNS Configuration</h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  Add the following DNS records to your domain to verify ownership and enable the custom domain:
                </p>
                <div className="space-y-2">
                  {verifications.map((verification, index) => (
                    <div key={index} className="rounded-md bg-muted p-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Type:</span> {verification.type}
                        </div>
                        <div>
                          <span className="font-medium">Name:</span> {verification.name}
                        </div>
                        <div>
                          <span className="font-medium">Value:</span> {verification.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain Name</Label>
              <div className="flex">
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="rounded-r-none"
                />
                <Button onClick={handleAddDomain} disabled={isLoading || !newDomain} className="rounded-l-none">
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Add Domain
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Enter your domain name without "http://" or "https://"</p>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">How to set up a custom domain</h4>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li>Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy)</li>
                <li>Enter your domain name above and click "Add Domain"</li>
                <li>Add the required DNS records to your domain's DNS settings</li>
                <li>Wait for DNS propagation (can take up to 48 hours)</li>
                <li>Check the status of your domain to confirm it's active</li>
              </ol>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
