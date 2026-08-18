import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { Label } from '@/components/ui/typography'
import type { ServiceItem } from '@/data/site'

type ServicesProps = {
  items: ServiceItem[]
}

const themes = {
  Film: {
    section: 'bg-black text-white',
    selected: 'text-accent',
    idle: 'text-white',
  },
  Immersive: {
    section: 'bg-accent text-white',
    selected: 'text-black',
    idle: 'text-white',
  },
  Stills: {
    section: 'bg-white text-black',
    selected: 'text-accent',
    idle: 'text-black',
  },
} as const

function themeFor(title: string) {
  if (title === 'Film' || title === 'Stills') return themes[title]
  return themes.Immersive
}

export function Services({ items }: ServicesProps) {
  const [active, setActive] = useState(0)
  const desc = useRef<HTMLParagraphElement>(null)
  const last = useRef(-1)
  const theme = themeFor(items[active]?.title ?? 'Immersive')

  const apply = (i: number) => {
    if (i === last.current) return
    last.current = i
    setActive(i)
    if (!desc.current || !items[i]) return
    gsap.killTweensOf(desc.current)
    desc.current.textContent = items[i].description
    gsap.fromTo(
      desc.current,
      { opacity: 0, y: 8 },
      { opacity: 0.8, y: 0, duration: 0.35, ease: 'power2.out' },
    )
  }

  useGSAP(() => {
    apply(0)
    ScrollTrigger.create({
      trigger: '.svc__pin-height',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        apply(Math.min(items.length - 1, Math.floor(self.progress * items.length)))
      },
    })
  }, { dependencies: [items] })

  return (
    <section
      id="services"
      className={cn('relative transition-colors duration-500', theme.section)}
    >
      <div className="svc__pin-height h-[300vh]">
        <div className="sticky top-0 flex h-svh flex-col items-center justify-center px-(--spacing-edge) pt-[calc(var(--header-h)+8px)] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Label className="absolute top-[calc(var(--header-h)+12px)] left-(--spacing-edge) opacity-60 max-[480px]:text-[0.55rem]">
            What I do
          </Label>
          <Label className="absolute top-[calc(var(--header-h)+12px)] right-(--spacing-edge) opacity-60 max-[480px]:text-[0.55rem]">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </Label>
          <div className="flex w-full max-w-[1400px] flex-col gap-[clamp(4px,0.6vw,12px)]">
            {items.map((item, i) => (
              <Link
                key={item.title}
                to={item.href}
                onMouseEnter={() => apply(i)}
                className={cn(
                  'flex min-w-0 items-baseline gap-[clamp(12px,2vw,32px)] p-0 transition-opacity duration-350',
                  i === active ? 'opacity-100' : 'opacity-[0.38]',
                )}
              >
                <Label as="span" className="hidden shrink-0 text-[0.6rem] opacity-70 sm:inline">
                  {String(i + 1).padStart(2, '0')}
                </Label>
                <span className="relative block h-[0.96em] min-w-0 overflow-hidden font-display text-[clamp(1.85rem,11vw,7.4rem)] leading-[0.96] tracking-[0.005em] whitespace-nowrap uppercase">
                  <span
                    className={cn(
                      'block leading-[0.96] transition-[transform,color] duration-550 ease-[var(--ease-out-expo)]',
                      theme.idle,
                      i === active ? 'translate-y-full' : '',
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'absolute top-0 left-0 leading-[0.96] transition-[transform,color] duration-550 ease-[var(--ease-out-expo)]',
                      theme.selected,
                      i === active ? 'translate-y-0' : '-translate-y-full',
                    )}
                  >
                    {item.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p
            ref={desc}
            className="t-body mt-[clamp(18px,3vw,38px)] max-w-[min(52ch,100%)] px-1 text-center font-sans text-[clamp(0.72rem,2.6vw,0.82rem)] font-extralight leading-[1.8] tracking-[0.02em] opacity-80"
          >
            {items[0]?.description}
          </p>
        </div>
      </div>
    </section>
  )
}
