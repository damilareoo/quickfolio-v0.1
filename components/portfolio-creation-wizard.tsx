"use client"

import type React from "react"

import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, Sparkles, Copy, GitlabIcon as GitHub } from "lucide-react"
import gsap from "gsap"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Template data - focused on just three templates
const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean developer portfolio with a focus on projects and skills",
    image: "/templates/damilare/preview.png",
    category: "Developer",
    featured: true,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Elegant and structured design for a polished presentation",
    image: "/templates/layers-template.png",
    category: "Professional",
    featured: false,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and expressive design for creative professionals",
    image: "/templates/masid-template.png",
    category: "Creative",
    featured: false,
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
  const [enableFork, setEnableFork] = useState(false)

  // Refs for animations
  const templateCardsRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

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

      // Animate the selected template
      if (templateCardsRef.current) {
        const cards = templateCardsRef.current.querySelectorAll(".template-card")
        cards.forEach((card) => {
          if (card.getAttribute("data-template-id") === templateId) {
            gsap.to(card, {
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              duration: 0.3,
              ease: "power2.out",
            })
          } else {
            gsap.to(card, {
              scale: 1,
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out",
            })
          }
        })
      }
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
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

      // Animate the preview to draw attention to it
      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          { borderColor: "rgba(var(--primary-rgb), 0.8)", boxShadow: "0 0 0 2px rgba(var(--primary-rgb), 0.3)" },
          {
            borderColor: "rgba(var(--border-rgb), 1)",
            boxShadow: "none",
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
          },
        )
      }
    }, 1500)
  }

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Choose Template" },
    { id: 3, name: "Content" },
    { id: 4, name: "Preview & Publish" },
  ]

  // Animation variants
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
    <div className="space-y-8">
      {/* Wrap the search params component in Suspense */}
      <Suspense fallback={null}>
        <TemplateSelector onSelectTemplate={handleTemplateFromUrl} />
      </Suspense>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center"
      >
        <div className="flex space-x-2">
          {steps.map((s) => (
            <motion.div
              key={s.id}
              variants={itemVariants}
              className={cn(
                "flex items-center",
                s.id !== steps.length && "after:content-[''] after:h-px after:w-8 after:bg-muted after:mx-2",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  step === s.id
                    ? "bg-primary text-primary-foreground"
                    : step > s.id
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {step > s.id ? <Check className="h-4 w-4" /> : s.id}
              </div>
              <span
                className={cn(
                  "ml-2 hidden sm:inline-block",
                  step === s.id ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {s.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Basic Information</CardTitle>
                <CardDescription>Let's start with some basic information about your portfolio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="space-y-2"
                >
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
                    className="h-12"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="A brief description of your portfolio"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[100px] resize-none"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="profession">
                    Your Profession <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.profession}
                    onValueChange={(value) => handleSelectChange("profession", value)}
                    required
                  >
                    <SelectTrigger className="h-12">
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
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <MagneticButton onClick={handleNext} className="rounded-full">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Choose a Template</CardTitle>
                <CardDescription>
                  Select a template that best fits your style. Your published portfolio will look exactly like the
                  template you choose.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={templateCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      data-template-id={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={cn(
                        "cursor-pointer overflow-hidden rounded-xl border-2 transition-all template-card",
                        selectedTemplate === template.id
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border hover:border-primary/50",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                        {selectedTemplate === template.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        )}
                        {template.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8 flex items-center space-x-2"
                >
                  <Switch id="enable-fork" checked={enableFork} onCheckedChange={setEnableFork} />
                  <Label htmlFor="enable-fork" className="cursor-pointer">
                    Enable code forking (for developers)
                  </Label>
                </motion.div>

                {enableFork && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 rounded-lg border bg-muted p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <GitHub className="mr-2 h-5 w-5" />
                        <span className="font-medium">Repository Access</span>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Clone URL
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You'll have access to the template's source code after publishing your portfolio.
                    </p>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack} className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <MagneticButton onClick={handleNext} disabled={!selectedTemplate} className="rounded-full">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Portfolio Content</CardTitle>
                  <CardDescription>Add content to your portfolio or let our AI generate it for you.</CardDescription>
                  <div className="flex justify-end mt-4">
                    <MagneticButton
                      variant="outline"
                      onClick={generateAIContent}
                      disabled={isLoading || !formData.profession}
                      className="flex items-center rounded-full"
                    >
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Generate with AI
                    </MagneticButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 rounded-full">
                      <TabsTrigger value="about" className="rounded-full">
                        About
                      </TabsTrigger>
                      <TabsTrigger value="skills" className="rounded-full">
                        Skills
                      </TabsTrigger>
                      <TabsTrigger value="experience" className="rounded-full">
                        Experience
                      </TabsTrigger>
                      <TabsTrigger value="projects" className="rounded-full">
                        Projects
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="about" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="about">About Me</Label>
                        <Textarea
                          id="about"
                          name="about"
                          placeholder="Write a brief introduction about yourself"
                          className="min-h-[250px] resize-none"
                          value={formData.about}
                          onChange={handleInputChange}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="skills" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Textarea
                          id="skills"
                          name="skills"
                          placeholder="List your skills (comma separated)"
                          className="min-h-[250px] resize-none"
                          value={formData.skills}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate skills with commas (e.g., "JavaScript, React, UI Design")
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="experience" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          placeholder="List your work experience"
                          className="min-h-[250px] resize-none"
                          value={formData.experience}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-muted-foreground">Add each position on a new line</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="projects" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="projects">Projects</Label>
                        <Textarea
                          id="projects"
                          name="projects"
                          placeholder="Describe your projects"
                          className="min-h-[250px] resize-none"
                          value={formData.projects}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Add each project on a new line with a brief description
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div>
                <Card ref={previewRef} className="border-0 shadow-lg sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Live Preview</CardTitle>
                    <CardDescription>See how your portfolio will look as you edit</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 h-[500px] overflow-auto">
                    <PortfolioPreview template={formData.template} data={formData} />
                  </CardContent>
                  <CardFooter className="flex justify-between border-t mt-4 pt-4">
                    <Button variant="outline" onClick={handleBack} className="rounded-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <MagneticButton onClick={handleNext} className="rounded-full">
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </MagneticButton>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Preview Your Portfolio</CardTitle>
                  <CardDescription>
                    Review your portfolio before publishing. This is exactly how it will appear to visitors.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[600px] overflow-auto">
                  <PortfolioPreview template={formData.template} data={formData} />
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Publishing Options</CardTitle>
                    <CardDescription>Configure how your portfolio will be published.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="domain">Portfolio URL</Label>
                      <div className="flex">
                        <Input
                          id="domain"
                          name="domain"
                          value={formData.name.toLowerCase().replace(/\s+/g, "-")}
                          className="rounded-l-md rounded-r-none"
                          readOnly
                        />
                        <div className="flex items-center justify-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
                          .quickfolio.xyz
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your portfolio will be available at this URL. You can connect a custom domain later.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <Label htmlFor="visibility">Portfolio Visibility</Label>
                        <Select defaultValue="public">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="password">Password Protected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground">Control who can view your portfolio.</p>
                    </motion.div>

                    {enableFork && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Label htmlFor="repository">GitHub Repository</Label>
                          <Switch id="repository" defaultChecked={true} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Create a GitHub repository with your portfolio code.
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <MagneticButton
                      onClick={handleSubmit}
                      disabled={isLoading}
                      size="lg"
                      className="w-full rounded-full"
                    >
                      {isLoading ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          Publish Portfolio
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </MagneticButton>
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Draft saved",
                          description: "Your portfolio has been saved as a draft.",
                        })
                        router.push("/dashboard")
                      }}
                      className="w-full rounded-full"
                    >
                      Save as Draft
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
