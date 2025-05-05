"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

const categories = ["All", "Professional", "Creative", "Developer"]

export function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredTemplates =
    activeCategory === "All" ? templates : templates.filter((template) => template.category === activeCategory)

  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Professional Templates</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose from our collection of professionally designed templates and customize them to match your personal
          style.
        </p>
      </div>

      <div className="flex justify-center mt-8 mb-12 space-x-2 overflow-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden group">
              <div className="overflow-hidden relative aspect-[2/3]">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/dashboard/new?template=${template.id}`}>
                    <Button>Use Template</Button>
                  </Link>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <Link href="/auth/register">
          <Button variant="outline" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  )
}
