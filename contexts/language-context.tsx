"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio", // Added portfolio navigation translation
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",

    // Hero Section
    "hero.title": "Transform Data into",
    "hero.titleHighlight": "Digital Evolution",
    "hero.subtitle":
      "Precision-driven digital transformation solutions that accelerate your business growth through innovative technology and data-driven insights.",
    "hero.cta": "Start Your Transformation",
    "hero.learnMore": "Learn More",

    // About Section
    "about.title": "About Raqmify",
    "about.description":
      "We are a forward-thinking digital transformation company dedicated to helping businesses evolve through precision-driven technology solutions. Our expertise spans across modern web development, AI integration, and data-driven insights that propel your business into the digital future.",
    "about.mission.title": "Our Mission",
    "about.mission.description":
      "To empower businesses with cutting-edge digital solutions that transform data into actionable insights, driving sustainable growth and competitive advantage in the digital landscape.",
    "about.values.innovation": "Innovation-first approach to every project and challenge",
    "about.values.quality": "Quality assurance with rigorous testing and optimization",
    "about.values.partnership": "Long-term partnerships built on trust and results",
    "about.stats.clients": "500+",
    "about.stats.clientsLabel": "Happy Clients",
    "about.stats.projects": "1000+",
    "about.stats.projectsLabel": "Projects Completed",
    "about.stats.growth": "150%",
    "about.stats.growthLabel": "Average Growth",
    "about.stats.success": "98%",
    "about.stats.successLabel": "Success Rate",

    // Services
    "services.title": "What We Do",
    "services.subtitle": "Comprehensive services to meet all your development needs",
    "services.webDev": "Web Development",
    "services.webDevDesc":
      "Modern, responsive websites built with cutting-edge technologies and optimized for performance.",
    "services.mobileDev": "Mobile App Development",
    "services.mobileDevDesc":
      "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    "services.uxui": "UX/UI Design",
    "services.uxuiDesc": "User-centered design solutions that combine aesthetics with functionality and usability.",
    "services.aiSolutions": "AI Solutions",
    "services.aiSolutionsDesc":
      "Intelligent automation and machine learning solutions that transform your business processes and decision-making capabilities.",
    "services.ecommerce": "E-commerce Solutions",
    "services.ecommerceDesc":
      "Complete online store solutions with secure payment processing and inventory management.",
    "services.api": "API Integration",
    "services.apiDesc":
      "Seamless integration of third-party services and custom API development for your applications.",
    "services.cloud": "Cloud Services",
    "services.cloudDesc": "Scalable cloud infrastructure and deployment solutions for modern applications.",

    // Portfolio Section
    "portfolio.title": "Our Portfolio",
    "portfolio.subtitle":
      "Explore our latest projects and see how we've helped businesses transform their digital presence with innovative solutions.",
    "portfolio.viewDemo": "View Demo",
    "portfolio.viewCode": "View Code",
    "portfolio.noProjects": "No projects found for the selected category.",

    "contact.title": "Contact With Us",
    "contact.subtitle": "Ready to transform your business? Get in touch with our team of experts.",
    "contact.form.title": "Send us a Message",
    "contact.form.name": "Full Name",
    "contact.form.namePlaceholder": "Enter your full name",
    "contact.form.email": "Email Address",
    "contact.form.emailPlaceholder": "Enter your email",
    "contact.form.subject": "Subject",
    "contact.form.subjectPlaceholder": "What's this about?",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us about your project...",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.sent": "Message Sent!",
    "contact.info.email": "Email Us",
    "contact.info.phone": "Call Us",
    "contact.info.address": "Visit Us",
    "contact.cta.title": "Ready to Get Started?",
    "contact.cta.description": "Let's discuss your project and see how we can help you achieve your goals.",
    "contact.cta.button": "Schedule a Call",

    // Footer
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.contact": "Contact",
    "footer.support": "Support",
    "footer.help": "Help Center",
    "footer.docs": "Documentation",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.portfolio": "أعمالنا", // Added portfolio navigation translation in Arabic
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.getStarted": "ابدأ الآن",

    // Hero Section
    "hero.title": "حول البيانات إلى",
    "hero.titleHighlight": "تطور رقمي",
    "hero.subtitle":
      "حلول التحول الرقمي المدفوعة بالدقة التي تسرع نمو أعمالك من خلال التكنولوجيا المبتكرة والرؤى المدفوعة بالبيانات.",
    "hero.cta": "ابدأ تحولك",
    "hero.learnMore": "اعرف المزيد",

    // About Section
    "about.title": "عن رقمفاي",
    "about.description":
      "نحن شركة تحول رقمي تفكر في المستقبل مكرسة لمساعدة الشركات على التطور من خلال حلول تقنية مدفوعة بالدقة. خبرتنا تمتد عبر تطوير الويب الحديث وتكامل الذكاء الاصطناعي والرؤى المدفوعة بالبيانات التي تدفع عملك إلى المستقبل الرقمي.",
    "about.mission.title": "مهمتنا",
    "about.mission.description":
      "تمكين الشركات بحلول رقمية متطورة تحول البيانات إلى رؤى قابلة للتنفيذ، مما يدفع النمو المستدام والميزة التنافسية في المشهد الرقمي.",
    "about.values.innovation": "نهج يركز على الابتكار في كل مشروع وتحدي",
    "about.values.quality": "ضمان الجودة مع الاختبار الصارم والتحسين",
    "about.values.partnership": "شراكات طويلة الأمد مبنية على الثقة والنتائج",
    "about.stats.clients": "+500",
    "about.stats.clientsLabel": "عميل سعيد",
    "about.stats.projects": "+1000",
    "about.stats.projectsLabel": "مشروع مكتمل",
    "about.stats.growth": "%150",
    "about.stats.growthLabel": "متوسط النمو",
    "about.stats.success": "%98",
    "about.stats.successLabel": "معدل النجاح",

    // Services
    "services.title": "ما نقوم به",
    "services.subtitle": "خدمات شاملة لتلبية جميع احتياجات التطوير الخاصة بك",
    "services.webDev": "تطوير المواقع",
    "services.webDevDesc": "مواقع ويب حديثة ومتجاوبة مبنية بأحدث التقنيات ومحسنة للأداء.",
    "services.mobileDev": "تطوير تطبيقات الجوال",
    "services.mobileDevDesc": "تطبيقات جوال أصلية ومتعددة المنصات تقدم تجارب مستخدم استثنائية.",
    "services.uxui": "تصميم تجربة المستخدم",
    "services.uxuiDesc": "حلول تصميم تتمحور حول المستخدم تجمع بين الجماليات والوظائف وسهولة الاستخدام.",
    "services.aiSolutions": "حلول الذكاء الاصطناعي",
    "services.aiSolutionsDesc": "حلول الأتمتة الذكية والتعلم الآلي التي تحول عمليات عملك وقدرات اتخاذ القرار.",
    "services.ecommerce": "حلول التجارة الإلكترونية",
    "services.ecommerceDesc": "حلول متاجر إلكترونية كاملة مع معالجة دفع آمنة وإدارة المخزون.",
    "services.api": "تكامل واجهات البرمجة",
    "services.apiDesc": "تكامل سلس للخدمات الخارجية وتطوير واجهات برمجة مخصصة لتطبيقاتك.",
    "services.cloud": "الخدمات السحابية",
    "services.cloudDesc": "بنية تحتية سحابية قابلة للتوسع وحلول نشر للتطبيقات الحديثة.",

    // Portfolio Section
    "portfolio.title": "أعمالنا",
    "portfolio.subtitle": "استكشف أحدث مشاريعنا وشاهد كيف ساعدنا الشركات في تحويل حضورها الرقمي بحلول مبتكرة.",
    "portfolio.viewDemo": "عرض التجربة",
    "portfolio.viewCode": "عرض الكود",
    "portfolio.noProjects": "لم يتم العثور على مشاريع للفئة المحددة.",

    "contact.title": "تواصل معنا",
    "contact.subtitle": "مستعد لتحويل عملك؟ تواصل مع فريق الخبراء لدينا.",
    "contact.form.title": "أرسل لنا رسالة",
    "contact.form.name": "الاسم الكامل",
    "contact.form.namePlaceholder": "أدخل اسمك الكامل",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.emailPlaceholder": "أدخل بريدك الإلكتروني",
    "contact.form.subject": "الموضوع",
    "contact.form.subjectPlaceholder": "ما هو موضوع رسالتك؟",
    "contact.form.message": "الرسالة",
    "contact.form.messagePlaceholder": "أخبرنا عن مشروعك...",
    "contact.form.send": "إرسال الرسالة",
    "contact.form.sending": "جاري الإرسال...",
    "contact.form.sent": "تم إرسال الرسالة!",
    "contact.info.email": "راسلنا",
    "contact.info.phone": "اتصل بنا",
    "contact.info.address": "زرنا",
    "contact.cta.title": "مستعد للبدء؟",
    "contact.cta.description": "دعنا نناقش مشروعك ونرى كيف يمكننا مساعدتك في تحقيق أهدافك.",
    "contact.cta.button": "حدد موعد مكالمة",

    // Footer
    "footer.company": "الشركة",
    "footer.about": "من نحن",
    "footer.careers": "الوظائف",
    "footer.contact": "اتصل بنا",
    "footer.support": "الدعم",
    "footer.help": "مركز المساعدة",
    "footer.docs": "التوثيق",
    "footer.legal": "قانوني",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.rights": "جميع الحقوق محفوظة",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr")
    document.documentElement.setAttribute("lang", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
