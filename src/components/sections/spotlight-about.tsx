import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { useIsTouch, useReducedMotion } from '@/hooks/use-media'

type SpotlightAboutProps = {
  paragraphs: string[]
  moreParagraphs?: string[]
  moreLabel?: string
}

const SCRIBBLE_D =
  'M737.329 149.72C732.159 145.414 726.989 141.108 636.43 149.311C545.872 157.515 370.082 178.359 252.502 207.377C134.922 236.396 80.8793 272.957 49.8374 297.019C18.7955 321.081 12.3919 331.536 8.46133 341.461C4.53074 351.387 3.26718 360.466 2.74505 371.317C1.64777 394.12 4.75802 428.965 10.2222 476.197C16.9657 534.488 34.47 591.746 61.6329 651.242C77.1466 685.222 98.8402 700.98 130.874 721.801C162.908 742.623 205.308 761.406 255.692 768.545C306.076 775.685 363.16 770.61 433.501 742.654C503.841 714.699 585.709 664.017 665.678 593.025C745.648 522.033 821.24 432.267 864.529 377.488C907.819 322.71 916.515 305.639 920.535 291.893C924.555 278.147 923.635 268.243 920.652 254.175C913.273 219.368 897.612 187.116 872.382 153.583C857.238 133.455 836.484 119.837 716.631 127.339C596.778 134.842 378.237 167.156 251.593 194.212C124.949 221.267 96.824 242.085 75.7376 261.376C41.238 292.939 22.07 330.27 12.0523 359.743C4.2858 382.592 1.87621 417.965 0.742839 450.232C-2.17015 533.162 21.5562 617.758 48.6845 691.085C65.1362 735.554 90.052 771.426 126.106 806.992C162.16 842.557 209.367 870.766 301.032 867.219C392.696 863.673 527.388 827.516 635.672 780.937C743.955 734.357 821.748 678.449 876.903 631.405C932.057 584.36 962.215 547.873 988.42 509.874C1014.62 471.875 1035.96 433.472 1046.49 409.193C1057.02 384.914 1056.09 375.924 1053.59 363.285C1051.1 350.646 1047.07 334.631 1040.9 318.2C1034.74 301.77 1026.56 285.409 948.62 256.329C870.678 227.248 723.214 185.944 609.684 178.539C496.154 171.135 421.025 198.882 370.792 224.966C320.559 251.05 297.498 274.629 281.083 294.676C255.329 326.129 243.983 354.491 240.512 375.099C238.621 386.324 239.254 405.928 241.367 426.987C246.234 475.488 262.514 530.033 286.149 596.133C298.957 631.955 315.421 657.638 338.165 684.566C360.91 711.493 389.948 735.111 460.892 747.129C531.835 759.147 643.804 758.848 722.554 740.15C801.304 721.451 843.443 684.361 878.159 646.672C912.874 608.983 938.89 571.819 957.104 542.524C985.288 497.194 996.067 463.117 998.221 440.62C1001.09 410.678 998.079 366.297 990.032 311.937C978.632 234.931 952.012 175.173 917.194 109.906C897.376 72.7571 870.995 51.6007 838.996 29.87C806.997 8.13934 769.617 -7.34506 686.707 4.7217C603.797 16.7885 476.49 56.8756 384.206 104.199C291.922 151.523 238.519 204.868 199.227 249.755C159.935 294.642 136.372 329.454 117.537 361.768C84.8744 417.805 68.1753 463.4 63.3541 485.22C61.3439 494.318 62.3424 506.629 65.9455 524.979C75.3727 572.988 99.7451 628.444 138.932 689.593C161.104 724.191 189.783 741.623 287.458 750.896C385.133 760.17 551.412 754.517 664.302 735.68C777.191 716.843 831.653 684.994 874.545 651.124C917.436 617.255 947.106 582.33 964.885 559.656C982.663 536.981 987.651 527.616 989.345 509.332C999.042 404.706 954.407 307.853 927.434 244.704C913.341 211.71 896.986 189.204 867.419 157.4C837.853 125.597 795.201 88.3515 733.608 57.0615C672.014 25.7714 592.771 1.56538 510.712 1.74697C428.653 1.92856 346.18 27.2313 292.729 50.4076C239.277 73.5838 217.347 93.8668 201.986 111.607C186.624 129.347 178.496 143.929 173.483 155.036C168.47 166.144 166.819 173.335 171.257 189.525C175.694 205.715 186.271 230.686 192.858 245.299C199.446 259.913 201.725 263.413 204.072 267.019'

