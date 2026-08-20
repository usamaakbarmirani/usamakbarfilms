import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
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

const ROT = [-11, 8, -6, 12, -9, 5, -4, 10]
const THRESH = 72
const MAX_TRAIL = 6

type TrailShot = {
  id: number
  src: string
  x: number
  y: number
  r: number
}

function themeFor(title: string) {
  if (title === 'Film' || title === 'Stills') return themes[title]
  return themes.Immersive
}

export function Services({ items }: ServicesProps) {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [trail, setTrail] = useState<TrailShot[]>([])
  const last = useRef({ x: 0, y: 0, n: 0 })
  const visual = hover ?? active
  const theme = themeFor(items[visual]?.title ?? 'Immersive')

  const drop = (clientX: number, clientY: number, i: number) => {
    const stills = items[i]?.stills
    if (!stills?.length) return
    const dx = clientX - last.current.x
    const dy = clientY - last.current.y
    if (last.current.n > 0 && Math.hypot(dx, dy) < THRESH) return
    last.current = { x: clientX, y: clientY, n: last.current.n + 1 }
    const shot: TrailShot = {
      id: last.current.n,
      src: stills[(last.current.n - 1) % stills.length],
      x: clientX,
      y: clientY,
      r: ROT[(last.current.n - 1) % ROT.length],
    }
    setTrail((prev) => [...prev.slice(-(MAX_TRAIL - 1)), shot])
  }

  return (
    <section
      id="services"
      className={cn('relative transition-colors duration-500', theme.section)}
    >
      <div className="flex min-h-svh flex-col items-center justify-center px-[max(var(--spacing-edge),env(safe-area-inset-left),env(safe-area-inset-right))] pt-[calc(var(--header-h)+8px)] pb-[max(1.25rem,env(safe-area-inset-bottom))] max-[700px]:min-h-0 max-[700px]:py-[clamp(48px,12vh,96px)]">
          <Label className="absolute top-[calc(var(--header-h)+12px)] left-(--spacing-edge) z-30 opacity-60 max-[480px]:text-[0.55rem]">
            What I do
          </Label>
          <div className="flex w-full flex-col items-center justify-center gap-[clamp(18px,3.6vw,52px)] text-center">
            {items.map((item, i) => (
              <Link
                key={item.title}
                to={item.href}
                onMouseEnter={(e) => {
                  setActive(i)
                  setHover(i)
                  last.current = { x: 0, y: 0, n: 0 }
                  drop(e.clientX, e.clientY, i)
                }}
                onMouseMove={(e) => {
                  if (hover !== i) setHover(i)
                  drop(e.clientX, e.clientY, i)
                }}
                onMouseLeave={() => {
                  setHover(null)
                  setTrail([])
                  last.current.n = 0
                }}
                className={cn(
                  'relative flex min-h-11 w-full max-w-full justify-center p-0 py-1 transition-opacity duration-350',
                  i === visual ? 'z-20 opacity-100' : 'z-0 opacity-[0.34]',
                )}
              >
                <span className="relative block h-[0.9em] max-w-full overflow-hidden font-display text-[clamp(2.15rem,12vw,10.8rem)] leading-[0.9] tracking-[0.005em] uppercase">
                  <span
                    className={cn(
                      'block leading-[0.9] transition-[transform,color] duration-550 ease-[var(--ease-out-expo)]',
                      theme.idle,
                      i === visual ? 'translate-y-full' : '',
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'absolute top-0 left-0 w-full leading-[0.9] transition-[transform,color] duration-550 ease-[var(--ease-out-expo)]',
                      theme.selected,
                      i === visual ? 'translate-y-0' : '-translate-y-full',
                    )}
                  >
                    {item.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
      </div>

      {trail.map((shot, n) => (
        <img
          key={shot.id}
          src={asset(shot.src)}
          alt=""
          className="svc-trail pointer-events-none fixed z-80 max-w-none object-cover shadow-[0_14px_36px_rgba(0,0,0,0.4)]"
          style={{
            left: shot.x,
            top: shot.y,
            width: 'clamp(96px, 12vw, 168px)',
            height: 'clamp(124px, 16vw, 224px)',
            zIndex: 80 + n,
            ['--r' as string]: `${shot.r}deg`,
          }}
        />
      ))}
    </section>
  )
}