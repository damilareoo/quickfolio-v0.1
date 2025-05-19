"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Save, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface SEOEditorProps {
  portfolioId: string
  initialSEO?: {
    title: string
    description: string
    keywords: string[]
    og_image: string | null
  } | null
}

export function SEOEditor({ portfolioId, initialSEO }: SEOEditorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [seo, setSEO] = useState({
    title: initialSEO?.title || "",
    description: initialSEO?.description || "",
    keywords: initialSEO?.keywords || [],
    og_image: initialSEO?.og_image || "",
  })
  const [newKeyword, setNewKeyword] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSEO((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddKeyword = () => {
    if (newKeyword && !seo.keywords.includes(newKeyword)) {
      setSEO((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword],
      }))
      setNewKeyword("")
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setSEO((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would save the SEO settings to the database
      // For this example, we'll simulate a successful save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "SEO settings saved",
        description: "Your SEO settings have been saved successfully.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save SEO settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <CardTitle>SEO Settings</CardTitle>
        </div>
        <CardDescription>Optimize your portfolio for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Meta Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Your Portfolio Title"
            value={seo.title}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">
            The title that appears in search engine results (50-60 characters recommended)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Meta Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="A brief description of your portfolio"
            value={seo.description}
            onChange={handleInputChange}
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            The description that appears in search engine results (150-160 characters recommended)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <div className="flex gap-2">
            <Input
              id="keywords"
              placeholder="Add a keyword"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddKeyword()
                }
              }}
            />
            <Button type="button" onClick={handleAddKeyword} disabled={!newKeyword}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Keyword</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {seo.keywords.map((keyword) => (
              <div key={keyword} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                <span>{keyword}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="ml-1 rounded-full p-1 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {keyword}</span>
                </button>
              </div>
            ))}
            {seo.keywords.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No keywords added yet. Keywords help search engines understand your content.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="og_image">Social Media Image URL</Label>
          <Input
            id="og_image"
            name="og_image"
            placeholder="https://example.com/image.jpg"
            value={seo.og_image}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">
            The image that appears when your portfolio is shared on social media (1200x630 pixels recommended)
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save SEO Settings
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
