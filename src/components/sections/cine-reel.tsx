import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { Display, Label, Body } from '@/components/ui/typography'
import { useIsTouch, useReducedMotion } from '@/hooks/use-media'
import type { FrameItem } from '@/data/site'

type CineReelProps = {
  frames: FrameItem[]
  title?: string
  kicker?: string
  body?: string
  className?: string
}

export function CineReel({
  frames,
  title = 'Cinematography',
  kicker = 'Brand Film',
  body = 'Frames in sequence. Scroll to run the reel.',
  className,
}: CineReelProps) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = track.current
      const wrap = root.current
      if (!el || !wrap) return
      if (useReducedMotion() || useIsTouch()) {
        el.style.overflowX = 'auto'
        return
      }
      const edge = () =>
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--spacing-edge'),
        ) || 24
      const dist = () => Math.max(0, el.scrollWidth - window.innerWidth + edge() * 2)
      gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (bar.current) bar.current.style.width = `${self.progress * 100}%`
          },
        },
      })
    },
    { scope: root, dependencies: [frames] },
  )

  return (
    <section
      ref={root}
      id="cinematography"
      className={cn('relative overflow-hidden bg-black', className)}
    >
      <div className="flex h-auto flex-col justify-center py-10 lg:h-svh lg:py-0 lg:pt-[calc(var(--header-h)+24px)] lg:pb-10">
        <div className="mb-[clamp(16px,2.6vw,34px)] flex flex-col items-start gap-5 px-(--spacing-edge) lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
          <Display className="max-w-full text-[clamp(1.85rem,8vw,5rem)]">{title}</Display>
          <div className="flex max-w-[min(38ch,100%)] flex-col gap-2.5">
            <Label className="text-accent">{kicker}</Label>
            <Body>{body}</Body>
          </div>
        </div>
        <div
          ref={track}
          className="flex gap-(--spacing-gap) px-(--spacing-edge) will-change-transform max-lg:scroll-x"
        >
          {frames.map((frame) => (
            <figure
              key={frame.src}
              className="relative aspect-video w-[min(78vw,620px)] shrink-0 overflow-hidden bg-neutral-950 sm:w-[clamp(240px,42vw,620px)]"
            >
              <img
                src={asset(frame.src)}
                alt={frame.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
        <div className="relative mx-(--spacing-edge) mt-[26px] h-px bg-white/14">
          <i ref={bar} className="absolute top-0 left-0 block h-full w-0 bg-accent" />
        </div>
      </div>
    </section>
  )
}
