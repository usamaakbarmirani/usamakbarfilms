import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RuleProps = {
  className?: string
}

export function Rule({ className }: RuleProps) {
  return <div className={cn('h-px bg-white/12', className)} />
}

type EasterEggProps = {
  className?: string
}

export function EasterEgg({ className }: EasterEggProps) {
  return (
    <span
      className={cn(
        'mt-[clamp(26px,5vw,52px)] w-full select-none text-center font-sans text-[0.46rem] font-extralight tracking-[0.26em] text-white/14 lowercase transition-colors duration-700 hover:text-red-500/50',
        className,
      )}
    >
      created by “@syedhassaanaly”
    </span>
  )
}

type LocaleChipProps = {
  children: ReactNode
  className?: string
}

export function LocaleChip({ children, className }: LocaleChipProps) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <i
        aria-hidden
        className="block size-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,0,0,0.18)]"
      />
      {children}
    </span>
  )
}

type StatusChipProps = {
  children: ReactNode
  className?: string
}

export function StatusChip({ children, className }: StatusChipProps) {
  return (
    <span
      className={cn(
        'mt-4 inline-block border border-accent px-3.5 py-1.5 text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ScrollCue({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-1/2 z-5 h-11 w-px -translate-x-1/2 bg-linear-to-b from-transparent to-white/55 [@media(max-height:500px)]:hidden',
        className,
      )}
    >
      <i className="absolute -left-0.5 bottom-0 block size-[5px] rounded-full bg-accent" />
    </span>
  )
}