const UNDERLINE_D =
  'M0.5 6.97204C1.23799 7.07968 1.97598 7.18732 17.3331 6.19798C32.6903 5.20864 62.6442 3.11907 77.7254 1.9669C92.8065 0.814719 92.1072 0.663254 90.7412 0.56299C89.3751 0.462727 87.3636 0.418254 80.9287 0.937717C74.4938 1.45718 63.6966 2.54193 65.552 3.20128C67.4074 3.86064 82.2426 4.06173 89.4132 4.4299C96.5838 4.79808 95.6402 5.32724 72.7276 10.3046C49.815 15.2819 4.96211 24.6915 13.585 25.3055C22.208 25.9195 85.6659 17.453 151.047 8.72986'

function wordsOf(text: string) {
  return text.split(/\s+/).filter(Boolean)
}

function ScribbleTrail() {
  const hostRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (useIsTouch()) return
    const host = hostRef.current
    const stage = host?.parentElement
    if (!host || !stage) return

    const marks: SVGSVGElement[] = []
    let last = 0

    const spawn = (x: number, y: number) => {
      while (marks.length >= 10) {
        marks.shift()?.remove()
      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 200 160')
      svg.setAttribute('aria-hidden', 'true')
      svg.classList.add('pointer-events-none', 'absolute', 'overflow-visible')
      const size = 90 + Math.random() * 70
      svg.style.width = `${size}px`
      svg.style.left = `${x - size / 2}px`
      svg.style.top = `${y - size / 2}px`
      svg.style.transform = `rotate(${(Math.random() - 0.5) * 50}deg)`
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute(
        'd',
        'M100 20 C 160 28, 188 70, 172 110 C 156 148, 100 156, 58 138 C 18 118, 12 70, 40 40 C 68 12, 120 22, 148 52',
      )
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', '#ff0000')
      path.setAttribute('stroke-width', '1.15')
      path.setAttribute('stroke-linecap', 'round')
      svg.appendChild(path)
      host.appendChild(svg)
      marks.push(svg)
      gsap.fromTo(
        svg,
        { opacity: 0.9, scale: 0.7 },
        {
          opacity: 0,
          scale: 1.05,
          duration: 1.15,
          ease: 'power2.out',
          onComplete: () => {
            svg.remove()
            const i = marks.indexOf(svg)
            if (i >= 0) marks.splice(i, 1)
          },
        },
      )
    }

    const move = (e: PointerEvent) => {
      const now = Date.now()
      if (now - last < 70) return
      last = now
      const r = host.getBoundingClientRect()
      spawn(e.clientX - r.left, e.clientY - r.top)
    }

    stage.addEventListener('pointermove', move)
    return () => {
      stage.removeEventListener('pointermove', move)
      marks.forEach((m) => m.remove())
    }
  }, [])

  return <div ref={hostRef} className="pointer-events-none absolute inset-0 z-2" />
}

