"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  {
    name: "Alex Johnson",
    title: "UX Designer",
    content:
      "Quickfolio helped me create a stunning portfolio in less than an hour. The AI-generated content was spot-on and saved me hours of writing.",
    avatar: "/placeholder.svg?height=80&width=80&query=Professional headshot of woman with short hair",
  },
  {
    name: "Michael Chen",
    title: "Software Engineer",
    content:
      "As a developer, I was impressed by how easy it was to showcase my projects. The code snippet feature and GitHub integration are perfect for technical portfolios.",
    avatar: "/placeholder.svg?height=80&width=80&query=Professional headshot of man with glasses",
  },
  {
    name: "Sarah Williams",
    title: "Photographer",
    content:
      "The visual-focused templates are perfect for my photography work. The image optimization and gallery features make my portfolio look professional and load quickly.",
    avatar: "/placeholder.svg?height=80&width=80&query=Professional headshot of woman with long hair",
  },
  {
    name: "David Rodriguez",
    title: "Freelance Writer",
    content:
      "Quickfolio's AI helped me articulate my writing experience perfectly. The typography options and blog integration made creating my portfolio a breeze.",
    avatar: "/placeholder.svg?height=80&width=80&query=Professional headshot of man with beard",
  },
  {
    name: "Emily Taylor",
    title: "Graphic Designer",
    content:
      "The customization options are incredible. I was able to match my portfolio exactly to my personal brand, and the design tools are intuitive even for non-designers.",
    avatar: "/placeholder.svg?height=80&width=80&query=Professional headshot of woman with curly hair",
  },
  {
    name: "James Wilson",
    title: "Product Manager",
    content:
      "From sign-up to publishing took me just 20 minutes. The templates are professional, and the one-click deploy feature made the whole process seamless.",
    avatar: "/placeholder.svg?height=80&width=80&query=Professional headshot of man in suit",
  },
]

export function Testimonials() {
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
    <section id="testimonials" className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">What Our Users Say</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Join thousands of professionals who have created stunning portfolios with Quickfolio.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
