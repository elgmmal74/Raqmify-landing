"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export function ContactSection() {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-muted/30 section-divider">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 text-balance ${language === "ar" ? "rtl:text-right" : ""}`}
          >
            {t("contact.title")}
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty ${
              language === "ar" ? "rtl:text-right" : ""
            }`}
          >
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className={`text-2xl ${language === "ar" ? "rtl:text-right" : ""}`}>
                {t("contact.form.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.name")}</label>
                    <Input
                      placeholder={t("contact.form.namePlaceholder")}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                    <Input
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("contact.form.subject")}</label>
                  <Input
                    placeholder={t("contact.form.subjectPlaceholder")}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                  <Textarea
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={5}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full orange-gradient orange-gradient-hover text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t("contact.form.sent")}
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("contact.form.send")}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 orange-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("contact.info.email")}</h3>
                    <p className="text-muted-foreground">hello@raqmify.com</p>
                    <p className="text-muted-foreground">support@raqmify.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 orange-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("contact.info.phone")}</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">+1 (555) 987-6543</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 orange-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("contact.info.address")}</h3>
                    <p className="text-muted-foreground">123 Innovation Street</p>
                    <p className="text-muted-foreground">Tech City, TC 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 orange-gradient">
              <CardContent className="p-6 text-white">
                <h3 className="font-semibold text-lg mb-4">{t("contact.cta.title")}</h3>
                <p className="mb-4 opacity-90">{t("contact.cta.description")}</p>
                <Button variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  {t("contact.cta.button")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
