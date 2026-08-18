import { ShowreelHero } from '@/components/sections/showreel-hero'
import { Manifesto } from '@/components/sections/manifesto'
import { SpotlightAbout } from '@/components/sections/spotlight-about'
import { Services } from '@/components/sections/services'
import { Trailer } from '@/components/sections/trailer'
import { Wedge } from '@/components/ui/wedge'
import {
  aboutCopy,
  aboutMoreCopy,
  manifestoStills,
  media,
  services,
} from '@/data/site'

export function HomePage() {
  return (
    <>
      <ShowreelHero src={media.showreel} />
      <Manifesto stills={manifestoStills} />
      <Trailer
        src={media.trailer}
        title={'The Upcoming\nShort Film'}
        body="Created by Usama Akbar."
      />
      <SpotlightAbout paragraphs={aboutCopy} moreParagraphs={aboutMoreCopy} />
      <Wedge variant="top" />
      <Services items={services} />
      <Wedge variant="bottom" />
    </>
  )
}
