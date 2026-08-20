import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'

type MasonryFigureProps = {
  src: string
  onOpen?: (src: string, label: string) => void
  label?: string
  className?: string
}

export function MasonryFigure({ src, onOpen, label, className }: MasonryFigureProps) {
  return (
    <figure
      className={cn(
        'relative mb-(--spacing-gap) block w-full break-inside-avoid overflow-hidden bg-neutral-950',
        className,
      )}
      onClick={() => onOpen?.(src, label ?? '')}
    >
      <img
        src={asset(src)}
        alt=""
        loading="lazy"
        className="block h-auto w-full max-w-full cursor-zoom-in object-contain object-top"
      />
    </figure>
  )
}

type MasonryProps = {
  images: string[]
  label?: string
  onOpen?: (src: string, label: string) => void
  className?: string
  lanes?: { left: string[]; center: string[]; right: string[] }
}

export function Masonry({ images, label, onOpen, className, lanes }: MasonryProps) {
  if (lanes) {
    const cols = [
      { key: 'left', items: lanes.left, className: '' },
      {
        key: 'center',
        items: lanes.center,
        className: 'order-last col-span-1 min-[480px]:col-span-2 min-[1100px]:order-none min-[1100px]:col-span-1',
      },
      { key: 'right', items: lanes.right, className: '' },
    ]
    return (
      <div
        className={cn(
          'grid grid-cols-1 gap-(--spacing-gap) min-[480px]:grid-cols-2 min-[1100px]:grid-cols-3',
          className,
        )}
      >
        {cols.map((col) => (
          <div key={col.key} className={col.className}>
            {col.items.map((src) => (
              <MasonryFigure key={src} src={src} onOpen={onOpen} label={label} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full columns-2 [column-fill:balance] [column-gap:var(--spacing-gap)] min-[1100px]:columns-3',
        className,
      )}
    >
      {images.map((src) => (
        <MasonryFigure key={src} src={src} onOpen={onOpen} label={label} />
      ))}
    </div>
  )
}
