import { Display, Label, Body } from '@/components/ui/typography'
import { Rule } from '@/components/ui/chrome'
import { PlateGrid } from '@/components/ui/plate'
import type { PlateItem } from '@/data/site'

type WorkPlatesProps = {
  title: string
  tag: string
  plates: PlateItem[]
}

export function WorkPlates({ title, tag, plates }: WorkPlatesProps) {
  return (
    <article className="mb-[clamp(56px,9vw,140px)] last:mb-0">
      <header className="mb-[clamp(18px,2.6vw,34px)] flex flex-col items-start gap-2 border-b border-white/12 pb-3.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-[clamp(12px,2vw,26px)]">
        <h3 className="m-0 max-w-full font-display text-[clamp(1.6rem,6vw,4.4rem)] leading-none tracking-[0.005em] uppercase">
          {title}
        </h3>
        <Label className="opacity-55 sm:ml-auto">{tag}</Label>
      </header>
      <PlateGrid items={plates} />
    </article>
  )
}

type FilmArchiveIntroProps = {
  title: string
  kicker: string
  body: string
}

export function FilmArchiveIntro({ title, kicker, body }: FilmArchiveIntroProps) {
  return (
    <>
      <div className="mb-[clamp(28px,4vw,56px)] flex flex-col items-start gap-[clamp(12px,3vw,28px)] lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-[clamp(16px,4vw,60px)]">
        <Display className="max-w-full text-[clamp(2rem,10vw,7.5rem)]">{title}</Display>
        <div className="flex max-w-[min(38ch,100%)] flex-col gap-3">
          <Label className="text-accent">{kicker}</Label>
          <Body>{body}</Body>
        </div>
      </div>
      <Rule className="mb-[clamp(28px,4vw,52px)]" />
    </>
  )
}
