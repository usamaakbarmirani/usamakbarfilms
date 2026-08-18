import { Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { SiteHeader, type NavItem } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

const homeNav: NavItem[] = [
  { to: '#about', label: 'About' },
  { to: '/film', label: 'Film' },
  { to: '/immersive', label: 'Immersive' },
  { to: '/stills', label: 'Stills' },
]

const innerNav: NavItem[] = [
  { to: '/film', label: 'Film' },
  { to: '/immersive', label: 'Immersive' },
  { to: '/stills', label: 'Stills' },
  { to: '/', label: 'Home' },
]

export function PageShell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  useSmoothScroll()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [pathname])

  return (
    <>
      <SiteHeader
        items={isHome ? homeNav : innerNav}
        logoAlwaysVisible={!isHome}
        mediaHero={
          pathname === '/film' || pathname === '/immersive' || pathname === '/stills'
            ? '.page-hero--media'
            : undefined
        }
      />
      <main id="top">
        <Outlet />
      </main>
      <SiteFooter egg={isHome} />
    </>
  )
}
