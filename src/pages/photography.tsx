import { useState } from 'react'
import { PageHero } from '@/components/sections/page-hero'
import { CategoryRail } from '@/components/ui/category-rail'
import { Masonry } from '@/components/ui/masonry'
import { Lightbox } from '@/components/ui/lightbox'
import { Display, Label, Body } from '@/components/ui/typography'
import { media, photoSets } from '@/data/site'

export function PhotographyPage() {
  const [open, setOpen] = useState<{ src: string; label: string } | null>(null)
  const total = photoSets.reduce((n, s) => n + s.images.length, 0)

  return (
    <>
      <PageHero title="Stills" media={{ type: 'image', src: media.stillsHero }} />
      <CategoryRail
        items={photoSets.map((set) => ({ href: `#${set.id}`, label: set.title }))}
        trailing={`${total} Images`}
      />
      {photoSets.map((set) => (
        <section
          key={set.id}
          id={set.id}
          className="px-(--spacing-edge) pt-[clamp(50px,8vw,110px)] last-of-type:pb-[clamp(50px,8vw,110px)]"
        >
          <div className="mb-[clamp(20px,3vw,40px)] flex flex-col items-start gap-[clamp(12px,3vw,28px)] lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-[clamp(16px,4vw,60px)]">
            <div className="min-w-0 max-w-full">
              <Label className="mb-2 block text-accent">{set.no}</Label>
              <Display data-rise="" className="max-w-full text-[clamp(1.85rem,8vw,5.4rem)]">
                {set.title}
              </Display>
            </div>
            <div className="flex max-w-[min(34ch,100%)] flex-col gap-2">
              <Label className="opacity-50">{set.countLabel}</Label>
              <Body>{set.body}</Body>
            </div>
          </div>
          <Masonry
            images={set.images}
            label={set.title}
            onOpen={(src, label) => setOpen({ src, label })}
          />
        </section>
      ))}
      <Lightbox
        src={open?.src ?? null}
        label={open?.label}
        onClose={() => setOpen(null)}
      />
    </>
  )
}
