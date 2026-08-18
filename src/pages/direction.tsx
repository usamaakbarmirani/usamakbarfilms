import { PageHero } from '@/components/sections/page-hero'
import { FilmBlock } from '@/components/sections/film-block'
import { films, media } from '@/data/site'

export function DirectionPage() {
  return (
    <>
      <PageHero title="Film" media={{ type: 'image', src: media.filmHero }} />
      {films.map((film) => (
        <FilmBlock key={film.id} film={film} />
      ))}
    </>
  )
}
