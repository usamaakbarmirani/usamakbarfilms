import { cn } from '@/lib/cn'
import { Label } from '@/components/ui/typography'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useLocation } from 'react-router-dom'

type RailItem = { href: string; label: string }

type CategoryRailProps = {
  items: RailItem[]
  trailing?: string
  className?: string
}

export function CategoryRail({ items, trailing, className }: CategoryRailProps) {
  const location = useLocation()

  useGSAP(
    () => {
      items.forEach((item) => {
        if (!item.href.startsWith('#')) return
        const sec = document.querySelector(item.href)
        const link = document.querySelector(`[data-rail="${item.href}"]`)
        if (!sec || !link) return
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle(self) {
            if (self.isActive) {
              document
                .querySelectorAll('[data-rail]')
                .forEach((el) => el.classList.remove('is-current'))
              link.classList.add('is-current')
            }
          },
        })
      })
    },
    { dependencies: [items, location.pathname] },
  )

  return (
    <nav
      className={cn(
        'sticky top-(--header-h) z-60 border-b border-white/9 bg-black/86 backdrop-blur-[10px]',
        className,
      )}
    >
      <div className="scroll-x flex items-center gap-[clamp(12px,2.4vw,34px)] px-(--spacing-edge) py-3.5">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-rail={item.href}
            className="shrink-0 opacity-55 transition-opacity hover:text-accent hover:opacity-100 [&.is-current]:text-accent [&.is-current]:opacity-100"
            onClick={(e) => {
              const t = document.querySelector(item.href)
              if (!t) return
              e.preventDefault()
              const y = t.getBoundingClientRect().top + window.scrollY
              window.uafSmooth?.scrollTo(y) ?? window.scrollTo({ top: y, behavior: 'smooth' })
            }}
          >
            <Label as="span">{item.label}</Label>
          </a>
        ))}
        {trailing ? (
          <Label className="ml-auto shrink-0 opacity-35">{trailing}</Label>
        ) : null}
      </div>
    </nav>
  )
}
