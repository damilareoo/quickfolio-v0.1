"use client"

import { useState } from "react"
import { Download, Code, FileCode, FileText, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import {
  generateNextJsProject,
  generateCodeProject,
  generateHtmlProject,
  type ExportFormat,
} from "@/lib/export-generators"

interface ExportOptionsProps {
  portfolioId: string
}

export function ExportOptions({ portfolioId }: ExportOptionsProps) {
  const { toast } = useToast()
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("nextjs")
  const [includeAssets, setIncludeAssets] = useState(true)
  const [minify, setMinify] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async () => {
    setIsLoading(true)

    try {
      let result

      switch (selectedFormat) {
        case "nextjs":
          result = await generateNextJsProject(portfolioId, { includeAssets, minify })
          break
        case "code":
          result = await generateCodeProject(portfolioId, { includeAssets, minify })
          break
        case "html":
          result = await generateHtmlProject(portfolioId, { includeAssets, minify })
          break
      }

      if (result?.success && result.downloadUrl) {
        // In a real implementation, this would trigger a download
        // For this example, we'll just show a success message
        toast({
          title: "Export successful",
          description: "Your portfolio has been exported successfully.",
        })
      } else {
        toast({
          title: "Export failed",
          description: result?.error || "Failed to export portfolio. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const exportOptions = [
    {
      id: "nextjs" as const,
      name: "Next.js Project",
      description: "Export as a complete Next.js project with all source code",
      icon: Code,
    },
    {
      id: "code" as const,
      name: "Source Code",
      description: "Export the raw HTML, CSS, and JavaScript files",
      icon: FileCode,
    },
    {
      id: "html" as const,
      name: "Static HTML",
      description: "Export as static HTML files for simple hosting",
      icon: FileText,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          <CardTitle>Export Portfolio</CardTitle>
        </div>
        <CardDescription>Export your portfolio in different formats for self-hosting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Export Format</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {exportOptions.map((option) => (
              <Card
                key={option.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary",
                  selectedFormat === option.id && "border-primary bg-primary/5",
                )}
                onClick={() => setSelectedFormat(option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <option.icon className="h-8 w-8 text-primary" />
                    {selectedFormat === option.id && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <h4 className="mt-3 font-medium">{option.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Export Options</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="include-assets">Include Assets</Label>
                <p className="text-xs text-muted-foreground">Include images, fonts, and other assets in the export</p>
              </div>
              <Switch id="include-assets" checked={includeAssets} onCheckedChange={setIncludeAssets} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="minify">Minify Code</Label>
                <p className="text-xs text-muted-foreground">Reduce file size by removing whitespace and comments</p>
              </div>
              <Switch id="minify" checked={minify} onCheckedChange={setMinify} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleExport} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Portfolio
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
