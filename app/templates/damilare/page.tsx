"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  GitlabIcon as GitHub,
  Twitter,
  Linkedin,
  Mail,
  Menu,
  X,
  ExternalLink,
  Download,
  ArrowUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DamilarePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Check for dark mode preference on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(isDark)
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

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

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  // Social links
  const socialLinks = [
    { name: "GitHub", icon: <GitHub className="h-5 w-5" />, href: "https://github.com/damilaredev" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/damilaredev" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/damilaredev" },
    { name: "Email", icon: <Mail className="h-5 w-5" />, href: "mailto:hello@damilareoo.xyz" },
  ]

  // Projects data
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment integration.",
      image: "/templates/damilare/project1.png",
      tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
      demoUrl: "https://ecommerce-demo.damilareoo.xyz",
      codeUrl: "https://github.com/damilaredev/ecommerce",
    },
    {
      title: "Task Management App",
      description: "A productivity tool for organizing tasks with drag-and-drop functionality.",
      image: "/templates/damilare/project2.png",
      tags: ["TypeScript", "React", "Redux", "Firebase"],
      demoUrl: "https://tasks-demo.damilareoo.xyz",
      codeUrl: "https://github.com/damilaredev/tasks",
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills.",
      image: "/templates/damilare/project3.png",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      demoUrl: "https://portfolio-demo.damilareoo.xyz",
      codeUrl: "https://github.com/damilaredev/portfolio",
    },
    {
      title: "Weather Dashboard",
      description: "A weather application with location-based forecasts and interactive maps.",
      image: "/templates/damilare/project4.png",
      tags: ["JavaScript", "React", "Weather API", "Chart.js"],
      demoUrl: "https://weather-demo.damilareoo.xyz",
      codeUrl: "https://github.com/damilaredev/weather",
    },
  ]

  // Experience data
  const experiences = [
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
  ]

  // Skills data
  const skills = [
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
  ]

  return (
    <div className={cn("min-h-screen bg-white text-gray-900", isDarkMode && "dark")}>
      <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        {/* Progress bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-gray-900 dark:bg-gray-100 z-50 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        {/* Back to Quickfolio button */}
        <div className="fixed top-4 left-4 z-50">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quickfolio
          </Link>
        </div>

        {/* Header */}
        <header
          ref={headerRef}
          className="fixed top-0 left-0 right-0 py-6 px-6 md:px-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-40 transition-all duration-300"
        >
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Damilare Ojo</h1>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    activeSection === item.href.substring(1)
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                  )}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                className="md:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Damilare Ojo</h1>
                <button
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <a key={item.name} href={item.href} className="text-lg font-medium" onClick={toggleMenu}>
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="mt-auto">
                <div className="flex space-x-4 mt-8">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* Hero section */}
          <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Frontend Developer</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    I build accessible, responsive, and performant web applications that provide great user experiences.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                      Contact Me
                    </a>
                    <a
                      href="/templates/damilare/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Resume
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square flex items-center justify-center"
                >
                  <Image
                    src="/templates/damilare/avatar.jpg"
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
          <section id="about" className="py-16 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">About Me</h3>
              <div className="prose max-w-none dark:prose-invert">
                <p className="leading-relaxed">
                  I'm a passionate Frontend Developer with a strong focus on creating intuitive and performant web
                  applications. With expertise in React, Next.js, and TypeScript, I specialize in building responsive
                  interfaces that provide exceptional user experiences.
                </p>
                <p className="leading-relaxed">
                  My approach combines technical excellence with creative problem-solving, ensuring that the
                  applications I build are not only functional but also aesthetically pleasing and accessible to all
                  users.
                </p>
                <p className="leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing my knowledge through technical articles and mentoring.
                </p>
              </div>
            </div>
          </section>

          {/* Skills section */}
          <section className="py-16 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
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
          <section id="projects" className="py-16 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden group hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Live Demo
                        </a>
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <GitHub className="mr-2 h-3 w-3" />
                          Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience section */}
          <section id="experience" className="py-16 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Experience</h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 py-2"
                  >
                    <h4 className="text-lg font-semibold">{exp.role}</h4>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <span>{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span>{exp.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact section */}
          <section id="contact" className="py-16 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Damilare Ojo. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
              <a
                href="/templates/damilare/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
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
          <button
            className="p-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
