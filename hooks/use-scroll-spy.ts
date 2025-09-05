import { useEffect, useState } from "react"

type Options = {
  root?: Element | null
  rootMargin?: string
  threshold?: number
  // vertical offset to treat header height so the observed section is considered in view earlier
  offset?: number
}

/**
 * useScrollSpy
 * tracks which section (by selector/href like `#about`) is currently in view.
 * Returns the active href (e.g. "#about") or null.
 */
export default function useScrollSpy(hrefs: string[], options: Options = {}) {
  const { root = null, rootMargin = "0px 0px -40% 0px", threshold = 0.1, offset = 0 } = options
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!hrefs || hrefs.length === 0) return

    const idToElem = new Map<string, Element>()
    const observed: Element[] = []

    hrefs.forEach((href) => {
      try {
        const selector = href.startsWith("#") ? href : `#${href}`
        const el = document.querySelector(selector)
        if (el) {
          idToElem.set(href, el)
          observed.push(el)
        }
      } catch (e) {
        // ignore invalid selectors
      }
    })

    if (observed.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // choose the entry with largest intersectionRatio > 0 or the one that isIntersecting
        let best: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (!best) best = entry
          else if (entry.isIntersecting && !best.isIntersecting) best = entry
          else if (entry.isIntersecting && best.isIntersecting && entry.intersectionRatio > best.intersectionRatio) best = entry
          else if (!entry.isIntersecting && !best.isIntersecting && entry.intersectionRatio > best.intersectionRatio) best = entry
        }

        if (best) {
          // find corresponding href
          for (const [href, el] of idToElem.entries()) {
            if (el === best.target) {
              setActive(href)
              return
            }
          }
        }
      },
      { root, rootMargin, threshold },
    )

    observed.forEach((el) => observer.observe(el))

    return () => {
      observed.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [hrefs.join("|")])

  return active
}
