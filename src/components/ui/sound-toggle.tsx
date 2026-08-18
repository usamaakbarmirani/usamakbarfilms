import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Label } from '@/components/ui/typography'

type SoundToggleProps = {
  video: HTMLVideoElement | null
  className?: string
}

export function SoundToggle({ video, className }: SoundToggleProps) {
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!video) return
    const sync = () => setMuted(video.muted)
    sync()
    video.addEventListener('volumechange', sync)
    return () => video.removeEventListener('volumechange', sync)
  }, [video])

  return (
    <button
      type="button"
      className={cn(
        'flex cursor-pointer items-center gap-2 border-0 bg-transparent font-inherit text-inherit opacity-75 transition-opacity hover:opacity-100 sm:gap-2.5',
        className,
      )}
      onClick={() => {
        if (!video) return
        video.muted = !video.muted
        setMuted(video.muted)
        if (!video.muted) void video.play()
      }}
    >
      <i
        aria-hidden
        className="grid size-6 place-items-center rounded-full border border-accent text-[0.5rem] not-italic text-accent sm:size-[30px] sm:text-[0.55rem]"
      >
        ▶
      </i>
      <Label as="span" className="text-[0.55rem] tracking-[0.14em] sm:text-[0.66rem] sm:tracking-[0.2em]">
        {muted ? 'Sound off' : 'Sound on'}
      </Label>
    </button>
  )
}
