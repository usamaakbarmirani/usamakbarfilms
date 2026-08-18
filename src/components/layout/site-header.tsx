import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/logo'
import { Label } from '@/components/ui/typography'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'

export type NavItem = {
  to: string
  label: string
}

type SiteHeaderProps = {
  items: NavItem[]
  solidOnMount?: boolean
  mediaHero?: string
  logoAlwaysVisible?: boolean
}

export function SiteHeader({
  items,
  solidOnMount = false,
  mediaHero,
  logoAlwaysVisible = false,
}: SiteHeaderProps) {
  const location = useLocation()

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
        'fixed top-0 left-0 z-100 flex h-(--header-h) w-full items-center gap-4 border-b border-transparent pt-[env(safe-area-inset-top,0px)] pr-[max(var(--spacing-edge),env(safe-area-inset-right,0px))] pl-[max(var(--spacing-edge),env(safe-area-inset-left,0px))] transition-[background,border-color] duration-400',
        '[&.is-solid]:border-white/9 [&.is-solid]:bg-black',
      )}
    >
      <Link
        to="/"
        aria-label="Usama Akbar Films — home"
        className={cn(
          'size-8 shrink-0 transition-[opacity,transform] duration-400 sm:size-[34px]',
          logoAlwaysVisible
            ? 'opacity-100'
            : 'site-header__logo opacity-0 -translate-y-1.5 [header.is-solid_&]:translate-y-0 [header.is-solid_&]:opacity-100',
        )}
      >
        <Logo className="size-full" />
      </Link>
      <nav className="ml-auto flex min-w-0 max-w-[calc(100%-2.75rem)] flex-wrap items-center justify-end gap-x-[clamp(10px,2vw,30px)] gap-y-1">
        {items.map((item) =>
          item.to.startsWith('#') ? (
            <a
              key={item.to}
              href={item.to}
              className="opacity-70 transition-opacity hover:text-accent hover:opacity-100"
              onClick={(e) => {
                const t = document.querySelector(item.to)
                if (!t) return
                e.preventDefault()
                const y = t.getBoundingClientRect().top + window.scrollY
                window.uafSmooth?.scrollTo(y) ?? window.scrollTo({ top: y, behavior: 'smooth' })
              }}
            >
              <Label as="span" className="text-[0.58rem] tracking-[0.12em] sm:text-[0.66rem] sm:tracking-[0.2em]">
                {item.label}
              </Label>
            </a>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'opacity-70 transition-opacity hover:text-accent hover:opacity-100',
                  isActive && 'text-accent opacity-100',
                  item.to === '/' && 'flex items-center gap-2',
                )
              }
            >
              <Label as="span" className="text-[0.58rem] tracking-[0.12em] sm:text-[0.66rem] sm:tracking-[0.2em]">
                {item.to === '/' ? '← Home' : item.label}
              </Label>
            </NavLink>
          ),
        )}
      </nav>
    </header>
  )
}
