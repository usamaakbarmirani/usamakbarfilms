import { useEffect } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { Label } from '@/components/ui/typography'

type LightboxProps = {
  src: string | null
  label?: string
  onClose: () => void
}

export function Lightbox({ src, label, onClose }: LightboxProps) {
  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [src, onClose])

  if (!src) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className={cn(
        'fixed inset-0 z-200 flex cursor-zoom-out items-center justify-center bg-black/94 p-[max(16px,env(safe-area-inset-top),env(safe-area-inset-bottom),clamp(16px,5vw,70px))] px-[max(16px,env(safe-area-inset-left),env(safe-area-inset-right),clamp(16px,5vw,70px))]',
      )}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-[max(14px,env(safe-area-inset-top))] right-[max(16px,env(safe-area-inset-right))] z-2 cursor-pointer border-0 bg-transparent font-sans text-[0.66rem] tracking-[0.2em] text-white uppercase opacity-70 hover:text-accent hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        Close ×
      </button>
      <img
        src={asset(src)}
        alt=""
        className="max-h-full max-w-full object-contain"
      />
      {label ? (
        <Label className="absolute bottom-[max(14px,env(safe-area-inset-bottom))] left-[max(16px,env(safe-area-inset-left))] max-w-[calc(100%-2rem)] opacity-55">{label}</Label>
      ) : null}
    </div>
  )
}
