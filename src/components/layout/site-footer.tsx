import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '@/lib/cn'
import { Label } from '@/components/ui/typography'
import { contact, media } from '@/data/site'

type SiteFooterProps = {
  egg?: boolean
}

export function SiteFooter({ egg = false }: SiteFooterProps) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = video.current
    if (!el) return
    el.muted = true
    const play = el.play()
    if (play && play.catch) play.catch(() => {})
  }, [])

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <video
        ref={video}
        src={asset(media.footer)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-1 bg-black/62" />
      <div className="relative z-2 flex min-h-[min(88svh,820px)] flex-col justify-end px-[max(var(--spacing-edge),env(safe-area-inset-left),env(safe-area-inset-right))] pt-[clamp(72px,10vh,128px)] pb-[max(clamp(28px,4vw,48px),env(safe-area-inset-bottom))]">
        <div className="flex flex-col items-start justify-between gap-x-16 gap-y-10 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-0 max-w-full">
            <Label className="mb-5 opacity-55">Contact</Label>
            <a
              href={`tel:${contact.phone}`}
              className="block w-fit max-w-full font-sans text-[clamp(0.95rem,2.2vw,1.55rem)] leading-[1.3] font-normal tracking-[0.02em] transition-colors hover:text-accent"
            >
              {contact.phoneLabel}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 block w-fit max-w-full break-all font-sans text-[clamp(0.88rem,2.2vw,1.55rem)] leading-[1.3] font-normal tracking-[0.02em] transition-colors hover:text-accent sm:break-normal"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex flex-col items-start gap-3 min-[800px]:items-end">
            <Label className="opacity-55">Social</Label>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[clamp(1.05rem,2.2vw,1.55rem)] leading-[1.3] font-normal tracking-[0.02em] transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[clamp(1.05rem,2.2vw,1.55rem)] leading-[1.3] font-normal tracking-[0.02em] transition-colors hover:text-accent"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5">
          <Label className="opacity-50">© 2026 Usama Akbar Films</Label>
          {egg ? (
            <Label className="opacity-50">Karachi, Pakistan</Label>
          ) : (
            <Link
              to="/"
              className="opacity-50 transition-colors hover:text-accent hover:opacity-100"
            >
              <Label as="span">Back to home</Label>
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
