import { cn } from '@/lib/cn'
import { Label } from '@/components/ui/typography'

type LedgerRow = {
  key: string
  value: string
  sub?: string
  accent?: boolean
}

type LedgerProps = {
  rows: LedgerRow[]
  className?: string
}

export function Ledger({ rows, className }: LedgerProps) {
  return (
    <div className={cn('px-(--spacing-edge) py-[clamp(50px,8vw,120px)]', className)}>
      <div className="flex flex-col">
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-1 items-baseline gap-2 border-t border-white/11 py-[clamp(18px,2.4vw,32px)] last:border-b md:grid-cols-[minmax(120px,1fr)_minmax(0,2.4fr)] md:gap-[clamp(14px,3vw,50px)]"
          >
            <Label className="opacity-45">{row.key}</Label>
            <p className="m-0 font-display text-[clamp(1.4rem,4.2vw,3.2rem)] leading-[1.02] tracking-[0.005em] uppercase">
              <span className={row.accent ? 'text-accent' : undefined}>{row.value}</span>
              {row.sub ? (
                <span className="mt-2.5 block font-sans text-[0.78rem] font-extralight tracking-[0.02em] text-white/55 normal-case leading-[1.7]">
                  {row.sub}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
