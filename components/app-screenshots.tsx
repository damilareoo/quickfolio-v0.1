"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type Screenshot = {
  title: string
  description: string
  image: string
  alt: string
}

const screenshots: Screenshot[] = [
  {
    title: "Dashboard",
    description: "Manage all your portfolios in one place",
    image: "/screenshots/landing-page.png",
    alt: "Quickfolio dashboard screenshot",
  },
  {
    title: "Template Selection",
    description: "Choose from beautiful, professionally designed templates",
    image: "/templates/layers-template.png",
    alt: "Template selection screenshot",
  },
  {
    title: "Portfolio Editor",
    description: "Customize your portfolio with an intuitive editor",
    image: "/templates/masid-template.png",
    alt: "Portfolio editor screenshot",
  },
  {
    title: "Analytics",
    description: "Track your portfolio's performance with detailed analytics",
    image: "/templates/damilare-template.png",
    alt: "Analytics dashboard screenshot",
  },
]

export function AppScreenshots() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Explore Quickfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a tour of Quickfolio's intuitive interface and powerful features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={screenshot.image || "/placeholder.svg"}
                      alt={screenshot.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{screenshot.title}</h3>
                    <p className="text-muted-foreground">{screenshot.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
