import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { useIsTouch, useReducedMotion } from '@/hooks/use-media'
import type { FrameItem } from '@/data/site'

type ReelFrameProps = FrameItem

export function ReelFrame({ src, alt }: ReelFrameProps) {
  return (
    <figure className="relative aspect-video w-[min(86vw,1000px)] shrink-0 snap-start overflow-hidden bg-neutral-950 sm:w-[clamp(260px,66vw,1000px)]">
      <img
        src={asset(src)}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </figure>
  )
}

type HorizontalReelProps = {
  frames: FrameItem[]
  pin?: boolean
  className?: string
}

export function HorizontalReel({
  frames,
  pin = true,
  className,
}: HorizontalReelProps) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = track.current
      const wrap = root.current
      if (!el || !wrap) return
      if (useReducedMotion() || useIsTouch() || !pin) {
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
          end: () => `+=${dist() * 0.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (bar.current) bar.current.style.width = `${self.progress * 100}%`
          },
        },
      })
    },
    { scope: root, dependencies: [frames, pin] },
  )

  return (
    <section
      ref={root}
      className={cn('relative overflow-hidden bg-black', className)}
    >
      <div className="flex h-auto flex-col justify-center py-10 max-[860px]:py-8 lg:h-svh lg:py-0 lg:pt-[calc(var(--header-h)+20px)] lg:pb-[30px]">
        <div
          ref={track}
          className="flex gap-(--spacing-gap) px-(--spacing-edge) will-change-transform max-[860px]:scroll-x max-[860px]:snap-x max-[860px]:snap-mandatory"
        >
          {frames.map((frame) => (
            <ReelFrame key={frame.src} {...frame} />
          ))}
        </div>
        <div className="relative mx-(--spacing-edge) mt-[22px] h-px bg-white/14">
          <i
            ref={bar}
            className="absolute top-0 left-0 block h-full w-0 bg-accent"
          />
        </div>
      </div>
    </section>
  )
}
