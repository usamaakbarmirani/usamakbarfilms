import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn, asset } from '@/lib/cn'
import { Label } from '@/components/ui/typography'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { scrollToTop } from '@/hooks/use-smooth-scroll'
import { media } from '@/data/site'

export type NavItem = {
  to: string
  label: string
}

type SiteHeaderProps = {
  items: NavItem[]
  solidOnMount?: boolean
  mediaHero?: string
  logoAlwaysVisible?: boolean
  split?: number
}

function NavItems({ items }: { items: NavItem[] }) {
  return (
    <>
      {items.map((item) =>
        item.to.startsWith('#') ? (
          <a
            key={item.to}
            href={item.to}
            className="inline-flex min-h-11 shrink-0 items-center opacity-70 transition-opacity hover:text-accent hover:opacity-100"
            onClick={(e) => {
              const t = document.querySelector(item.to)
              if (!t) return
              e.preventDefault()
              const header = document.getElementById('siteHeader')
              const offset = header?.getBoundingClientRect().height ?? 0
              const y = t.getBoundingClientRect().top + window.scrollY - offset
              window.uafSmooth?.scrollTo(y) ?? window.scrollTo({ top: y, behavior: 'smooth' })
            }}
          >
            <Label as="span" className="text-[0.62rem] tracking-[0.1em] min-[700px]:text-[0.75rem] min-[700px]:tracking-[0.12em] min-[860px]:text-[0.86rem] min-[860px]:tracking-[0.2em]">
              {item.label}
            </Label>
          </a>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'inline-flex min-h-11 shrink-0 items-center opacity-70 transition-opacity hover:text-accent hover:opacity-100',
                isActive && 'text-accent opacity-100',
              )
            }
          >
            <Label as="span" className="text-[0.62rem] tracking-[0.1em] min-[700px]:text-[0.75rem] min-[700px]:tracking-[0.12em] min-[860px]:text-[0.86rem] min-[860px]:tracking-[0.2em]">
              {item.to === '/' ? '← Home' : item.label}
            </Label>
          </NavLink>
        ),
      )}
    </>
  )
}

export function SiteHeader({
  items,
  solidOnMount = false,
  mediaHero,
  split: splitAt,
}: SiteHeaderProps) {
  const location = useLocation()
  const split = splitAt ?? Math.ceil(items.length / 2)

  useGSAP(
    () => {
      const header = document.getElementById('siteHeader')
      if (!header) return
      if (solidOnMount) {
        header.classList.add('is-solid')
        return
      }
      const trigger = mediaHero
        ? document.querySelector(mediaHero)
        : document.getElementById('hero')
      if (!trigger) {
        header.classList.add('is-solid')
        return
      }
      header.classList.remove('is-solid')
      ScrollTrigger.create({
        trigger,
        start: 'bottom 90px',
        onEnter: () => header.classList.add('is-solid'),
        onLeaveBack: () => header.classList.remove('is-solid'),
      })
    },
    { dependencies: [location.pathname, solidOnMount, mediaHero] },
  )

  return (
    <header
      id="siteHeader"
      className={cn(
        'fixed top-0 left-0 z-100 grid h-(--header-h) w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 overflow-visible border-0 bg-transparent pr-[max(var(--spacing-edge),env(safe-area-inset-right,0px))] pl-[max(var(--spacing-edge),env(safe-area-inset-left,0px))] max-[699px]:flex max-[699px]:flex-col max-[699px]:justify-start max-[699px]:gap-1 max-[699px]:pb-2',
      )}
    >
      <nav className="hidden min-w-0 flex-wrap items-center justify-start gap-x-[clamp(8px,1.8vw,28px)] gap-y-1 self-center min-[700px]:flex">
        <NavItems items={items.slice(0, split)} />
      </nav>
      <Link
        to="/"
        aria-label="Usama Akbar Films — home"
        className="header-brand shrink-0 max-[699px]:order-1"
        onClick={(e) => {
          if (location.pathname !== '/') return
          e.preventDefault()
          scrollToTop()
        }}
      >
        <img
          src={asset(media.golo)}
          alt=""
          width={891}
          height={233}
          className="header-brand__golo"
        />
        <img
          src={asset(media.logo)}
          alt=""
          width={68}
          height={68}
          className="header-brand__ua"
        />
      </Link>
      <nav className="hidden min-w-0 flex-wrap items-center justify-end gap-x-[clamp(8px,1.8vw,28px)] gap-y-1 self-center min-[700px]:flex">
        <NavItems items={items.slice(split)} />
      </nav>
      <nav className="header-nav-mobile relative z-20 flex w-full min-w-0 scroll-x items-center justify-center gap-x-[clamp(12px,4vw,22px)] min-[700px]:hidden max-[699px]:order-2">
        <NavItems items={items} />
      </nav>
    </header>
  )
}
