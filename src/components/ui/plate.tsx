import { cn, asset } from '@/lib/cn'
import type { PlateItem, PlateSpan } from '@/data/site'

const spanClass: Record<PlateSpan, string> = {
  4: 'col-span-3 aspect-[3/4] md:col-span-4',
  5: 'col-span-3 aspect-[4/5] md:col-span-5',
  6: 'col-span-6 aspect-[3/2]',
  7: 'col-span-6 aspect-[16/10] md:col-span-7',
  8: 'col-span-6 aspect-video md:col-span-8',
  12: 'col-span-6 aspect-[21/9] md:col-span-12',
}

type PlateProps = PlateItem & {
  className?: string
}

export function Plate({ src, alt, span, className }: PlateProps) {
  return (
    <figure
      className={cn(
        'relative m-0 overflow-hidden bg-neutral-950',
        spanClass[span],
        className,
      )}
    >
      <img
        src={asset(src)}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </figure>
  )
}

type PlateGridProps = {
  items: PlateItem[]
  className?: string
}

export function PlateGrid({ items, className }: PlateGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-6 gap-(--spacing-gap) md:grid-cols-12',
        className,
      )}
    >
      {items.map((item) => (
        <Plate key={item.src} {...item} />
      ))}
    </div>
  )
}