export function SpotlightAbout({
  paragraphs,
  moreParagraphs = [],
  moreLabel = 'More about me',
}: SpotlightAboutProps) {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const para = useRef<HTMLParagraphElement>(null)
  const extra = useRef<HTMLDivElement>(null)
  const linkPath = useRef<SVGPathElement>(null)
  const scribblePath = useRef<SVGPathElement>(null)
  const text = paragraphs.join(' ')
  const words = wordsOf(text)
  const [open, setOpen] = useState(false)
  const [fontsReady, setFontsReady] = useState(
    () => !document.fonts || document.fonts.status === 'loaded',
  )

  useLayoutEffect(() => {
    if (fontsReady) return
    void document.fonts.ready.then(() => setFontsReady(true))
  }, [fontsReady])

  useGSAP(
    () => {
      const section = root.current
      const pinEl = pin.current
      const paraEl = para.current
      if (!fontsReady || !section || !pinEl || !paraEl) return

      const reduce = useReducedMotion()
      const wordEls = Array.from(paraEl.querySelectorAll<HTMLElement>('[data-word]'))
      if (!wordEls.length) return

      const fit = () => {
        paraEl.style.fontSize = ''
        const stageEl = stage.current
        if (!stageEl) return
        let size = Number.parseFloat(getComputedStyle(paraEl).fontSize) || 40
        const budget = stageEl.clientHeight * 0.72
        while (size > 18 && paraEl.scrollHeight > budget) {
          size -= 1
          paraEl.style.fontSize = `${size}px`
        }
      }

      const build = () => {
        ScrollTrigger.getAll().forEach((st) => {
          const trigger = st.trigger
          if (trigger === pinEl || trigger === section) st.kill()
        })
        gsap.killTweensOf([...wordEls, scribblePath.current, linkPath.current])
        fit()

        if (reduce) {
          gsap.set(wordEls, { x: 0 })
          const scribble = scribblePath.current
          if (scribble) {
            const len = scribble.getTotalLength()
            scribble.style.strokeDasharray = String(len)
            scribble.style.strokeDashoffset = '0'
          }
          const underline = linkPath.current
          if (underline) {
            const len = underline.getTotalLength()
            underline.style.strokeDasharray = String(len)
            underline.style.strokeDashoffset = '0'
          }
          return
        }

        gsap.set(wordEls, { x: window.innerWidth })

        const lines: HTMLElement[][] = [[]]
        let line = 0
        wordEls.forEach((el, i) => {
          if (i > 0 && el.offsetTop !== wordEls[i - 1]!.offsetTop) {
            lines.push([])
            line += 1
          }
          lines[line]!.push(el)
        })

        lines.forEach((group) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          })
          tl.fromTo(
            group,
            { x: window.innerWidth },
            { x: 0, stagger: 0.12, ease: 'power1.inOut', duration: 0.55 },
          )
          tl.to({}, { duration: 1.4 })
        })

        const scribble = scribblePath.current
        if (scribble) {
          const len = scribble.getTotalLength()
          scribble.style.strokeDasharray = String(len)
          scribble.style.strokeDashoffset = String(len)
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          })
          tl.to(scribble, { strokeDashoffset: 0, ease: 'none', duration: 0.35 })
          tl.to({}, { duration: 1.2 })
          tl.to(scribble, { strokeDashoffset: -len, ease: 'none', duration: 0.35 })
        }

        const underline = linkPath.current
        if (underline) {
          const len = underline.getTotalLength()
          underline.style.strokeDasharray = String(len)
          underline.style.strokeDashoffset = String(len)
          gsap.to(underline, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'center center',
              scrub: true,
            },
          })
        }
      }

      build()
      let resizeTimer = 0
      const onResize = () => {
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(() => {
          gsap.set(wordEls, { clearProps: 'transform' })
          build()
        }, 250)
      }
      window.addEventListener('resize', onResize)
      return () => {
        window.clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: root, dependencies: [text, fontsReady] },
  )

  useLayoutEffect(() => {
    const el = extra.current
    if (!el) return
    if (open) {
      gsap.fromTo(
        el,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
      )
    }
  }, [open])

  return (
    <section ref={root} id="about" className="relative bg-black text-white">
      <h2 className="sr-only">About</h2>
      <div ref={pin} className="h-[420vh] max-[800px]:h-[280vh]">
        <div
          ref={stage}
          className={`sticky top-0 z-2 flex h-svh flex-col justify-center bg-black pt-[calc(var(--header-h)+12px)] pr-[max(var(--spacing-edge),env(safe-area-inset-right))] pb-[max(clamp(24px,6vh,64px),env(safe-area-inset-bottom))] pl-[max(var(--spacing-edge),env(safe-area-inset-left))] ${
            open ? 'overflow-y-auto' : 'overflow-hidden'
          }`}
        >
          <ScribbleTrail />

          <svg
            className="pointer-events-none absolute top-1/2 left-1/2 z-1 h-auto w-[60%] max-h-[80%] -translate-x-1/2 -translate-y-1/2 text-accent max-[800px]:w-[90%]"
            viewBox="0 0 1056 869"
            fill="none"
            aria-hidden
          >
            <path
              ref={scribblePath}
              d={SCRIBBLE_D}
              stroke="currentColor"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <p
            ref={para}
            style={{ color: '#ffffff' }}
            className="relative z-3 m-0 overflow-hidden font-display text-[clamp(20px,5.6vw,50px)] leading-[1.12] uppercase max-[800px]:text-[clamp(18px,5.4vw,32px)]"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span data-word="" className="inline-block will-change-transform">
                  {word}
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>

          {open && moreParagraphs.length ? (
            <div
              ref={extra}
              id="about-more"
              className="relative z-3 mt-6 flex max-w-[min(52rem,100%)] flex-col gap-4 font-display text-[clamp(0.92rem,1.8vw,1.55rem)] leading-[1.25] uppercase"
              style={{ color: '#ffffff' }}
            >
              {moreParagraphs.map((p) => (
                <p key={p} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          ) : null}

          {moreParagraphs.length ? (
            <div className="relative z-3 mt-8">
              <button
                type="button"
                className="inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent p-0 font-sans text-[clamp(0.9rem,2vw,1.25rem)] leading-[0.9] font-extralight tracking-[0.02em]"
                style={{ color: '#ff0000' }}
                aria-expanded={open}
                aria-controls="about-more"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="block">{open ? 'Close' : moreLabel}</span>
                <svg
                  className="mt-[0.2em] block h-auto w-[150px] overflow-visible"
                  viewBox="0 0 152 26"
                  fill="none"
                  aria-hidden
                >
                  <path
                    ref={linkPath}
                    d={UNDERLINE_D}
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
