import { PageHero } from '@/components/sections/page-hero'
import { FilmBlock } from '@/components/sections/film-block'
import { immersiveFilms, media } from '@/data/site'

export function CinematographyPage() {
  return (
    <>
      <PageHero title="Immersive" media={{ type: 'image', src: media.photoHero }} />
      {immersiveFilms.map((film) => (
        <FilmBlock key={film.id} film={film} />
      ))}
    </>
  )
}
