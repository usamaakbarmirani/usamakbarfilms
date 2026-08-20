import { useRef, type RefObject } from 'react'
import { asset } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-media'
import type { FrameItem } from '@/data/site'

const SCRIBBLE_D =
  'M737.329 149.72C732.159 145.414 726.989 141.108 636.43 149.311C545.872 157.515 370.082 178.359 252.502 207.377C134.922 236.396 80.8793 272.957 49.8374 297.019C18.7955 321.081 12.3919 331.536 8.46133 341.461C4.53074 351.387 3.26718 360.466 2.74505 371.317C1.64777 394.12 4.75802 428.965 10.2222 476.197C16.9657 534.488 34.47 591.746 61.6329 651.242C77.1466 685.222 98.8402 700.98 130.874 721.801C162.908 742.623 205.308 761.406 255.692 768.545C306.076 775.685 363.16 770.61 433.501 742.654C503.841 714.699 585.709 664.017 665.678 593.025C745.648 522.033 821.24 432.267 864.529 377.488C907.819 322.71 916.515 305.639 920.535 291.893C924.555 278.147 923.635 268.243 920.652 254.175C913.273 219.368 897.612 187.116 872.382 153.583C857.238 133.455 836.484 119.837 716.631 127.339C596.778 134.842 378.237 167.156 251.593 194.212C124.949 221.267 96.824 242.085 75.7376 261.376C41.238 292.939 22.07 330.27 12.0523 359.743C4.2858 382.592 1.87621 417.965 0.742839 450.232C-2.17015 533.162 21.5562 617.758 48.6845 691.085C65.1362 735.554 90.052 771.426 126.106 806.992C162.16 842.557 209.367 870.766 301.032 867.219C392.696 863.673 527.388 827.516 635.672 780.937C743.955 734.357 821.748 678.449 876.903 631.405C932.057 584.36 962.215 547.873 988.42 509.874C1014.62 471.875 1035.96 433.472 1046.49 409.193C1057.02 384.914 1056.09 375.924 1053.59 363.285C1051.1 350.646 1047.07 334.631 1040.9 318.2C1034.74 301.77 1026.56 285.409 948.62 256.329C870.678 227.248 723.214 185.944 609.684 178.539C496.154 171.135 421.025 198.882 370.792 224.966C320.559 251.05 297.498 274.629 281.083 294.676C255.329 326.129 243.983 354.491 240.512 375.099C238.621 386.324 239.254 405.928 241.367 426.987C246.234 475.488 262.514 530.033 286.149 596.133C298.957 631.955 315.421 657.638 338.165 684.566C360.91 711.493 389.948 735.111 460.892 747.129C531.835 759.147 643.804 758.848 722.554 740.15C801.304 721.451 843.443 684.361 878.159 646.672C912.874 608.983 938.89 571.819 957.104 542.524C985.288 497.194 996.067 463.117 998.221 440.62C1001.09 410.678 998.079 366.297 990.032 311.937C978.632 234.931 952.012 175.173 917.194 109.906C897.376 72.7571 870.995 51.6007 838.996 29.87C806.997 8.13934 769.617 -7.34506 686.707 4.7217C603.797 16.7885 476.49 56.8756 384.206 104.199C291.922 151.523 238.519 204.868 199.227 249.755C159.935 294.642 136.372 329.454 117.537 361.768C84.8744 417.805 68.1753 463.4 63.3541 485.22C61.3439 494.318 62.3424 506.629 65.9455 524.979C75.3727 572.988 99.7451 628.444 138.932 689.593C161.104 724.191 189.783 741.623 287.458 750.896C385.133 760.17 551.412 754.517 664.302 735.68C777.191 716.843 831.653 684.994 874.545 651.124C917.436 617.255 947.106 582.33 964.885 559.656C982.663 536.981 987.651 527.616 989.345 509.332C999.042 404.706 954.407 307.853 927.434 244.704C913.341 211.71 896.986 189.204 867.419 157.4C837.853 125.597 795.201 88.3515 733.608 57.0615C672.014 25.7714 592.771 1.56538 510.712 1.74697C428.653 1.92856 346.18 27.2313 292.729 50.4076C239.277 73.5838 217.347 93.8668 201.986 111.607C186.624 129.347 178.496 143.929 173.483 155.036C168.47 166.144 166.819 173.335 171.257 189.525C175.694 205.715 186.271 230.686 192.858 245.299C199.446 259.913 201.725 263.413 204.072 267.019'

type ManifestoProps = {
  stills: readonly [FrameItem, FrameItem]
}

type Slot = {
  slot: HTMLSpanElement
  word: HTMLSpanElement
  img: HTMLSpanElement
  dir: 'up' | 'down'
}

