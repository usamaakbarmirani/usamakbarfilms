import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { FilmTitle, FramesLabel } from '@/components/ui/section-head'
import { Player } from '@/components/ui/player'
import { HorizontalReel } from '@/components/ui/reel'
import type { Film } from '@/data/site'

type FilmBlockProps = {
  film: Film
  className?: string
  children?: ReactNode
}

export function FilmBlock({ film, className, children }: FilmBlockProps) {
  return (
    <article
      id={film.id}
      className={cn('relative bg-black [&+&]:border-t [&+&]:border-white/10', className)}
    >
      <FilmTitle name={film.title} tag={film.tag} body={film.body} />
      {film.video ? (
        <Player src={film.video.src} label={film.video.label} loop={film.video.loop} />
      ) : null}
      <FramesLabel />
      <HorizontalReel frames={film.frames} />
      {children}
    </article>
  )
}
