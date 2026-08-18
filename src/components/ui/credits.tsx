import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { Label } from '@/components/ui/typography'
import { useReducedMotion } from '@/hooks/use-media'
import type { Credit } from '@/data/site'

type CreditsProps = {
  items: Credit[]
  className?: string
}

export function Credits({ items, className }: CreditsProps) {
  const group = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (useReducedMotion() || !group.current) return
      gsap.from(group.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: group.current, start: 'top 85%' },
      })
    },
    { scope: group, dependencies: [items] },
  )

  return (
    <div
      className={cn(
        'border-t border-white/10 px-(--spacing-edge) py-[clamp(26px,4vw,54px)]',
        className,
      )}
    >
      <div
        ref={group}
        className="grid grid-cols-1 gap-[clamp(16px,2.4vw,38px)] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
      >
        {items.map((item) => (
          <div key={item.role}>
            <Label className="mb-1.5 opacity-45">{item.role}</Label>
            <p
              className={cn(
                'font-display text-[clamp(1rem,1.9vw,1.5rem)] leading-[1.1] tracking-[0.005em] uppercase',
                item.accent && 'text-accent',
              )}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
