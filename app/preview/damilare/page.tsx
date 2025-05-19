"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Github, Twitter, Linkedin, Mail, Menu, X, ExternalLink, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DamilarePreview() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for progress bar
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentScroll = document.documentElement.scrollTop
      setScrollProgress((currentScroll / totalScroll) * 100)

      // Add shadow to header on scroll
      if (headerRef.current) {
        if (window.scrollY > 10) {
          headerRef.current.classList.add("shadow-sm")
        } else {
          headerRef.current.classList.remove("shadow-sm")
        }
      }

      // Determine active section
      const sections = ["home", "about", "projects", "experience", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-neutral-800 dark:bg-neutral-200 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>

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
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 py-6 px-6 md:px-12 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md z-40 transition-all duration-300"
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Damilare Ojo</h1>
          <nav className="hidden md:flex space-x-8">
            {[
              { name: "Home", href: "#home" },
              { name: "About", href: "#about" },
              { name: "Projects", href: "#projects" },
              { name: "Experience", href: "#experience" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col p-6 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Damilare Ojo</h1>
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-6">
          {[
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Projects", href: "#projects" },
            { name: "Experience", href: "#experience" },
            { name: "Contact", href: "#contact" },
          ].map((item) => (
            <a key={item.name} href={item.href} className="text-lg font-medium" onClick={toggleMenu}>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="flex space-x-4 mt-8">
            <Button size="icon" variant="outline" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <main>
        {/* Hero section */}
        <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Frontend Developer</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                  I build accessible, responsive, and performant web applications that provide great user experiences.
                </p>
                <div className="flex space-x-4">
                  <Button className="rounded-md">Contact Me</Button>
                  <Button variant="outline" className="rounded-md">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-neutral-100 dark:bg-neutral-800 rounded-lg aspect-square flex items-center justify-center"
              >
                <Image
                  src="/preview/damilare-avatar.png"
                  alt="Damilare Ojo"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="py-16 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">About Me</h3>
            <div className="prose max-w-none dark:prose-invert">
              <p className="leading-relaxed">
                I'm a passionate Frontend Developer with a strong focus on creating intuitive and performant web
                applications. With expertise in React, Next.js, and TypeScript, I specialize in building responsive
                interfaces that provide exceptional user experiences.
              </p>
              <p className="leading-relaxed">
                My approach combines technical excellence with creative problem-solving, ensuring that the applications
                I build are not only functional but also aesthetically pleasing and accessible to all users.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through technical articles and mentoring.
              </p>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section className="py-16 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "HTML",
                "CSS",
                "Tailwind CSS",
                "Node.js",
                "Git",
                "Responsive Design",
                "UI/UX",
                "Accessibility",
                "Performance Optimization",
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" className="py-16 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "E-commerce Platform",
                  description: "A full-featured online store with cart, checkout, and payment integration.",
                  image: "/preview/project1.png",
                  tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
                },
                {
                  title: "Task Management App",
                  description: "A productivity tool for organizing tasks with drag-and-drop functionality.",
                  image: "/preview/project2.png",
                  tags: ["TypeScript", "React", "Redux", "Firebase"],
                },
                {
                  title: "Portfolio Website",
                  description: "A responsive portfolio website showcasing projects and skills.",
                  image: "/preview/project3.png",
                  tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
                },
                {
                  title: "Weather Dashboard",
                  description: "A weather application with location-based forecasts and interactive maps.",
                  image: "/preview/project4.png",
                  tags: ["JavaScript", "React", "Weather API", "Chart.js"],
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="rounded-md">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-md">
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section id="experience" className="py-16 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Experience</h3>
            <div className="space-y-8">
              {[
                {
                  role: "Senior Frontend Developer",
                  company: "TechCorp",
                  period: "2021 - Present",
                  description:
                    "Led the development of the company's flagship product, improving performance by 40%. Mentored junior developers and implemented best practices for accessibility and code quality.",
                },
                {
                  role: "Frontend Developer",
                  company: "WebSolutions",
                  period: "2019 - 2021",
                  description:
                    "Developed responsive web applications using React and TypeScript. Collaborated with designers to implement pixel-perfect UIs and improved site performance.",
                },
                {
                  role: "Junior Web Developer",
                  company: "DigitalAgency",
                  period: "2017 - 2019",
                  description:
                    "Built and maintained websites for various clients. Worked with HTML, CSS, JavaScript, and WordPress. Participated in client meetings and requirement gathering.",
                },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-6 py-2"
                >
                  <h4 className="text-lg font-semibold">{exp.role}</h4>
                  <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-2">
                    <span>{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="py-16 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                </p>
                <div className="flex space-x-4">
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Mail className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 resize-none"
                  ></textarea>
                </div>
                <Button className="w-full rounded-md">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Damilare Ojo. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Button>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 20 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="icon"
          className="rounded-full shadow-md"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowRight className="h-5 w-5 rotate-[-90deg]" />
        </Button>
      </motion.div>
    </div>
  )
}
