import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TextProps = {
  as?: ElementType
  className?: string
  children?: ReactNode
} & HTMLAttributes<HTMLElement>

export function Display({ as: Tag = 'h2', className, children, ...rest }: TextProps) {
  return (
    <Tag
      className={cn(
        'm-0 max-w-full font-display font-normal uppercase leading-[0.88] tracking-[0.005em]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Label({ as: Tag = 'p', className, children, ...rest }: TextProps) {
  return (
    <Tag
      className={cn(
        'm-0 font-sans text-[0.66rem] font-normal uppercase tracking-[0.2em]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Body({ as: Tag = 'p', className, children, ...rest }: TextProps) {
  return (
    <Tag
      className={cn(
        'm-0 max-w-full font-sans text-[clamp(0.78rem,2.8vw,0.82rem)] font-extralight leading-[1.8] tracking-[0.02em] break-words sm:leading-[1.95]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
