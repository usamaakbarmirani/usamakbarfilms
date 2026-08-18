import { cn } from '@/lib/cn'

type WedgeProps = {
  variant?: 'top' | 'bottom'
  className?: string
}

export function Wedge({ variant = 'top', className }: WedgeProps) {
  return (
    <div
      className={cn(
        'group-wedge',
        variant === 'top' ? 'group-wedge--top' : 'group-wedge--bottom',
        className,
      )}
      aria-hidden
    />
  )
}
