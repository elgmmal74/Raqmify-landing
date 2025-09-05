"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, X } from "lucide-react"
// GSAP removed: using CSS transitions + JS measurements instead
import useScrollSpy from "@/hooks/use-scroll-spy"

export function Header() {
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reorder nav so About appears after Home
  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.services", href: "#services" },
    { key: "nav.portfolio", href: "#portfolio" },
    { key: "nav.contact", href: "#contact" },
  ]

  const headerRef = useRef<HTMLElement | null>(null)
  const navLinksRef = useRef<Array<HTMLButtonElement | null>>([])
  const underlineRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  const hrefs = navItems.map((i) => i.href)
  const activeHref = useScrollSpy(hrefs)

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 80 // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  // Header animations removed; keep header static for simpler, accessible behavior.

  // Move underline to active link
  useEffect(() => {
    if (!underlineRef.current || !navRef.current) return
    const underline = underlineRef.current
    const activeIndex = navItems.findIndex((n) => n.href === activeHref)
    if (activeIndex === -1) {
      // hide by setting width 0
      navRef.current.style.setProperty('--underline-w', `0px`)
      return
    }

    const target = navLinksRef.current[activeIndex]
    if (!target) return

    const rect = target.getBoundingClientRect()
    const parentRect = navRef.current.getBoundingClientRect()
    const x = parentRect ? rect.left - parentRect.left : rect.left
    const width = rect.width

    // set CSS variables on the nav container; CSS transitions handle smooth movement
    navRef.current.style.setProperty('--underline-x', `${x}px`)
    navRef.current.style.setProperty('--underline-w', `${width}px`)
  }, [activeHref, navItems])

  // reflect active state on per-link buttons (.active) for CSS underline
  useEffect(() => {
    navLinksRef.current.forEach((btn) => {
      if (!btn) return
      const href = navItems[navLinksRef.current.indexOf(btn)]?.href
      if (!href) return
      if (href === activeHref) btn.classList.add('active')
      else btn.classList.remove('active')
    })
  }, [activeHref, navItems])

  // Recalculate on resize and when mobile menu toggles (so underline stays correct)
  useEffect(() => {
    const recal = () => {
      if (!navRef.current) return
      const activeIndex = navItems.findIndex((n) => n.href === activeHref)
      if (activeIndex === -1) {
        navRef.current.style.setProperty('--underline-w', `0px`)
        return
      }
      const target = navLinksRef.current[activeIndex]
      if (!target) return
      const rect = target.getBoundingClientRect()
      const parentRect = navRef.current.getBoundingClientRect()
      const x = parentRect ? rect.left - parentRect.left : rect.left
      const width = rect.width
      navRef.current.style.setProperty('--underline-x', `${x}px`)
      navRef.current.style.setProperty('--underline-w', `${width}px`)
    }

    window.addEventListener('resize', recal)
    return () => window.removeEventListener('resize', recal)
  }, [activeHref, navItems])

  return (
    <header
      ref={headerRef}
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label={t("nav.label") || "Main navigation"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled ? 'h-14' : 'h-16'}`}>
          <div className="flex items-center gap-2">
            <div className={`orange-gradient rounded-lg flex items-center justify-center shadow-sm transition-all duration-500 ease-in-out ${isScrolled ? 'w-7 h-7' : 'w-8 h-8'}`}>
              <span className="text-white font-bold transition-all duration-500 ease-in-out text-sm">R</span>
            </div>
            <span className={`font-bold text-foreground transition-all duration-500 ease-in-out ${isScrolled ? 'text-lg' : 'text-xl'}`}>Raqmify</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative" role="menubar" aria-label={t("nav.label") || "Main"}>
            {navItems.map((item, idx) => (
              <button
                key={item.key}
                ref={(el) => { navLinksRef.current[idx] = el }}
                onClick={() => handleNavClick(item.href)}
                className={`nav-link text-muted-foreground hover:text-foreground transition-colors hover:text-primary ${activeHref === item.href ? 'text-foreground' : ''}`}
                role="menuitem"
                aria-current={activeHref === item.href ? 'page' : undefined}
              >
                {t(item.key)}
              </button>
            ))}
            {/* Animated underline */}
            <div ref={underlineRef} className="nav-underline" aria-hidden />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 min-w-fit">
            <div className="flex-shrink-0 h-8 flex items-center">
              <LanguageSwitcher />
            </div>
            <div className="flex-shrink-0 h-8 flex items-center">
              <ThemeToggle />
            </div>
            <Button
              className="orange-gradient orange-gradient-hover text-white border-0 shadow-sm flex-shrink-0 ml-2 min-w-fit"
              onClick={() => handleNavClick('#contact')}
            >
              {t("nav.getStarted")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3 min-w-fit">
            <div className="flex-shrink-0 h-8 flex items-center">
              <LanguageSwitcher />
            </div>
            <div className="flex-shrink-0 h-8 flex items-center">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex-shrink-0 ml-1 min-w-fit"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-nav animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col gap-4 p-4">
              {navItems.map((item, idx) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link text-muted-foreground hover:text-foreground transition-colors text-left ${activeHref === item.href ? 'text-foreground' : ''}`}
                  role="menuitem"
                  aria-current={activeHref === item.href ? 'page' : undefined}
                >
                  {t(item.key)}
                </button>
              ))}
              <Button className="mt-4 orange-gradient orange-gradient-hover text-white border-0" onClick={() => handleNavClick('#contact')}>
                {t("nav.getStarted")}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
