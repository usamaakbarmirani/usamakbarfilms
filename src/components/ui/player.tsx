import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { Label } from '@/components/ui/typography'
import { SoundToggle } from '@/components/ui/sound-toggle'
import { useReducedMotion } from '@/hooks/use-media'
import { playWithSound } from '@/lib/play-with-sound'

type PlayerProps = {
  src: string
  label?: string
  loop?: boolean
  className?: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function Player({ src, label = 'Trailer', loop = true, className }: PlayerProps) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [frame, setFrame] = useState<HTMLDivElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!video) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onTime = () => setCurrent(video.currentTime)
    const onMeta = () => setDuration(video.duration || 0)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('durationchange', onMeta)
    if (video.readyState >= 1) onMeta()
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('durationchange', onMeta)
    }
  }, [video, src])

  useGSAP(
    () => {
      if (!video) return
      const play = () => playWithSound(video)
      ScrollTrigger.create({
        trigger: video,
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
      if (useReducedMotion() || !frame) return
      gsap.fromTo(
        frame,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05,
          ease: 'expo.out',
          scrollTrigger: { trigger: frame, start: 'top 90%' },
        },
      )
    },
    { dependencies: [frame, src] },
  )

  const toggle = () => {
    if (!video) return
    if (video.paused) playWithSound(video)
    else video.pause()
  }

  const seekTo = (time: number) => {
    if (!video || !Number.isFinite(time)) return
    const next = Math.min(Math.max(time, 0), duration || video.duration || 0)
    video.currentTime = next
    setCurrent(next)
  }

  return (
    <div className={cn('relative bg-black px-(--spacing-edge) py-[clamp(20px,5vw,70px)]', className)}>
      <div
        ref={setFrame}
        className="relative mx-auto aspect-video w-full max-w-[1500px] overflow-hidden bg-black"
      >
        <video
          ref={setVideo}
          src={asset(src)}
          loop={loop}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full cursor-pointer object-cover"
          onClick={toggle}
        />
      </div>
      <div className="mx-auto mt-3.5 flex max-w-[1500px] flex-col gap-3">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.05}
          value={current}
          aria-label="Seek"
          className="h-8 w-full cursor-pointer appearance-none bg-transparent accent-[#ff0000] [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:bg-white/18 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:top-[-5px] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          onChange={(e) => seekTo(Number(e.target.value))}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              className="min-h-11 cursor-pointer border-0 bg-transparent px-1 font-sans text-[0.66rem] tracking-[0.2em] text-white uppercase opacity-80 hover:text-accent hover:opacity-100"
              onClick={toggle}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              className="min-h-11 cursor-pointer border-0 bg-transparent px-1 font-sans text-[0.66rem] tracking-[0.2em] text-white uppercase opacity-80 hover:text-accent hover:opacity-100"
              onClick={() => seekTo(current - 10)}
            >
              −10s
            </button>
            <button
              type="button"
              className="min-h-11 cursor-pointer border-0 bg-transparent px-1 font-sans text-[0.66rem] tracking-[0.2em] text-white uppercase opacity-80 hover:text-accent hover:opacity-100"
              onClick={() => seekTo(current + 10)}
            >
              +10s
            </button>
            <Label as="span" className="opacity-50">
              {formatTime(current)} / {formatTime(duration)}
            </Label>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-5">
            <Label className="opacity-50">{label}</Label>
            <SoundToggle video={video} />
          </div>
        </div>
      </div>
    </div>
  )
}
