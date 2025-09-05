"use client"

import { useEffect, useRef } from "react"

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = 15 + Math.random() * 10 + "s"
      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 25000)
    }

    const interval = setInterval(createParticle, 300)

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={containerRef} className="floating-particles" />
}
