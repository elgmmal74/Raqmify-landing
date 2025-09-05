"use client"

import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t, language } = useLanguage()

  const footerSections = [
    {
      titleKey: "footer.company",
      links: [
        { key: "footer.about", href: "#" },
        { key: "footer.careers", href: "#" },
        { key: "footer.contact", href: "#" },
      ],
    },
    {
      titleKey: "footer.support",
      links: [
        { key: "footer.help", href: "#" },
        { key: "footer.docs", href: "#" },
      ],
    },
    {
      titleKey: "footer.legal",
      links: [
        { key: "footer.privacy", href: "#" },
        { key: "footer.terms", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-card-foreground">Raqmify</span>
            </div>
            <p className={`text-muted-foreground text-sm text-pretty ${language === "ar" ? "rtl:text-right" : ""}`}>
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className={`font-semibold mb-4 text-card-foreground ${language === "ar" ? "rtl:text-right" : ""}`}>
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      className={`text-muted-foreground hover:text-card-foreground transition-colors text-sm ${
                        language === "ar" ? "rtl:text-right" : ""
                      }`}
                    >
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`border-t border-border mt-8 pt-8 text-center ${language === "ar" ? "rtl:text-right" : ""}`}>
          <p className="text-muted-foreground text-sm">© 2024 Raqmify. {t("footer.rights")}.</p>
        </div>
      </div>
    </footer>
  )
}
