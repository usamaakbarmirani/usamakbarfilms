import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { useIsTouch, useReducedMotion } from '@/hooks/use-media'

export type SmoothScroll = {
  scrollTo: (y: number) => void
}

export function scrollToTop() {
  window.uafSmooth?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function useSmoothScroll() {
  useEffect(() => {
    if (useReducedMotion() || useIsTouch()) return

    const LERP = 0.1
    let target = window.scrollY
    let current = target
    let running = false

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const tick = () => {
      current += (target - current) * LERP
      if (Math.abs(target - current) < 0.15) {
        current = target
        running = false
      }
      window.scrollTo(0, current)
      ScrollTrigger.update()
      if (running) requestAnimationFrame(tick)
    }

    const kick = () => {
      if (!running) {
        running = true
        requestAnimationFrame(tick)
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return
      if (document.documentElement.dataset.lightbox === 'open') return
      e.preventDefault()
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY))
      kick()
    }

    const onScroll = () => {
      if (!running) target = current = window.scrollY
    }

    const onResize = () => {
      target = current = window.scrollY
      ScrollTrigger.refresh()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.uafSmooth = {
      scrollTo(y: number) {
        target = Math.max(0, Math.min(maxScroll(), y))
        kick()
      },
    }

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      delete window.uafSmooth
    }
  }, [])
}

declare global {
  interface Window {
    uafSmooth?: SmoothScroll
  }
}