export function Manifesto({ stills }: ManifestoProps) {
  const root = useRef<HTMLElement>(null)
  const probe = useRef<HTMLSpanElement>(null)
  const scribblePath = useRef<SVGPathElement>(null)
  const slotA = useRef<HTMLSpanElement>(null)
  const slotB = useRef<HTMLSpanElement>(null)
  const wordA = useRef<HTMLSpanElement>(null)
  const wordB = useRef<HTMLSpanElement>(null)
  const imgA = useRef<HTMLSpanElement>(null)
  const imgB = useRef<HTMLSpanElement>(null)
  const [a, b] = stills

  useGSAP(
    () => {
      const slots: Slot[] = [
        { slot: slotA.current!, word: wordA.current!, img: imgA.current!, dir: 'up' },
        { slot: slotB.current!, word: wordB.current!, img: imgB.current!, dir: 'down' },
      ]
      if (slots.some((s) => !s.slot || !s.word || !s.img) || !probe.current) return

      const shot = () => ({
        w: probe.current!.offsetWidth,
        h: probe.current!.offsetHeight,
      })

      const rest = () => {
        slots.forEach(({ slot, word, img }) => {
          gsap.set(slot, {
            width: word.offsetWidth,
            height: word.offsetHeight,
          })
          gsap.set(word, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
          })
          gsap.set(img, {
            width: 0,
            height: 0,
            autoAlpha: 1,
            rotate: 0,
            xPercent: -50,
            yPercent: -50,
          })
        })
      }

      rest()

      const scribble = scribblePath.current
      if (scribble) {
        const len = scribble.getTotalLength()
        scribble.style.strokeDasharray = String(len)
        scribble.style.strokeDashoffset = String(len)
      }

      if (useReducedMotion()) {
        const { w, h } = shot()
        slots.forEach(({ word, img, slot, dir }) => {
          gsap.set(slot, { width: w, height: h })
          gsap.set(img, { width: w, height: h, xPercent: -50, yPercent: -50 })
          gsap.set(word, { y: dir === 'up' ? -h * 0.7 : h * 0.7 })
        })
        if (scribble) gsap.set(scribble, { strokeDashoffset: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })

      if (scribble) {
        const len = scribble.getTotalLength()
        tl.to(scribble, { strokeDashoffset: 0, ease: 'none', duration: 0.35 }, 0)
        tl.to(scribble, { strokeDashoffset: -len, ease: 'none', duration: 0.35 }, 0.65)
      }

      slots.forEach((item, i) => {
        const at = i === 0 ? 0 : 0.22
        const rotate = item.dir === 'up' ? 6 : -5
        tl.fromTo(
          item.slot,
          {
            width: () => item.word.offsetWidth,
            height: () => item.word.offsetHeight,
          },
          {
            width: () => shot().w,
            height: () => shot().h,
            duration: 0.8,
            ease: 'none',
          },
          at,
        )
        tl.fromTo(
          item.img,
          { width: 0, height: 0, rotate: 0, xPercent: -50, yPercent: -50 },
          {
            width: () => shot().w,
            height: () => shot().h,
            rotate,
            xPercent: -50,
            yPercent: -50,
            duration: 0.8,
            ease: 'none',
          },
          at,
        )
        tl.fromTo(
          item.word,
          { y: 0, xPercent: -50, yPercent: -50 },
          {
            y: () => (item.dir === 'up' ? -shot().h * 0.78 : shot().h * 0.78),
            xPercent: -50,
            yPercent: -50,
            duration: 0.8,
            ease: 'none',
          },
          at,
        )
      })
    },
    { scope: root, dependencies: [a.src, b.src] },
  )

  return (
    <section
      ref={root}
      id="manifesto"
      className="relative flex min-h-svh items-center justify-center overflow-x-clip overflow-y-visible bg-black px-(--spacing-edge) py-[max(10vw,5.5rem)] text-white"
    >
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
      <div className="relative z-2 w-full text-center">
        <h2
          className="manifesto-type m-0 flex w-full max-w-full flex-col items-center justify-center gap-[0.14em] font-sans leading-[1.05] font-normal tracking-[-0.04em] uppercase min-[700px]:gap-[0.1em] min-[700px]:leading-none min-[700px]:tracking-[-0.03em]"
          style={{ color: '#ffffff' }}
        >
          <span
            ref={probe}
            aria-hidden
            className="pointer-events-none invisible absolute aspect-video w-[min(36vw,7.25rem)] min-[700px]:w-[2.75em]"
          />
          <span className="flex max-w-full flex-nowrap items-center justify-center gap-[0.12em] whitespace-nowrap min-[700px]:gap-[0.18em]">
            <span>turning</span>
            <Reveal
              slotRef={slotA}
              wordRef={wordA}
              imgRef={imgA}
              word="ideas"
              frame={a}
            />
            <span>into</span>
          </span>
          <span className="whitespace-nowrap">standout moments</span>
          <span className="whitespace-nowrap">with cinematic</span>
          <span className="flex max-w-full flex-nowrap items-center justify-center gap-[0.12em] whitespace-nowrap min-[700px]:gap-[0.18em]">
            <span>level</span>
            <Reveal
              slotRef={slotB}
              wordRef={wordB}
              imgRef={imgB}
              word="impact"
              frame={b}
            />
          </span>
        </h2>
      </div>
    </section>
  )
}

type RevealProps = {
  word: string
  frame: FrameItem
  slotRef: RefObject<HTMLSpanElement | null>
  wordRef: RefObject<HTMLSpanElement | null>
  imgRef: RefObject<HTMLSpanElement | null>
}

function Reveal({ word, frame, slotRef, wordRef, imgRef }: RevealProps) {
  return (
    <span
      ref={slotRef}
      className="relative inline-block shrink-0 overflow-visible align-middle"
    >
      <span
        ref={wordRef}
        className="absolute top-1/2 left-1/2 z-3 whitespace-nowrap will-change-transform"
      >
        {word}
      </span>
      <span
        ref={imgRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-1 overflow-hidden rounded-[0.18em] bg-black"
      >
        <img
          src={asset(frame.src)}
          alt=""
          className="h-full w-full max-w-none object-cover"
        />
      </span>
    </span>
  )
}
