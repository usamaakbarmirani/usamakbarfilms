import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { Display, Label, Body } from '@/components/ui/typography'
import { SoundToggle } from '@/components/ui/sound-toggle'
import { LocaleChip } from '@/components/ui/chrome'

type PageHeroProps = {
  title: string
  kicker?: string
  body?: string
  media?: { type: 'image' | 'video'; src: string; sound?: boolean; locale?: string }
  children?: ReactNode
  className?: string
}

export function PageHero({
  title,
  kicker,
  body,
  media,
  children,
  className,
}: PageHeroProps) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)

  if (media) {
    return (
      <>
        <section
          className={cn(
            'page-hero--media relative overflow-hidden bg-black',
            media.type === 'video' && 'flex min-h-svh items-center justify-center',
            className,
          )}
        >
          {media.type === 'video' ? (
            <video
              ref={setVideo}
              className="absolute inset-0 z-1 h-full w-full object-contain"
              src={asset(media.src)}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img
              className="relative z-1 block h-auto w-full max-w-none object-contain object-center"
              src={asset(media.src)}
              alt=""
            />
          )}
          <div className="absolute inset-0 z-2 bg-linear-to-b from-black/72 via-black/25 to-black/88" />
          <div className="absolute inset-0 z-3 flex items-center justify-center px-[max(var(--spacing-edge),env(safe-area-inset-left),env(safe-area-inset-right))] pt-[var(--header-h)] text-center">
            <Display className="m-0 w-full max-w-full text-center text-[clamp(1.85rem,11vw,13rem)]">
              {title}
            </Display>
            {children}
          </div>
        </section>
        {media.sound || media.locale ? (
          <div className="flex flex-wrap items-center justify-between gap-4 px-(--spacing-edge) pt-[clamp(18px,3vw,34px)]">
            {media.locale ? (
              <LocaleChip>
                <Label as="span">{media.locale}</Label>
              </LocaleChip>
            ) : (
              <span />
            )}
            {media.sound ? <SoundToggle video={video} /> : null}
          </div>
        ) : null}
      </>
    )
  }

  return (
    <section
      className={cn(
        'flex min-h-[58vh] items-end border-b border-white/9 px-(--spacing-edge) pt-[calc(var(--header-h)+clamp(50px,10vw,120px))] pb-[clamp(30px,5vw,60px)]',
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-[clamp(16px,4vw,60px)] lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
        <Display data-rise="" className="max-w-full text-[clamp(2.4rem,12vw,11rem)]">
          {title}
        </Display>
        <div className="flex max-w-[40ch] flex-col gap-3">
          {kicker ? <Label className="text-accent">{kicker}</Label> : null}
          {body ? <Body>{body}</Body> : null}
          {children}
        </div>
      </div>
    </section>
  )
}
