"use client"

import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Globe,
  Star,
  Award,
  Users,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Download,
  Menu,
  X,
  FileText,
  MapPin,
  ShieldCheck,
  Server,
  Database,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronUp,
  Terminal,
  Cpu,
  Layers,
  User,
  Compass,
  FolderGit2,
  PhoneCall,
} from "lucide-react"
import Link from "next/link"
import SplashCursor from "../components/SplashCursor"
import { portfolioData } from "@/src/data/portfolio"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Ultra-smooth GPU-accelerated reveal variants (no filter blur to prevent composite flickering)
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const sectionHeaderAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [showHeader, setShowHeader] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeExpTab, setActiveExpTab] = useState<"experience" | "education">("experience")
  const [projectFilter, setProjectFilter] = useState<string>("all")
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  // Professional roles focusing on Software Engineering, Full-Stack, Backend, Cloud & DevOps
  const roles = [
    "Software Engineer",
    "Full-Stack Web Developer",
    "Backend Engineering Specialist",
    "Cloud & DevOps Engineer",
  ]
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  // Scroll Progress
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  // Motivational quotes
  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "The only way to do great work is to love what you do.",
    "Great things never come from comfort zones.",
    "Clean code always looks like it was written by someone who cares.",
    "Opportunities don't happen, you create them.",
    "Turn caffeine into clean, high-performance software.",
  ]
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [motivationalQuotes.length])

  // GSAP Animations for Hero
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-title", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power3.out" })
      gsap.fromTo(".hero-subtitle", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" })

      gsap.to(".parallax-bg", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Header scroll detection & Back to top button state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setShowHeader(false)
        setMobileMenuOpen(false)
      } else {
        setShowHeader(true)
      }
      lastScrollY.current = window.scrollY

      if (window.scrollY > 400) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nameParts = portfolioData.about.name.split(" ")
  const firstName = nameParts.slice(0, -1).join(" ")
  const lastName = nameParts[nameParts.length - 1]

  // Filter projects dynamically
  const filteredProjects = portfolioData.projects.filter((p) => {
    if (projectFilter === "featured") return p.featured
    if (projectFilter === "fullstack") return p.tech.some((t) => ["React.js", "Express.js", "Next.js", "MongoDB", "PostgreSQL", "Laravel", "Node.js"].includes(t))
    if (projectFilter === "security_ai") return p.tech.some((t) => ["FastAPI", "Python", "Flask"].includes(t)) || p.title.toLowerCase().includes("vulnerability") || p.title.toLowerCase().includes("tumor")
    return true
  })

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden min-h-screen relative selection:bg-purple-600 selection:text-white">
      {/* Global Full-Page Fluid SplashCursor Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SplashCursor />
      </div>

      {/* Global Smooth Cursor Follower */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 z-50 origin-left shadow-[0_0_12px_rgba(168,85,247,0.8)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Glassmorphism Header */}
      <header
        ref={headerRef}
        className={`fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-5xl rounded-2xl md:rounded-3xl bg-neutral-950/85 backdrop-blur-xl border border-neutral-800/80 shadow-2xl flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 transition-all duration-500 ${
          showHeader ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 border border-white/20 group-hover:scale-105 transition-transform duration-300">
            <Terminal size={18} className="text-white" />
          </div>
          <span className="font-black text-sm sm:text-base md:text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
            {portfolioData.about.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="#about" className="text-gray-300 hover:text-white transition-colors px-2 py-1">About</a>
          <a href="#journey" className="text-gray-300 hover:text-white transition-colors px-2 py-1">Journey</a>
          <a href="#skills" className="text-gray-300 hover:text-white transition-colors px-2 py-1">Skills</a>
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors px-2 py-1">Projects</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors px-2 py-1">Contact</a>
          <a
            href="/Gul Faraz Khan CV.pdf"
            download="Gul_Faraz_Khan_CV.pdf"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-purple-500/20 active:scale-95"
          >
            <Download size={14} /> CV
          </a>
        </nav>

        {/* Mobile Navigation Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:outline-none active:scale-95 transition-transform"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Premium Full-Screen Mobile Drawer Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md md:hidden"
            />

            {/* Mobile Drawer Sheet */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-50 w-full bg-neutral-950/98 backdrop-blur-2xl border-b border-neutral-800 p-6 shadow-2xl flex flex-col justify-between max-h-[90vh] overflow-y-auto md:hidden rounded-b-3xl"
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-5 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 border border-white/20">
                    <Terminal size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base leading-tight">{portfolioData.about.name}</h3>
                    <p className="text-xs text-purple-400 font-mono">Software Engineer</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-gray-300 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="py-6 flex flex-col gap-3">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-bold text-base hover:bg-neutral-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <User size={18} className="text-purple-400" /> About Me
                  </span>
                  <ArrowUpRight size={16} className="text-gray-500" />
                </a>

                <a
                  href="#journey"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-bold text-base hover:bg-neutral-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Compass size={18} className="text-blue-400" /> My Journey
                  </span>
                  <ArrowUpRight size={16} className="text-gray-500" />
                </a>

                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-bold text-base hover:bg-neutral-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Code size={18} className="text-emerald-400" /> Technical Skills
                  </span>
                  <ArrowUpRight size={16} className="text-gray-500" />
                </a>

                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-bold text-base hover:bg-neutral-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FolderGit2 size={18} className="text-pink-400" /> Featured Projects
                  </span>
                  <ArrowUpRight size={16} className="text-gray-500" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white font-bold text-base hover:bg-neutral-900 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <PhoneCall size={18} className="text-amber-400" /> Contact Me
                  </span>
                  <ArrowUpRight size={16} className="text-gray-500" />
                </a>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-4 border-t border-neutral-900 flex flex-col gap-3">
                <a
                  href="/Gul Faraz Khan CV.pdf"
                  download="Gul_Faraz_Khan_CV.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/20 active:scale-95 transition-transform"
                >
                  <Download size={18} /> Download CV (PDF)
                </a>

                <div className="flex items-center justify-center gap-6 pt-2 text-gray-400">
                  {portfolioData.about.github && (
                    <a href={portfolioData.about.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {portfolioData.about.linkedin && (
                    <a href={portfolioData.about.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {portfolioData.about.email && (
                    <a href={`mailto:${portfolioData.about.email}`} className="hover:text-white transition-colors">
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-36 pb-24 px-4 sm:px-6 md:px-12 lg:px-16"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px] animate-blob1" />
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-600/25 rounded-full blur-[110px] animate-blob2" />
        </div>

        <motion.div className="parallax-bg absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black/80 to-black/90"></div>
        </motion.div>

        {/* Hero Main Content */}
        <motion.div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center" style={{ y: textY }}>
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-mono font-bold mb-8 shadow-lg shadow-purple-500/10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles size={14} className="text-purple-400" /> Open for Software Engineering & Full-Stack Roles
          </motion.div>

          {/* Hero Name Title */}
          <motion.h1
            className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="shiny-text">{firstName}</span>
            {lastName && (
              <>
                <br />
                <span className="shiny-text">{lastName}</span>
              </>
            )}
          </motion.h1>

          {/* Typewriter Dynamic Subtitle */}
          <div className="h-10 sm:h-12 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-purple-300 to-blue-300 font-mono"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Building high-performance web applications, robust RESTful backend architectures, and scalable digital solutions with modern stack expertise.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
            <motion.a
              href="#projects"
              className="px-7 py-3.5 bg-white text-black font-extrabold text-sm sm:text-base tracking-wider rounded-xl hover:bg-gray-200 transition-all shadow-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE WORK <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="/Gul Faraz Khan CV.pdf"
              download="Gul_Faraz_Khan_CV.pdf"
              className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold text-sm sm:text-base tracking-wider rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all shadow-xl shadow-purple-600/20 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} /> DOWNLOAD CV
            </motion.a>

            <Link href="/contact">
              <motion.div
                className="px-7 py-3.5 border-2 border-neutral-700 text-white font-extrabold text-sm sm:text-base tracking-wider rounded-xl hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONTACT ME
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Motivational Quote Badge */}
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex absolute bottom-8 right-8 z-20 max-w-sm rounded-2xl bg-neutral-950/80 border border-neutral-800 backdrop-blur-xl px-5 py-3.5 shadow-xl items-center gap-2"
        >
          <span className="text-2xl text-purple-400 font-serif font-bold">"</span>
          <span className="text-xs text-gray-300 font-medium">{motivationalQuotes[quoteIndex]}</span>
          <span className="text-2xl text-purple-400 font-serif font-bold">"</span>
        </motion.div>
      </section>

      {/* High-Impact Key Stats Bar */}
      <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-16 border-y border-neutral-900/60 bg-black/40 backdrop-blur-md relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-purple-500/60 backdrop-blur-md transition-all group"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1">
              3.49
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-400 font-mono">BS CS CGPA (COMSATS)</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-purple-500/60 backdrop-blur-md transition-all group"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-1">
              10+
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-400 font-mono">Full-Stack Projects</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-purple-500/60 backdrop-blur-md transition-all group"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
              3+
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-400 font-mono">Roles & Internships</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-purple-500/60 backdrop-blur-md transition-all group"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400 mb-1">
              100%
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-400 font-mono">Clean Code & Quality</p>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="pt-28 pb-28 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={sectionHeaderAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-16 text-center"
          >
            ABOUT ME
          </motion.h2>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-7"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 font-mono text-xs font-bold">
                  <MapPin size={14} /> {portfolioData.about.location}
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 font-mono text-xs font-bold">
                  <GraduationCap size={14} /> BS Computer Science
                </span>
              </div>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 mb-8 text-left">
                {portfolioData.about.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {portfolioData.about.github && (
                  <motion.a
                    href={portfolioData.about.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white hover:text-purple-400 hover:border-purple-500 transition-all backdrop-blur-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Github size={24} />
                  </motion.a>
                )}
                {portfolioData.about.linkedin && (
                  <motion.a
                    href={portfolioData.about.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white hover:text-blue-400 hover:border-blue-500 transition-all backdrop-blur-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                )}
                {portfolioData.about.email && (
                  <motion.a
                    href={`mailto:${portfolioData.about.email}`}
                    className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white hover:text-emerald-400 hover:border-emerald-500 transition-all backdrop-blur-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Mail size={24} />
                  </motion.a>
                )}

                <a
                  href="/Gul Faraz Khan CV.pdf"
                  download="Gul_Faraz_Khan_CV.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-900/80 border border-neutral-700 hover:border-purple-500 rounded-xl text-white font-bold text-xs sm:text-sm transition-all backdrop-blur-md"
                >
                  <Download size={16} /> Download Resume (PDF)
                </a>
              </div>
            </motion.div>

            {/* Profile Avatar Frame */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-full max-w-[320px] sm:max-w-[360px] h-[440px] bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 p-1 rounded-3xl shadow-2xl shadow-purple-600/20">
                <div className="w-full h-full bg-neutral-950/90 rounded-[1.4rem] overflow-hidden flex items-center justify-center relative group">
                  <img src="/profile.png" alt={portfolioData.about.name} className="w-full h-full object-cover rounded-[1.4rem] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-bold text-xs sm:text-sm font-mono">Gul Faraz Khan</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="journey" className="pt-24 pb-24 px-4 sm:px-6 md:px-12 lg:px-16 text-white relative overflow-hidden bg-transparent border-y border-neutral-900/60">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={sectionHeaderAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-10 text-center text-white"
          >
            JOURNEY
          </motion.h2>

          {/* Toggle Experience / Education */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveExpTab("experience")}
              className={`flex items-center gap-2 px-6 py-3 font-bold font-mono text-xs sm:text-sm rounded-full border transition-all duration-300 ${
                activeExpTab === "experience"
                  ? "bg-white text-black border-white shadow-lg shadow-white/10"
                  : "bg-transparent text-white border-neutral-800 hover:border-white"
              }`}
            >
              <Briefcase size={16} /> WORK EXPERIENCE
            </button>
            <button
              onClick={() => setActiveExpTab("education")}
              className={`flex items-center gap-2 px-6 py-3 font-bold font-mono text-xs sm:text-sm rounded-full border transition-all duration-300 ${
                activeExpTab === "education"
                  ? "bg-white text-black border-white shadow-lg shadow-white/10"
                  : "bg-transparent text-white border-neutral-800 hover:border-white"
              }`}
            >
              <GraduationCap size={16} /> ACADEMIC EDUCATION
            </button>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeExpTab === "experience" ? (
                <motion.div
                  key="exp-tab"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {portfolioData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="bg-neutral-900/60 border border-neutral-800 p-6 sm:p-7 rounded-2xl backdrop-blur-md hover:border-purple-500/80 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block px-3 py-1 bg-purple-950/80 border border-purple-800/60 rounded-full text-xs font-bold font-mono text-purple-300 mb-3">
                          {exp.duration}
                        </span>
                        <h3 className="text-xl font-black">{exp.role}</h3>
                        <p className="text-gray-300 font-semibold mb-4 text-xs sm:text-sm">{exp.company}</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-400 text-xs sm:text-sm leading-relaxed">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="edu-tab"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-6 max-w-3xl mx-auto"
                >
                  {portfolioData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-2xl backdrop-blur-md hover:border-purple-500 transition-all duration-300"
                    >
                      <span className="inline-block px-3 py-1 bg-purple-950/80 border border-purple-800/60 rounded-full text-xs font-bold font-mono text-purple-300 mb-3">
                        {edu.duration}
                      </span>
                      <h3 className="text-2xl font-black mt-1">{edu.degree}</h3>
                      <p className="text-gray-300 font-semibold mb-3 text-sm sm:text-base">{edu.institution}</p>
                      <div className="inline-block bg-purple-900/40 border border-purple-700/50 px-3 py-1 rounded-lg text-xs font-mono font-bold text-white mb-4">
                        CGPA: {edu.cgpa}
                      </div>
                      {edu.details && (
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-neutral-800 pt-4">
                          {edu.details}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="pt-28 pb-32 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={sectionHeaderAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-10 text-center"
          >
            TECHNICAL SKILLS
          </motion.h2>

          <div className="flex flex-col items-center justify-center w-full mt-8">
            <div className="w-full max-w-5xl">
              <TabSwitcher />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-28 pb-28 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden bg-transparent border-t border-neutral-900/60">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={sectionHeaderAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-16 text-center"
          >
            WHAT I DO
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolioData.whatIDo.map((service, index) => (
              <SpotlightServiceCard key={service.title} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="pt-28 pb-32 px-4 sm:px-6 md:px-12 lg:px-16 relative overflow-hidden bg-transparent">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={sectionHeaderAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-10 text-center"
          >
            FEATURED PROJECTS
          </motion.h2>

          {/* Project Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "all", label: "All Projects" },
              { id: "featured", label: "Featured" },
              { id: "fullstack", label: "Full-Stack Web" },
              { id: "security_ai", label: "Security & AI" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProjectFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                  projectFilter === tab.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-neutral-900/80 border border-neutral-800 text-gray-400 hover:text-white backdrop-blur-md"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <SpotlightProjectCard key={project.title} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-28 pb-36 px-4 sm:px-6 md:px-12 lg:px-16 bg-transparent border-t border-neutral-900/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            variants={sectionHeaderAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4"
          >
            LET'S WORK TOGETHER
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-base sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Have a project in mind, an engineering requirement, or a job opportunity? Let's connect and build something exceptional!
          </motion.p>

          <Link href="/contact">
            <motion.div
              className="inline-block jelly-green-btn cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET IN TOUCH
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-neutral-900/60 bg-black/80 backdrop-blur-md text-center text-xs text-gray-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Gul Faraz Khan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://github.com/gulfarazkhanniazi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>•</span>
            <a href="https://linkedin.com/in/gul-faraz-khan-0a66862a9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <span>•</span>
            <a href={`mailto:${portfolioData.about.email}`} className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {/* Back To Top Floating Action Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-purple-600 text-white shadow-xl shadow-purple-600/30 hover:bg-purple-500 transition-colors focus:outline-none"
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// Global Custom Glowing Cursor Follower
function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      if (target && target.closest && target.closest("button, a, .cursor-pointer, input, textarea")) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-400/60 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(59, 130, 246, 0.8)" : "rgba(168, 85, 247, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </div>
  )
}

// TabSwitcher component for skills
function TabSwitcher() {
  const [skillTab, setSkillTab] = useState(0)
  const tabNames = ["Technical Stack", "Soft Skills", "Tools & Platforms"]
  const tabRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)]
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const node = tabRefs[skillTab].current
    if (node) {
      setIndicatorStyle({ left: node.offsetLeft, width: node.offsetWidth })
    }
  }, [skillTab])

  return (
    <div className="relative flex flex-col items-center mb-10 w-full">
      <div className="flex bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full p-1.5 gap-1 relative max-w-full overflow-x-auto">
        <div
          className="absolute top-1.5 left-0 h-[calc(100%-0.75rem)] rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-md transition-all duration-300 ease-out z-0 pointer-events-none"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            ref={tabRefs[idx]}
            onClick={() => setSkillTab(idx)}
            className={`relative z-10 px-5 sm:px-7 py-2.5 font-bold font-mono text-xs sm:text-sm rounded-full transition-colors whitespace-nowrap focus:outline-none ${
              skillTab === idx ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full mt-10">
        <AnimatePresence mode="wait">
          <TabContent key={skillTab} skillTab={skillTab} />
        </AnimatePresence>
      </div>
    </div>
  )
}

function TabContent({ skillTab }: { skillTab: number }) {
  const technicalCategories = [
    { icon: Code, title: "FRONTEND", skills: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { icon: Server, title: "BACKEND", skills: ["Node.js", "Express.js", "FastAPI", "Laravel", "Python", "PHP", "C++", "REST APIs"] },
    { icon: Database, title: "DATABASES", skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Supabase"] },
    { icon: Zap, title: "DEVOPS & CLOUD", skills: ["Docker", "AWS (Basics)", "Linux", "Git", "GitHub", "CI/CD", "Postman"] },
  ]

  return (
    <motion.div
      key={skillTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {skillTab === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {technicalCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-6 border border-neutral-800 hover:border-purple-500/60 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <category.icon size={36} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-black tracking-wide mb-4 text-white">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-black/60 border border-neutral-800 rounded-lg text-xs font-mono font-semibold text-purple-200">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {skillTab === 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Problem Solving",
            "Software Architecture",
            "Team Collaboration",
            "Adaptability",
            "Critical Thinking",
            "Clean Code Practices",
            "Time Management",
            "Continuous Learning",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              className="bg-neutral-900/60 backdrop-blur-md border border-blue-900/60 rounded-2xl p-5 text-center text-white font-bold text-xs sm:text-sm hover:border-blue-400 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      )}

      {skillTab === 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Git & GitHub",
            "Docker",
            "Postman",
            "VS Code",
            "Linux",
            "AWS",
            "Vercel",
            "Netlify",
            "Supabase",
            "Firebase",
            "Figma",
            "Trello",
          ].map((tool, index) => (
            <motion.div
              key={tool}
              className="bg-neutral-900/60 backdrop-blur-md border border-purple-900/60 rounded-2xl p-4 text-center text-white font-semibold text-xs sm:text-sm hover:border-purple-400 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              viewport={{ once: true }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Spotlight Service Card with smooth mouse light tracking
function SpotlightServiceCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  let ServiceIcon = Code
  if (service.title.toLowerCase().includes("backend")) ServiceIcon = Server
  else if (service.title.toLowerCase().includes("database")) ServiceIcon = Database
  else if (service.title.toLowerCase().includes("devops") || service.title.toLowerCase().includes("cloud")) ServiceIcon = Zap
  else if (service.title.toLowerCase().includes("architecture") || service.title.toLowerCase().includes("software")) ServiceIcon = Layers

  return (
    <motion.div
      variants={fadeInUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-neutral-950/70 backdrop-blur-md p-8 rounded-2xl border border-neutral-800 hover:border-purple-500/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
      whileHover={{ y: -6 }}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
          }}
        />
      )}

      <div>
        <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
          <ServiceIcon size={26} />
        </div>
        <h3 className="text-xl font-black tracking-wide mb-3 text-white group-hover:text-purple-300 transition-colors">
          {service.title.toUpperCase()}
        </h3>
        <p className="text-gray-400 leading-relaxed text-xs sm:text-sm mb-6">{service.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-900/80">
        {service.skills.map((skill: string) => (
          <span key={skill} className="px-2.5 py-1 bg-black/60 border border-neutral-900 rounded-md text-[11px] font-mono text-purple-300 font-semibold">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

interface Project {
  title: string
  description: string
  tech: string[]
  github: string | null
  live: string | null
  featured: boolean
}

// Spotlight Project Card with GPU-accelerated 3D tilt & spotlight light
function SpotlightProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const maxTilt = 8
    const tiltX = ((y - centerY) / centerY) * maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt
    setTilt({ x: tiltX, y: tiltY })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between bg-neutral-950/70 backdrop-blur-md border rounded-2xl p-7 transition-all duration-300 overflow-hidden cursor-pointer min-h-[380px] ${
        project.featured ? "border-purple-500/40 shadow-lg shadow-purple-500/10" : "border-neutral-800 hover:border-neutral-700"
      }`}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.05 }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        willChange: "transform",
      }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
          }}
        />
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <Code size={22} />
          </div>
          {project.featured && (
            <span className="px-2.5 py-1 bg-purple-950/90 border border-purple-800 rounded-full text-[10px] font-mono font-bold text-purple-300 uppercase">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 bg-black/60 border border-neutral-900 rounded-md text-[11px] font-mono text-purple-300">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:from-purple-500 hover:to-blue-500 transition-colors shadow-md"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
            >
              <Github size={14} /> Code Repo
            </a>
          )}
          {!project.live && !project.github && (
            <span className="w-full py-2.5 px-4 rounded-xl bg-neutral-900/80 text-neutral-500 font-bold text-xs text-center border border-neutral-800 cursor-default">
              Academic / Proprietary System
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
