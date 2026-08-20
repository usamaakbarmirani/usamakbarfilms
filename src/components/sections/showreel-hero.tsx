import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { ScrollCue } from '@/components/ui/chrome'
import { SoundToggle } from '@/components/ui/sound-toggle'
import { Label } from '@/components/ui/typography'
import { useReducedMotion } from '@/hooks/use-media'
import { playWithSound } from '@/lib/play-with-sound'

type ShowreelHeroProps = {
  src: string
  className?: string
}

export function ShowreelHero({ src, className }: ShowreelHeroProps) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [feature, setFeature] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!video || !canvas) return
    const cx = canvas.getContext('2d', { alpha: false })
    if (!cx) return
    let painting = false
    let raf = 0
    const paint = () => {
      if (video.readyState >= 2 && !video.paused) {
        try {
          cx.drawImage(video, 0, 0, canvas.width, canvas.height)
        } catch {
          /* empty */
        }
      }
      raf = requestAnimationFrame(paint)
    }
    const start = () => {
      if (!painting) {
        painting = true
        paint()
      }
    }
    video.addEventListener('loadeddata', start)
    if (video.readyState >= 2) start()
    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadeddata', start)
    }
  }, [src, video, canvas])

  useGSAP(
    () => {
      if (!video) return
      const play = () => playWithSound(video)
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: play,
        onEnterBack: play,
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      })
    },
    { dependencies: [video, src] },
  )

  useGSAP(
    () => {
      if (useReducedMotion() || !feature) return
      gsap.fromTo(
        feature,
        { xPercent: -50, yPercent: -50, scale: 1 },
        {
          xPercent: -50,
          yPercent: -40,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { dependencies: [src, feature] },
  )

  return (
    <section
      id="hero"
      aria-label="Showreel"
      className={cn(
        'relative h-svh w-full overflow-hidden bg-black',
        className,
      )}
    >
      <canvas
        ref={setCanvas}
        width={128}
        height={72}
        aria-hidden
        className="absolute inset-0 z-1 h-full w-full scale-105 object-cover blur-[12px]"
      />
      <div className="absolute inset-0 z-2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.7)_100%)]" />
      <div
        ref={setFeature}
        className="media-stage media-stage--reel absolute top-1/2 left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="relative h-0 overflow-hidden bg-black pb-[43.75%]">
            <video
              ref={setVideo}
              src={asset(src)}
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div className="reel-frame pointer-events-none absolute inset-0 z-2" aria-hidden>
            <span className="reel-frame__corner reel-frame__corner--tl" />
            <span className="reel-frame__corner reel-frame__corner--tr" />
            <span className="reel-frame__corner reel-frame__corner--bl" />
            <span className="reel-frame__corner reel-frame__corner--br" />
            <span className="reel-frame__rec">
              <i />
              <Label as="span" className="text-[0.55rem] tracking-[0.22em] text-white/80">
                Rec
              </Label>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-[max(var(--spacing-edge),env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom),clamp(20px,4vh,60px))] z-[6]">
        <SoundToggle video={video} />
      </div>
      <ScrollCue />
    </section>
  )
}
