"use client"

import { useLanguage } from "@/contexts/language-context"
import { ExternalLink, Github } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Portfolio data structure - easy to add/remove projects
const portfolioProjects = [
  {
    id: 1,
    title: { en: "E-commerce Platform", ar: "منصة التجارة الإلكترونية" },
    description: {
      en: "Modern e-commerce solution with AI-powered recommendations and real-time analytics.",
      ar: "حل تجارة إلكترونية حديث مع توصيات مدعومة بالذكاء الاصطناعي وتحليلات في الوقت الفعلي.",
    },
    image: "/modern-ecommerce-dashboard.png",
    demoUrl: "https://demo-ecommerce.raqmify.com",
    githubUrl: "https://github.com/raqmify/ecommerce-platform",
    technologies: ["Next.js", "TypeScript", "Stripe", "AI/ML"],
    category: "web",
  },
  {
    id: 2,
    title: { en: "Healthcare Management System", ar: "نظام إدارة الرعاية الصحية" },
    description: {
      en: "Comprehensive healthcare management platform with patient records and appointment scheduling.",
      ar: "منصة شاملة لإدارة الرعاية الصحية مع سجلات المرضى وجدولة المواعيد.",
    },
    image: "/healthcare-management-dashboard.png",
    demoUrl: "https://demo-healthcare.raqmify.com",
    githubUrl: "https://github.com/raqmify/healthcare-system",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    category: "web",
  },
  {
    id: 3,
    title: { en: "AI-Powered Analytics Dashboard", ar: "لوحة تحليلات مدعومة بالذكاء الاصطناعي" },
    description: {
      en: "Advanced analytics platform with machine learning insights and predictive modeling.",
      ar: "منصة تحليلات متقدمة مع رؤى التعلم الآلي والنمذجة التنبؤية.",
    },
    image: "/ai-analytics-dashboard.png",
    demoUrl: "https://demo-analytics.raqmify.com",
    githubUrl: "https://github.com/raqmify/ai-analytics",
    technologies: ["Python", "TensorFlow", "React", "D3.js"],
    category: "ai",
  },
  {
    id: 4,
    title: { en: "Mobile Banking App", ar: "تطبيق الخدمات المصرفية المحمولة" },
    description: {
      en: "Secure mobile banking application with biometric authentication and real-time transactions.",
      ar: "تطبيق خدمات مصرفية محمولة آمن مع المصادقة البيومترية والمعاملات في الوقت الفعلي.",
    },
    image: "/mobile-banking-app.png",
    demoUrl: "https://demo-banking.raqmify.com",
    githubUrl: "https://github.com/raqmify/mobile-banking",
    technologies: ["React Native", "Node.js", "MongoDB", "Blockchain"],
    category: "mobile",
  },
  {
    id: 5,
    title: { en: "Smart IoT Dashboard", ar: "لوحة إنترنت الأشياء الذكية" },
    description: {
      en: "IoT device management platform with real-time monitoring and automated controls.",
      ar: "منصة إدارة أجهزة إنترنت الأشياء مع المراقبة في الوقت الفعلي والتحكم الآلي.",
    },
    image: "/iot-dashboard-with-device-monitoring.png",
    demoUrl: "https://demo-iot.raqmify.com",
    githubUrl: "https://github.com/raqmify/iot-dashboard",
    technologies: ["Vue.js", "MQTT", "InfluxDB", "Docker"],
    category: "iot",
  },
  {
    id: 6,
    title: { en: "Educational Learning Platform", ar: "منصة التعلم التعليمية" },
    description: {
      en: "Interactive learning management system with video streaming and progress tracking.",
      ar: "نظام إدارة تعلم تفاعلي مع بث الفيديو وتتبع التقدم.",
    },
    image: "/educational-platform-interface.png",
    demoUrl: "https://demo-education.raqmify.com",
    githubUrl: "https://github.com/raqmify/learning-platform",
    technologies: ["Next.js", "Prisma", "WebRTC", "AWS"],
    category: "web",
  },
]

export function PortfolioSection() {
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Filter categories
  const categories = [
    { key: "all", label: { en: "All Projects", ar: "جميع المشاريع" } },
    { key: "web", label: { en: "Web Apps", ar: "تطبيقات الويب" } },
    { key: "mobile", label: { en: "Mobile Apps", ar: "تطبيقات الجوال" } },
    { key: "ai", label: { en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" } },
    { key: "iot", label: { en: "IoT Systems", ar: "أنظمة إنترنت الأشياء" } },
  ]

  // Filter projects based on selected category
  const filteredProjects =
    filter === "all" ? portfolioProjects : portfolioProjects.filter((project) => project.category === filter)

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = Number.parseInt(entry.target.getAttribute("data-project-id") || "0")
            setVisibleProjects((prev) => new Set([...prev, projectId]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    return () => observerRef.current?.disconnect()
  }, [])

  // Observe project cards
  useEffect(() => {
    const projectCards = document.querySelectorAll("[data-project-id]")
    projectCards.forEach((card) => observerRef.current?.observe(card))

    return () => {
      projectCards.forEach((card) => observerRef.current?.unobserve(card))
    }
  }, [filteredProjects])

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10 dark:to-background"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">{t("portfolio.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{t("portfolio.subtitle")}</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                filter === category.key
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-card text-card-foreground border border-border hover:border-orange-300 dark:hover:border-orange-500 hover:bg-muted/50"
              }`}
            >
              {category.label[language]}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border ${
                visibleProjects.has(project.id) ? "animate-slide-up opacity-100" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title[language]}
                  // visible on all screen sizes; responsive height; keep full aspect ratio without cropping
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-48 object-contain bg-card object-center transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 border border-border"
                    title={t("portfolio.viewDemo")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 border border-border"
                      title={t("portfolio.viewCode")}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {project.title[language]}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description[language]}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full border border-orange-200 dark:border-orange-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Demo Link */}
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors duration-300 group/link"
                >
                  {t("portfolio.viewDemo")}
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("portfolio.noProjects")}</p>
          </div>
        )}
      </div>
    </section>
  )
}
