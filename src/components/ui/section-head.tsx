import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { Display, Body, Label } from '@/components/ui/typography'
import { useReducedMotion } from '@/hooks/use-media'

type SectionHeadProps = {
  title: string
  kicker?: string
  body?: string
  side?: ReactNode
  className?: string
}

export function SectionHead({ title, kicker, body, side, className }: SectionHeadProps) {
  useGSAP(() => {
    if (useReducedMotion()) return
    gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((h) => {
      gsap.from(h, {
        yPercent: 35,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: h, start: 'top 88%' },
      })
    })
  }, { dependencies: [title] })

  return (
    <div
      className={cn(
        'mb-[clamp(22px,3.4vw,44px)] flex flex-col items-start gap-[clamp(12px,3vw,28px)] px-(--spacing-edge) lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-[clamp(16px,4vw,60px)]',
        className,
      )}
    >
      <Display data-rise="" className="max-w-full text-[clamp(1.85rem,8vw,5.2rem)]">
        {title}
      </Display>
      <div className="flex max-w-[min(38ch,100%)] flex-col gap-2.5">
        {kicker ? <Label className="text-accent">{kicker}</Label> : null}
        {body ? <Body>{body}</Body> : null}
        {side}
      </div>
    </div>
  )
}

type FilmTitleProps = {
  no: number
  name: string
  tag: string
  body: string
}

export function FilmTitle({ no, name, tag, body }: FilmTitleProps) {
  return (
    <header className="flex flex-col items-start gap-[clamp(14px,3vw,28px)] px-(--spacing-edge) pt-[clamp(50px,8vw,110px)] pb-[clamp(18px,2.6vw,34px)] lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-[clamp(16px,4vw,60px)]">
      <div className="min-w-0 max-w-full">
        <Label className="mb-2.5 block text-accent">
          Film {String(no).padStart(2, '0')}
        </Label>
        <Display data-rise="" className="max-w-full text-[clamp(2rem,11vw,8.5rem)]">
          {name}
        </Display>
      </div>
      <div className="flex max-w-[min(36ch,100%)] flex-col gap-2.5">
        <Label className="self-start border border-white/25 px-3 py-1.5">{tag}</Label>
        {body ? <Body>{body}</Body> : null}
      </div>
    </header>
  )
}

type FramesLabelProps = {
  count: number
}

export function FramesLabel({ count }: FramesLabelProps) {
  return (
    <div className="flex items-center gap-3 px-(--spacing-edge) pt-[clamp(26px,4vw,54px)] opacity-50">
      <Label as="span">Frame Grabs</Label>
      <i className="block h-px flex-1 bg-white/16" />
      <Label as="span">{String(count).padStart(2, '0')}</Label>
    </div>
  )
}

type SubheadProps = {
  title: string
  count: number
}

export function Subhead({ title, count }: SubheadProps) {
  return (
    <div className="my-[clamp(14px,1.8vw,22px)] mt-[clamp(26px,3.4vw,44px)] flex items-center gap-3">
      <b className="font-display text-[clamp(1rem,2.2vw,1.7rem)] font-normal tracking-[0.005em] uppercase">
        {title}
      </b>
      <i className="block h-px flex-1 bg-white/14" />
      <Label as="span" className="opacity-40">
        {String(count).padStart(2, '0')}
      </Label>
    </div>
  )
}
