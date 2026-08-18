import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '@/lib/cn'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { Display, Label, Body } from '@/components/ui/typography'
import { Rule } from '@/components/ui/chrome'
import { useReducedMotion } from '@/hooks/use-media'
import { ribbonPath } from '@/data/site'

type StillsRibbonProps = {
  images: string[]
  path?: string
}

const CONFIG = {
  viewBox: { w: 1200, h: 520 },
  pathCenterY: 285,
  baseVelocity: 4.2,
  slowDownFactor: 0.22,
  hoverLerp: 0.11,
  dragSensitivity: 0.22,
  dragVelocityDecay: 0.94,
  scrollBoost: 1.8,
  zIndexBase: 1,
  zIndexRange: 30,
}

function wrapVal(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export function StillsRibbon({ images, path = ribbonPath }: StillsRibbonProps) {
  const wrapEl = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const pathEl = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      const wrap = wrapEl.current
      const stageEl = stage.current
      const pathNode = pathEl.current
      if (!wrap || !stageEl || !pathNode) return

      if (!CSS.supports('offset-path', "path('M 0 0 L 10 10')")) {
        stageEl.style.cssText = 'display:flex;gap:12px;overflow-x:auto;height:100%'
      }

      stageEl.querySelectorAll('.ribbon__item').forEach((n) => n.remove())

      const els: HTMLDivElement[] = []
      images.forEach((src) => {
        const item = document.createElement('div')
        item.className = 'ribbon__item'
        item.style.offsetPath = `path('${path}')`
        item.style.offsetRotate = 'auto'
        const inner = document.createElement('div')
        inner.className =
          'ribbon__inner relative h-full w-full overflow-hidden bg-neutral-950'
        const img = document.createElement('img')
        img.src = asset(src)
        img.alt = ''
        img.loading = 'lazy'
        img.draggable = false
        img.className = 'h-full w-full object-cover'
        inner.appendChild(img)
        item.appendChild(inner)
        stageEl.appendChild(item)
        els.push(item)
      })

      const updateScale = () => {
        const ww = wrap.clientWidth
        const wh = wrap.clientHeight
        const vbw = ww < 860 ? 620 : CONFIG.viewBox.w
        const s = ww / vbw
        stageEl.style.width = `${CONFIG.viewBox.w}px`
        stageEl.style.height = `${CONFIG.viewBox.h}px`
        stageEl.style.transform = `translate(0px, ${wh / 2 - CONFIG.pathCenterY * s}px) scale(${s})`
      }
      updateScale()
      window.addEventListener('resize', updateScale)

      let base = 0
      let hover = 1
      let hoverTarget = 1
      let dragging = false
      let dragV = 0
      let lastPointer = 0
      let lastScrollY = window.scrollY
      let inView = true

      wrap.addEventListener('mouseenter', () => {
        hoverTarget = CONFIG.slowDownFactor
      })
      wrap.addEventListener('mouseleave', () => {
        hoverTarget = 1
      })
      wrap.addEventListener('pointerdown', (e) => {
        wrap.setPointerCapture(e.pointerId)
        dragging = true
        dragV = 0
        lastPointer = e.clientX
        wrap.classList.add('cursor-grabbing')
      })
      wrap.addEventListener('pointermove', (e) => {
        if (!dragging) return
        dragV = (e.clientX - lastPointer) * CONFIG.dragSensitivity
        lastPointer = e.clientX
      })
      const endDrag = (e: PointerEvent) => {
        if (!dragging) return
        try {
          wrap.releasePointerCapture(e.pointerId)
        } catch {
          /* empty */
        }
        dragging = false
        wrap.classList.remove('cursor-grabbing')
      }
      wrap.addEventListener('pointerup', endDrag)
      wrap.addEventListener('pointercancel', endDrag)

      ScrollTrigger.create({
        trigger: wrap.closest('section') ?? wrap,
        start: 'top bottom',
        end: 'bottom top',
        onToggle(self) {
          inView = self.isActive
        },
      })

      const n = els.length
      const reduce = useReducedMotion()
      const ticker = (_time: number, delta: number) => {
        if (!inView) return
        hover += (hoverTarget - hover) * CONFIG.hoverLerp
        if (dragging) {
          base += dragV
          dragV *= 0.9
          if (Math.abs(dragV) < 0.01) dragV = 0
        } else {
          const y = window.scrollY
          const sv = Math.abs(y - lastScrollY)
          lastScrollY = y
          const boost = Math.min(sv / 70, 1) * (reduce ? 0 : CONFIG.scrollBoost)
          base += (reduce ? 0 : CONFIG.baseVelocity) * (delta / 1000) * hover * (1 + boost)
          if (Math.abs(dragV) > 0.01) {
            base += dragV
            dragV *= CONFIG.dragVelocityDecay
          } else dragV = 0
        }
        for (let k = 0; k < n; k++) {
          const d = wrapVal(0, 100, base + (k * 100) / n)
          els[k].style.offsetDistance = `${d}%`
          els[k].style.zIndex = String(
            (CONFIG.zIndexBase + (d / 100) * CONFIG.zIndexRange) | 0,
          )
        }
      }
      gsap.ticker.add(ticker)

      return () => {
        gsap.ticker.remove(ticker)
        window.removeEventListener('resize', updateScale)
      }
    },
    { dependencies: [images, path] },
  )

  return (
    <section id="stills" className="relative overflow-hidden bg-black py-(--spacing-section)">
      <div className="mx-(--spacing-edge) mb-[clamp(28px,4vw,56px)] flex flex-wrap items-end justify-between gap-[clamp(16px,4vw,60px)]">
        <Display className="text-[clamp(2.4rem,8.5vw,7.5rem)]">Stills</Display>
        <div className="flex max-w-[38ch] flex-col gap-3">
          <Label className="text-accent">Photography</Label>
          <Body>Portrait, landscape, music and product work.</Body>
        </div>
      </div>
      <Rule className="mx-(--spacing-edge) mb-[clamp(28px,4vw,52px)]" />
      <div
        ref={wrapEl}
        className="relative h-[clamp(320px,58vh,600px)] w-full cursor-grab overflow-hidden touch-pan-y max-[860px]:h-[clamp(260px,44vh,380px)]"
      >
        <div ref={stage} className="relative origin-top-left">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path ref={pathEl} d={path} fill="none" stroke="none" />
          </svg>
        </div>
      </div>
      <div className="mt-[clamp(10px,2vw,26px)] flex flex-wrap items-center justify-between gap-4 px-(--spacing-edge)">
        <Label className="flex items-center gap-2 opacity-45">
          <i className="block size-[5px] rounded-full bg-accent" />
          Drag to scrub · hover to slow
        </Label>
        <Link to="/stills" className="opacity-45 hover:text-accent">
          <Label as="span">View all stills →</Label>
        </Link>
        <Label className="opacity-45">{images.length} Stills</Label>
      </div>
    </section>
  )
}
