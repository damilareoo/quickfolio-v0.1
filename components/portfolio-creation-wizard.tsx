"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { useToast } from "@/components/ui/use-toast"

// Template data
const templates = [
  {
    id: "layers",
    name: "Layers",
    description: "Clean and minimalist design inspired by layers.to",
    image: "/templates/layers-template.jpg",
    category: "Professional",
  },
  {
    id: "masid",
    name: "Masid",
    description: "Bold and expressive design inspired by masid.design",
    image: "/templates/masid-template.jpg",
    category: "Creative",
  },
  {
    id: "bento",
    name: "Bento",
    description: "Grid-based layout inspired by bento.me and recentwork.com",
    image: "/templates/bento-template.jpg",
    category: "Developer",
  },
]

// Separate component to handle search params
function TemplateSelector({ onSelectTemplate }: { onSelectTemplate: (templateId: string | null) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const templateFromUrl = searchParams?.get("template")
    if (templateFromUrl) {
      onSelectTemplate(templateFromUrl)
    }
  }, [searchParams, onSelectTemplate])

  return null
}

export function PortfolioCreationWizard() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    profession: "",
    template: "",
    about: "",
    skills: "",
    experience: "",
    projects: "",
    contact: "",
  })
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleTemplateFromUrl = (templateId: string | null) => {
    if (templateId && !selectedTemplate) {
      setSelectedTemplate(templateId)
      setFormData((prev) => ({ ...prev, template: templateId }))
      if (step === 1) {
        setStep(2)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateSelect = (templateId: string) => {
    if (templateId !== selectedTemplate) {
      setSelectedTemplate(templateId)
      setFormData((prev) => ({ ...prev, template: templateId }))
    }
  }

  const handleNext = () => {
    // Validate current step
    if (step === 1 && (!formData.name || !formData.profession)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && !selectedTemplate) {
      toast({
        title: "Template required",
        description: "Please select a template before proceeding.",
        variant: "destructive",
      })
      return
    }

    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Portfolio published!",
        description: "Your portfolio has been successfully published.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  const generateAIContent = () => {
    setIsLoading(true)

    // Simulate AI content generation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Content generated",
        description: "AI has generated content based on your profession.",
      })
      setFormData({
        ...formData,
        about: `I'm a passionate ${formData.profession} with over 5 years of experience creating innovative solutions. I specialize in delivering high-quality work that meets client needs and exceeds expectations.`,
        skills: "UI/UX Design, Wireframing, Prototyping, User Research, Figma, Adobe XD, HTML, CSS, JavaScript",
        experience:
          "Senior Designer at CreativeTech (2020-Present)\nUX Designer at DesignStudio (2018-2020)\nJunior Designer at WebWorks (2016-2018)",
        projects:
          "E-commerce Redesign - Improved conversion rates by 25%\nMobile App Design - Created intuitive interface for fitness tracking\nBranding Project - Developed complete identity for tech startup",
      })
    }, 1500)
  }

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Choose Template" },
    { id: 3, name: "Content" },
    { id: 4, name: "Preview" },
  ]

  return (
    <div className="space-y-8">
      {/* Wrap the search params component in Suspense */}
      <Suspense fallback={null}>
        <TemplateSelector onSelectTemplate={handleTemplateFromUrl} />
      </Suspense>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {steps.map((s) => (
            <div
              key={s.id}
              className={cn(
                "flex items-center",
                s.id !== steps.length && "after:content-[''] after:h-px after:w-8 after:bg-muted after:mx-2",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : step > s.id
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {step > s.id ? <Icons.check className="h-4 w-4" /> : s.id}
              </div>
              <span
                className={cn(
                  "ml-2 hidden sm:inline-block",
                  step === s.id ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Let's start with some basic information about your portfolio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Portfolio Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="My Professional Portfolio"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="A brief description of your portfolio"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">
                    Your Profession <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.profession}
                    onValueChange={(value) => handleSelectChange("profession", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your profession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="photographer">Photographer</SelectItem>
                      <SelectItem value="writer">Writer</SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button onClick={handleNext}>Next Step</Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
                <CardDescription>Select a template that best fits your style and profession.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                        selectedTemplate === template.id
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border hover:border-primary/50",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="relative aspect-[2/3]">
                        <Image
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!selectedTemplate}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Content</CardTitle>
                <CardDescription>Add content to your portfolio or let our AI generate it for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    onClick={generateAIContent}
                    disabled={isLoading || !formData.profession}
                    className="flex items-center"
                  >
                    {isLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generate with AI
                  </Button>
                </div>
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="about">About Me</Label>
                      <Textarea
                        id="about"
                        name="about"
                        placeholder="Write a brief introduction about yourself"
                        className="min-h-[200px]"
                        value={formData.about}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="skills" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        placeholder="List your skills (comma separated)"
                        className="min-h-[200px]"
                        value={formData.skills}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="experience" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        placeholder="List your work experience"
                        className="min-h-[200px]"
                        value={formData.experience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="projects" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="projects">Projects</Label>
                      <Textarea
                        id="projects"
                        name="projects"
                        placeholder="Describe your projects"
                        className="min-h-[200px]"
                        value={formData.projects}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>Next Step</Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Preview Your Portfolio</CardTitle>
                <CardDescription>Review your portfolio before publishing.</CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioPreview template={formData.template} data={formData} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Draft saved",
                        description: "Your portfolio has been saved as a draft.",
                      })
                      router.push("/dashboard")
                    }}
                  >
                    Save as Draft
                  </Button>
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>Publish Portfolio</>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
