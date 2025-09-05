"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Palette, ShoppingCart, Zap, Cloud, Brain } from "lucide-react"

const services = [
  {
    icon: Code,
    titleKey: "services.webDev",
    descKey: "services.webDevDesc",
  },
  {
    icon: Smartphone,
    titleKey: "services.mobileDev",
    descKey: "services.mobileDevDesc",
  },
  {
    icon: Palette,
    titleKey: "services.uxui",
    descKey: "services.uxuiDesc",
  },
  {
    icon: Brain,
    titleKey: "services.aiSolutions",
    descKey: "services.aiSolutionsDesc",
  },
  {
    icon: ShoppingCart,
    titleKey: "services.ecommerce",
    descKey: "services.ecommerceDesc",
  },
  {
    icon: Zap,
    titleKey: "services.api",
    descKey: "services.apiDesc",
  },
  {
    icon: Cloud,
    titleKey: "services.cloud",
    descKey: "services.cloudDesc",
  },
]

export function ServicesSection() {
  const { t, language } = useLanguage()
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 text-balance ${language === "ar" ? "rtl:text-right" : ""}`}
          >
            {t("services.title")}
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty ${
              language === "ar" ? "rtl:text-right" : ""
            }`}
          >
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleCards.includes(index)
            return (
              <Card
                key={index}
                data-index={index}
                className={`group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400/10 to-orange-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-orange-400/20 group-hover:to-orange-600/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <CardTitle
                    className={`group-hover:text-orange-600 transition-colors ${language === "ar" ? "rtl:text-right" : ""}`}
                  >
                    {t(service.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={`text-pretty group-hover:text-foreground/80 transition-colors ${language === "ar" ? "rtl:text-right" : ""}`}
                  >
                    {t(service.descKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
