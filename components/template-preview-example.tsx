"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Tablet } from "lucide-react"

type DeviceType = "desktop" | "tablet" | "mobile"

type TemplatePreviewProps = {
  templateId: string
  templateName: string
  previewImage: string
}

export function TemplatePreviewExample({ templateId, templateName, previewImage }: TemplatePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("desktop")

  const deviceDimensions = {
    desktop: { width: "w-full", height: "h-[600px]" },
    tablet: { width: "w-[768px]", height: "h-[1024px]" },
    mobile: { width: "w-[375px]", height: "h-[812px]" },
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{templateName} Preview</h2>
          <div className="flex items-center space-x-2 bg-muted rounded-full p-1">
            <Button
              variant={device === "desktop" ? "default" : "ghost"}
              size="icon"
              className="rounded-full"
              onClick={() => setDevice("desktop")}
            >
              <Monitor className="h-4 w-4" />
              <span className="sr-only">Desktop</span>
            </Button>
            <Button
              variant={device === "tablet" ? "default" : "ghost"}
              size="icon"
              className="rounded-full"
              onClick={() => setDevice("tablet")}
            >
              <Tablet className="h-4 w-4" />
              <span className="sr-only">Tablet</span>
            </Button>
            <Button
              variant={device === "mobile" ? "default" : "ghost"}
              size="icon"
              className="rounded-full"
              onClick={() => setDevice("mobile")}
            >
              <Smartphone className="h-4 w-4" />
              <span className="sr-only">Mobile</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div
            className={`relative overflow-hidden border border-border rounded-lg shadow-lg ${deviceDimensions[device].width} ${deviceDimensions[device].height}`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-zinc-800 text-white px-3 py-2 flex items-center space-x-2 border-b border-border">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-xs truncate">
                {templateName.toLowerCase().replace(/\s+/g, "-")}.quickfolio.xyz
              </div>
            </div>
            <div className="relative w-full h-full">
              <Image
                src={previewImage || "/placeholder.svg"}
                alt={`${templateName} template preview`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full max-w-4xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="suitability">Best For</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="p-4 bg-muted/30 rounded-lg mt-2">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Responsive design that works on all devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Optimized for fast loading and performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>SEO-friendly structure and metadata</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Interactive elements and animations</span>
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="customization" className="p-4 bg-muted/30 rounded-lg mt-2">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Customize colors and typography</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Rearrange and hide sections</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Add custom CSS for advanced styling</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Change layout and spacing options</span>
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="suitability" className="p-4 bg-muted/30 rounded-lg mt-2">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Developers and programmers</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Designers and creative professionals</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Freelancers and consultants</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Students and job seekers</span>
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}
