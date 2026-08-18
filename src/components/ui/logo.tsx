import { cn, asset } from '@/lib/cn'
import { media } from '@/data/site'

type LogoProps = {
  className?: string
  alt?: string
}

export function Logo({ className, alt = 'Usama Akbar Films' }: LogoProps) {
  return (
    <span className={cn('logo', className)}>
      <img src={asset(media.logo)} alt={alt} />
    </span>
  )
}
