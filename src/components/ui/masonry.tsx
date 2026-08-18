import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'

type MasonryFigureProps = {
  src: string
  onOpen?: (src: string, label: string) => void
  label?: string
}

export function MasonryFigure({ src, onOpen, label }: MasonryFigureProps) {
  return (
    <figure
      className="relative m-0 overflow-hidden bg-neutral-950"
      onClick={() => onOpen?.(src, label ?? '')}
    >
      <img
        src={asset(src)}
        alt=""
        loading="lazy"
        className="h-auto w-full cursor-zoom-in"
      />
    </figure>
  )
}

type MasonryProps = {
  images: string[]
  label?: string
  onOpen?: (src: string, label: string) => void
  className?: string
}

export function Masonry({ images, label, onOpen, className }: MasonryProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-start gap-(--spacing-gap) min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3',
        className,
      )}
    >
      {images.map((src) => (
        <MasonryFigure key={src} src={src} onOpen={onOpen} label={label} />
      ))}
    </div>
  )
}
