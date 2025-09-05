"use client"

import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm"
      aria-label="Switch language"
    >
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium">
        <span
          className={`transition-all duration-300 z-10 ${
            language === "ar" ? "text-white font-bold" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          ع
        </span>
        <span
          className={`transition-all duration-300 z-10 ${
            language === "en" ? "text-white font-bold" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          EN
        </span>
      </div>

      <div
        className={`absolute top-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-md transition-all duration-300 ease-in-out ${
          language === "ar" ? "translate-x-1" : "translate-x-8"
        }`}
      />
    </button>
  )
}
