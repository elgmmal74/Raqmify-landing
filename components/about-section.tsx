"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

const stats = [
  {
    icon: Users,
    numberKey: "about.stats.clients",
    labelKey: "about.stats.clientsLabel",
  },
  {
    icon: Award,
    numberKey: "about.stats.projects",
    labelKey: "about.stats.projectsLabel",
  },
  {
    icon: TrendingUp,
    numberKey: "about.stats.growth",
    labelKey: "about.stats.growthLabel",
  },
  {
    icon: Target,
    numberKey: "about.stats.success",
    labelKey: "about.stats.successLabel",
  },
]

export function AboutSection() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 text-balance ${language === "ar" ? "rtl:text-right" : ""}`}
          >
            {t("about.title")}
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto text-pretty ${
              language === "ar" ? "rtl:text-right" : ""
            }`}
          >
            {t("about.description")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 mb-16">
          {/* Content container - below on mobile, right side on desktop */}
          <div className="flex-1">
            <div className={`space-y-6 ${language === "ar" ? "rtl:text-right" : "text-center lg:text-left"}`}>
              <h3 className="text-2xl font-semibold mb-4">{t("about.mission.title")}</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">{t("about.mission.description")}</p>
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex-shrink-0"></div>
                  <p className="text-muted-foreground">{t("about.values.innovation")}</p>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex-shrink-0"></div>
                  <p className="text-muted-foreground">{t("about.values.quality")}</p>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex-shrink-0"></div>
                  <p className="text-muted-foreground">{t("about.values.partnership")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className={`text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-2">{t(stat.numberKey)}</div>
                  <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
