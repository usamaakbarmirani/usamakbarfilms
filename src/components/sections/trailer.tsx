import { useRef, useState } from 'react'
import { asset } from '@/lib/cn'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { Display, Label, Body } from '@/components/ui/typography'
import { SoundToggle } from '@/components/ui/sound-toggle'
import { StatusChip } from '@/components/ui/chrome'
import { useReducedMotion } from '@/hooks/use-media'
import { playWithSound } from '@/lib/play-with-sound'

type TrailerProps = {
  src: string
  kicker?: string
  title: string
  body: string
  status?: string
}

export function Trailer({
  src,
  kicker = 'Official Trailer',
  title,
  body,
  status = 'Releasing Soon',
}: TrailerProps) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [bg, setBg] = useState<HTMLVideoElement | null>(null)
  const feature = useRef<HTMLDivElement>(null)
  const meta = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const play = () => {
        playWithSound(video)
        const bgPlay = bg?.play()
        if (bgPlay && bgPlay.catch) bgPlay.catch(() => {})
      }
      const pause = () => {
        video?.pause()
        bg?.pause()
      }
      ScrollTrigger.create({
        trigger: '#trailer',
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: play,
        onEnterBack: play,
        onLeave: pause,
        onLeaveBack: pause,
      })
      if (useReducedMotion()) return
      if (feature.current) {
        gsap.fromTo(
          feature.current,
          { xPercent: -50, yPercent: -50, scale: 1.08, autoAlpha: 0 },
          {
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: '#trailer',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
      if (meta.current) {
        gsap.fromTo(
          meta.current.children,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '#trailer',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    },
    { dependencies: [video, bg, src] },
  )

  return (
    <section id="trailer" className="relative h-svh w-full overflow-hidden bg-black">
      <video
        ref={setBg}
        src={asset(src)}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 z-1 h-full w-full scale-[1.08] object-cover blur-[16px] saturate-80"
      />
      <div className="absolute inset-0 z-2 bg-black/68" />
      <div
        ref={feature}
        className="media-stage media-stage--trailer absolute top-[46%] left-1/2 z-[4] -translate-x-1/2 -translate-y-1/2 max-[860px]:top-[42%]"
      >
        <div className="relative h-0 overflow-hidden bg-black pb-[56.25%]">
          <video
            ref={setVideo}
            src={asset(src)}
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[46%] bg-linear-to-t from-black via-black/80 to-transparent"
      />
      <div
        ref={meta}
        className="absolute bottom-[max(1.1rem,env(safe-area-inset-bottom))] left-[max(var(--spacing-edge),env(safe-area-inset-left))] z-[6] max-w-[min(36ch,calc(100%-5.25rem))] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.9)] min-[860px]:max-w-[min(36ch,calc(100%-9.5rem))]"
        style={{ color: '#ffffff' }}
      >
        <Label className="mb-2 text-white/90 max-[860px]:mb-1.5">{kicker}</Label>
        <Display className="mb-2 text-[clamp(1.35rem,4.2vw,3.2rem)] text-white max-[860px]:mb-1.5">
          {title.split('\n').map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </Display>
        <Body className="text-[0.75rem] leading-[1.6] text-white/90 max-[860px]:text-[0.7rem]">{body}</Body>
        <StatusChip className="mt-3 border-accent bg-black/55 text-accent max-[860px]:mt-2">
          <Label as="span" className="text-accent">
            {status}
          </Label>
        </StatusChip>
      </div>
      <div className="absolute right-[max(var(--spacing-edge),env(safe-area-inset-right))] bottom-[max(1.1rem,env(safe-area-inset-bottom))] z-[7]">
        <SoundToggle video={video} />
      </div>
    </section>
  )
}
