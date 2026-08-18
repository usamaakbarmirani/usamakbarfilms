import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-media'

type MarqueeProps = {
  children: ReactNode
  duration?: number
  className?: string
  trackClassName?: string
}

export function Marquee({
  children,
  duration = 24,
  className,
  trackClassName,
}: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (useReducedMotion() || !track.current) return
      gsap.to(track.current, {
        xPercent: -50,
        duration,
        ease: 'none',
        repeat: -1,
      })
    },
    { dependencies: [duration] },
  )

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        ref={track}
        className={cn(
          'flex w-max gap-10 whitespace-nowrap will-change-transform',
          trackClassName,
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
