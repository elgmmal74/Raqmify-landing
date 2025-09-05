"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { FloatingParticles } from "@/components/floating-particles"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10"
    >
      <FloatingParticles />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 text-foreground ${
              language === "ar" ? "rtl:text-right" : ""
            }`}
          >
            {t("hero.title")}{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200 ${
              language === "ar" ? "rtl:text-right" : ""
            }`}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-400 ${
              language === "ar" ? "rtl:flex-row-reverse" : ""
            }`}
          >
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-background/80 hover:bg-muted/50 border-2 border-border hover:border-orange-500/50 transition-all duration-300"
            >
              <Play className="h-4 w-4" />
              {t("hero.learnMore")}
            </Button>
          </div>
          {/* wave text removed */}
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-orange-600/20 dark:from-orange-400/10 dark:to-orange-600/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-orange-700/10 dark:from-orange-500/5 dark:to-orange-700/5 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-400/5 to-orange-600/5 dark:from-orange-400/3 dark:to-orange-600/3 rounded-full blur-3xl" />
    </section>
  )
}
