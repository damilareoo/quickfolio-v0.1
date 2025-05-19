"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LayersPreview() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="bg-white min-h-screen">
      {/* Back to Quickfolio button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quickfolio
          </Button>
        </Link>
      </div>

      {/* Header */}
      <header className="py-12 px-8 text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-4">Alex Johnson</h1>
          <p className="text-xl text-muted-foreground mb-6">Product Designer</p>
          <p className="text-lg max-w-2xl mx-auto">
            I create user-centered digital experiences that solve real problems and delight users.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button>Contact Me</Button>
            <Button variant="outline">View Projects</Button>
          </div>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="py-12 px-8 max-w-3xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">About Me</h2>
          <div className="prose max-w-none">
            <p className="leading-relaxed">
              I'm a product designer with over 5 years of experience creating digital products that are both functional
              and beautiful. My approach combines user research, strategic thinking, and visual design to create
              experiences that meet user needs and business goals.
            </p>
            <p className="leading-relaxed">
              I specialize in user interface design, interaction design, and prototyping, with a focus on creating
              accessible and inclusive experiences for all users.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "UI Design",
              "UX Research",
              "Wireframing",
              "Prototyping",
              "User Testing",
              "Figma",
              "Adobe XD",
              "Sketch",
              "Design Systems",
              "Accessibility",
              "HTML/CSS",
              "Design Thinking",
            ].map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Experience</h2>
          <div className="space-y-6">
            {[
              "Senior Product Designer at DesignCo (2021-Present)",
              "Product Designer at TechStart (2019-2021)",
              "UI/UX Designer at CreativeAgency (2017-2019)",
            ].map((exp, index) => (
              <div key={index} className="border-l-2 border-primary pl-4 py-2">
                <p>{exp}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Finance App Redesign",
                description: "Improved user experience and conversion rates for a personal finance application",
                image: "/preview/layers-project1.png",
              },
              {
                title: "E-learning Platform",
                description:
                  "Designed an intuitive interface for an online learning platform with accessibility in mind",
                image: "/preview/layers-project2.png",
              },
              {
                title: "Healthcare Dashboard",
                description: "Created a comprehensive dashboard for healthcare professionals to monitor patient data",
                image: "/preview/layers-project3.png",
              },
              {
                title: "Travel Booking App",
                description: "Designed a mobile app for booking travel experiences with a focus on simplicity",
                image: "/preview/layers-project4.png",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-neutral-100 rounded-md mb-4 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-medium mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <p className="mb-6 max-w-md mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="icon" variant="ghost">
              <Mail className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 border-t mt-12 text-center text-sm text-muted-foreground">
        <div className="max-w-3xl mx-auto px-8">
          <p>© {new Date().getFullYear()} Alex Johnson. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
