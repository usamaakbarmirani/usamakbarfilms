import { Label } from '@/components/ui/typography'
import { Marquee } from '@/components/ui/marquee'

type IntlMarqueeProps = {
  word?: string
  noteLeft?: string
  noteRight?: string
}

export function IntlMarquee({
  word = 'International',
  noteLeft = 'Working across borders',
  noteRight = 'Karachi → San Antonio',
}: IntlMarqueeProps) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-[clamp(40px,6vw,80px)]">
      <Marquee
        duration={26}
        trackClassName="font-display text-[clamp(2rem,7vw,6rem)] leading-none text-transparent uppercase [-webkit-text-stroke:1px_rgba(255,255,255,0.22)]"
      >
        <span>{word}</span>
        <span className="font-normal text-accent [-webkit-text-stroke:0]">•</span>
        <span>{word}</span>
        <span className="font-normal text-accent [-webkit-text-stroke:0]">•</span>
      </Marquee>
      <div className="mt-[clamp(20px,3vw,38px)] flex items-center gap-3 px-(--spacing-edge) opacity-50">
        <Label as="span">{noteLeft}</Label>
        <i className="block h-px flex-1 bg-white/16" />
        <Label as="span">{noteRight}</Label>
      </div>
    </section>
  )
}
