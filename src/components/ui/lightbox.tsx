import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/cn'
import { Label } from '@/components/ui/typography'

const MIN_SCALE = 1
const MAX_SCALE = 5

type LightboxProps = {
  src: string | null
  label?: string
  onClose: () => void
}

function dist(a: Touch, b: Touch) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
}

export function Lightbox({ src, label, onClose }: LightboxProps) {
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const zoom = useRef({ scale: 1, x: 0, y: 0 })
  const grabbing = useRef(false)
  const drag = useRef<{
    pointerId: number
    x: number
    y: number
    ox: number
    oy: number
  } | null>(null)
  const pinch = useRef<{ dist: number; scale: number } | null>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  const apply = () => {
    const el = frame.current
    if (!el) return
    const { scale, x, y } = zoom.current
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    el.style.cursor = scale > MIN_SCALE ? (grabbing.current ? 'grabbing' : 'grab') : 'zoom-in'
  }

  const setScaleAt = (next: number, cx: number, cy: number) => {
    const stageEl = stage.current
    if (!stageEl) return
    const prev = zoom.current.scale
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next))
    if (scale <= MIN_SCALE + 0.001) {
      zoom.current = { scale: 1, x: 0, y: 0 }
      apply()
      return
    }
    const rect = stageEl.getBoundingClientRect()
    const ox = cx - (rect.left + rect.width / 2)
    const oy = cy - (rect.top + rect.height / 2)
    const wx = (ox - zoom.current.x) / prev
    const wy = (oy - zoom.current.y) / prev
    zoom.current.scale = scale
    zoom.current.x = ox - wx * scale
    zoom.current.y = oy - wy * scale
    apply()
  }

  useEffect(() => {
    if (!src) return
    zoom.current = { scale: 1, x: 0, y: 0 }
    grabbing.current = false
    apply()
    document.documentElement.dataset.lightbox = 'open'
    document.body.style.overflow = 'hidden'

    const stageEl = stage.current
    if (!stageEl) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1)
      const intensity = e.ctrlKey ? 0.01 : 0.0018
      setScaleAt(zoom.current.scale * Math.exp(-dy * intensity), e.clientX, e.clientY)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        drag.current = null
        pinch.current = {
          dist: dist(e.touches[0], e.touches[1]),
          scale: zoom.current.scale,
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinch.current) {
        e.preventDefault()
        const d = dist(e.touches[0], e.touches[1])
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2
        setScaleAt(pinch.current.scale * (d / pinch.current.dist), midX, midY)
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch.current = null
    }

    document.addEventListener('keydown', onKey)
    stageEl.addEventListener('wheel', onWheel, { passive: false })
    stageEl.addEventListener('touchstart', onTouchStart, { passive: true })
    stageEl.addEventListener('touchmove', onTouchMove, { passive: false })
    stageEl.addEventListener('touchend', onTouchEnd)

    return () => {
      delete document.documentElement.dataset.lightbox
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      stageEl.removeEventListener('wheel', onWheel)
      stageEl.removeEventListener('touchstart', onTouchStart)
      stageEl.removeEventListener('touchmove', onTouchMove)
      stageEl.removeEventListener('touchend', onTouchEnd)
    }
  }, [src])

  if (!src) return null

  return (
    <div
      ref={stage}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className={cn(
        'fixed inset-0 z-200 flex touch-none items-center justify-center overflow-hidden bg-black/94 p-[max(16px,env(safe-area-inset-top),env(safe-area-inset-bottom),clamp(16px,5vw,48px))] px-[max(16px,env(safe-area-inset-left),env(safe-area-inset-right),clamp(16px,5vw,48px))]',
      )}
      onClick={() => closeRef.current()}
    >
      <button
        type="button"
        className="absolute top-[max(10px,env(safe-area-inset-top))] right-[max(10px,env(safe-area-inset-right))] z-2 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border-0 bg-transparent px-3 font-sans text-[0.66rem] tracking-[0.2em] text-white uppercase opacity-70 hover:text-accent hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          closeRef.current()
        }}
      >
        Close ×
      </button>
      <div
        ref={frame}
        className="max-h-[calc(100svh-5.5rem)] max-w-[calc(100vw-2.5rem)] origin-center will-change-transform"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => {
          e.stopPropagation()
          if (zoom.current.scale > 1.05) {
            setScaleAt(1, e.clientX, e.clientY)
          } else {
            setScaleAt(2.4, e.clientX, e.clientY)
          }
        }}
        onPointerDown={(e) => {
          if (e.pointerType === 'touch' && pinch.current) return
          if (zoom.current.scale <= MIN_SCALE) return
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          drag.current = {
            pointerId: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            ox: zoom.current.x,
            oy: zoom.current.y,
          }
          grabbing.current = true
          apply()
        }}
        onPointerMove={(e) => {
          const d = drag.current
          if (!d || d.pointerId !== e.pointerId) return
          zoom.current.x = d.ox + (e.clientX - d.x)
          zoom.current.y = d.oy + (e.clientY - d.y)
          apply()
        }}
        onPointerUp={(e) => {
          if (drag.current?.pointerId === e.pointerId) drag.current = null
          grabbing.current = false
          apply()
        }}
        onPointerCancel={() => {
          drag.current = null
          grabbing.current = false
          apply()
        }}
      >
        <img
          src={asset(src)}
          alt=""
          draggable={false}
          className="h-auto max-h-[calc(100svh-5.5rem)] w-auto max-w-[calc(100vw-2.5rem)] min-h-0 min-w-0 select-none object-contain"
        />
      </div>
      {label ? (
        <Label className="pointer-events-none absolute bottom-[max(14px,env(safe-area-inset-bottom))] left-[max(16px,env(safe-area-inset-left))] z-2 max-w-[calc(100%-2rem)] opacity-55">
          {label}
        </Label>
      ) : null}
    </div>
  )
}
