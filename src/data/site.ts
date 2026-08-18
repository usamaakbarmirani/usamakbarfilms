export const media = {
  logo: '/Logo.png',
  showreel: '/video/Showreel Final.mp4',
  trailer: '/video/Trailer.mp4',
  mismatched: '/video/Mismatched TEASER.mp4',
  brand: '/video/brand Film.mp4',
  dawn: '/video/Dawn to Rise.mp4',
  kashmir: '/video/KASHMIR.mp4',
  fairy: '/video/Fairy Meadow.mp4',
  khalal: '/video/Khalall.mp4',
  akhri: '/video/akhri kheyl.mp4',
  photoHero: '/Images/Photography Inner Hero.jpeg',
  filmHero: '/Images/film.jpeg',
  stillsHero: '/Images/stills.jpeg',
  footer: '/video/intro.mp4',
} as const

export const contact = {
  phone: '+923395048697',
  phoneLabel: '+92 339 5048697',
  email: 'usamaakbarmirani@gmail.com',
  instagram: 'https://www.instagram.com/usamaa.akbar/',
  linkedin: 'https://www.linkedin.com/in/usama-akbar-374b3317b/',
} as const

export const aboutCopy = [
  'I’m Usama Akbar, a filmmaker, writer, director and cinematographer based in Karachi, Pakistan.',
  'My work is driven by a curiosity for visual storytelling and a constant interest in exploring new ways of presenting an idea. I work across narrative films, commercial projects and photography, often moving between directing and cinematography depending on the project.',
]

export const aboutMoreCopy = [
  'I’m drawn to strong visuals, interesting concepts and stories with something of their own to say. My background in film and television has given me a foundation, but most of what I’ve learned has come from making, experimenting and working through projects firsthand.',
  'Here you’ll find a selection of my work in direction, cinematography and photography.',
]

export type ServiceItem = {
  title: string
  href: string
  description: string
}

export const services: ServiceItem[] = [
  {
    title: 'Film',
    href: '/film',
    description:
      'Concept, treatment and on-set direction — building the story before a single frame is shot.',
  },
  {
    title: 'Immersive',
    href: '/immersive',
    description:
      'Camera, lensing and light. Shaping how the story is seen, one frame at a time.',
  },
  {
    title: 'Stills',
    href: '/stills',
    description:
      'Stills that stand on their own — portrait, landscape, music and product work.',
  },
]

export type PlateSpan = 4 | 5 | 6 | 7 | 8 | 12

export type PlateItem = {
  src: string
  alt: string
  span: PlateSpan
}

export type FrameItem = {
  src: string
  alt: string
  caption?: string
}

const gumaanFrames: FrameItem[] = Array.from({ length: 9 }, (_, i) => ({
  src: `/Images/Film/Gumaan/${i + 1}.png`,
  alt: `Gumaan — frame ${i + 1}`,
  caption: 'Gumaan',
}))

const mismatchedSnaps = [
  'vlcsnap-2026-08-05-03h58m04s079.png',
  'vlcsnap-2026-08-05-03h59m39s883.png',
  'vlcsnap-2026-08-05-04h05m13s267.png',
  'vlcsnap-2026-08-05-04h05m26s791.png',
  'vlcsnap-2026-08-05-04h05m54s475.png',
  'vlcsnap-2026-08-05-04h06m08s483.png',
  'vlcsnap-2026-08-05-04h07m28s947.png',
  'vlcsnap-2026-08-05-04h08m37s361.png',
]

const mismatchedFrames: FrameItem[] = mismatchedSnaps.map((file, i) => ({
  src: `/Images/Film/mismatched/${file}`,
  alt: `Mismatched — frame ${i + 1}`,
  caption: 'Mismatched',
}))

const brandSnaps = [
  'vlcsnap-2026-08-05-04h25m24s882.png',
  'vlcsnap-2026-08-05-04h25m45s914.png',
  'vlcsnap-2026-08-05-04h28m21s333.png',
  'vlcsnap-2026-08-05-04h29m06s380.png',
  'vlcsnap-2026-08-05-04h29m49s057.png',
  'vlcsnap-2026-08-05-04h30m29s308.png',
  'vlcsnap-2026-08-05-04h31m02s756.png',
  'vlcsnap-2026-08-05-04h31m37s129.png',
  'vlcsnap-2026-08-05-04h31m55s356.png',
]

export const brandFrames: FrameItem[] = brandSnaps.map((file, i) => ({
  src: `/Images/Film/brand film/${file}`,
  alt: `Brand film — frame ${i + 1}`,
  caption: 'Brand Film',
}))

export const manifestoStills = [brandFrames[0], brandFrames[8]] as const

const khalalSnaps = [
  'vlcsnap-2024-12-17-09h03m46s844.png',
  'vlcsnap-2024-12-17-09h03m57s800.png',
  'vlcsnap-2024-12-17-09h04m08s882.png',
  'vlcsnap-2024-12-17-09h04m37s935.png',
  'vlcsnap-2024-12-17-09h05m50s734.png',
]

const khalalFrames: FrameItem[] = khalalSnaps.map((file, i) => ({
  src: `/Images/Film/khalal/${file}`,
  alt: `Khalal — frame ${i + 1}`,
  caption: 'Khalal',
}))

const akhriSnaps = [
  'vlcsnap-2026-08-05-04h13m12s619.png',
  'vlcsnap-2026-08-05-04h14m08s212.png',
  'vlcsnap-2026-08-05-04h14m41s277.png',
  'vlcsnap-2026-08-05-04h17m04s076.png',
  'vlcsnap-2026-08-05-04h18m30s256.png',
  'vlcsnap-2026-08-05-04h20m49s085.png',
  'vlcsnap-2026-08-05-04h21m06s071.png',
  'vlcsnap-2026-08-05-04h21m33s809.png',
  'vlcsnap-2026-08-05-04h21m59s277.png',
]

const akhriFrames: FrameItem[] = akhriSnaps.map((file, i) => ({
  src: `/Images/Film/akhri/${file}`,
  alt: `Akhri Kheyl — frame ${i + 1}`,
  caption: 'Akhri Kheyl',
}))

const dawnSnaps = [
  'vlcsnap-2026-08-05-03h42m36s306.png',
  'vlcsnap-2026-08-05-03h43m22s630.png',
  'vlcsnap-2026-08-05-03h45m57s369.png',
  'vlcsnap-2026-08-05-03h48m25s955.png',
  'vlcsnap-2026-08-05-03h48m59s713.png',
  'vlcsnap-2026-08-05-03h49m28s685.png',
  'vlcsnap-2026-08-05-03h50m20s754.png',
]

export const dawnFrames: FrameItem[] = dawnSnaps.map((file, i) => ({
  src: `/Images/Film/dawn to rise/${file}`,
  alt: `Dawn to Rise — frame ${i + 1}`,
  caption: 'Dawn to Rise',
}))

export const kashmirFrames: FrameItem[] = Array.from({ length: 6 }, (_, i) => ({
  src: `/Images/Film/kashmir/${String(i + 1).padStart(2, '0')}.png`,
  alt: `Kashmir — frame ${i + 1}`,
  caption: 'Kashmir',
}))

export const fairyFrames: FrameItem[] = Array.from({ length: 6 }, (_, i) => ({
  src: `/Images/Film/fairy meadows/${String(i + 1).padStart(2, '0')}.png`,
  alt: `Fairy Meadows — frame ${i + 1}`,
  caption: 'Fairy Meadows',
}))

const gumaanSpans: PlateSpan[] = [8, 4, 4, 8, 6, 6, 12, 5, 7]
const mismatchedSpans: PlateSpan[] = [8, 4, 4, 8, 6, 6, 5, 7]

export const gumaanPlates: PlateItem[] = gumaanFrames.map((frame, i) => ({
  src: frame.src,
  alt: frame.alt,
  span: gumaanSpans[i] ?? 6,
}))

export const mismatchedPlates: PlateItem[] = mismatchedFrames.map((frame, i) => ({
  src: frame.src,
  alt: frame.alt,
  span: mismatchedSpans[i] ?? 6,
}))

export type Credit = { role: string; name: string; accent?: boolean }

export type Film = {
  id: string
  no: number
  title: string
  tag: string
  body: string
  video?: { src: string; label: string; loop?: boolean }
  credits?: Credit[]
  frames: FrameItem[]
  plates?: PlateItem[]
}

export const films: Film[] = [
  {
    id: 'gumaan',
    no: 1,
    title: 'Gumaan',
    tag: 'Short Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.trailer, label: 'Official Trailer' },
    credits: [
      { role: 'Written & Directed by', name: 'Usama Akbar', accent: true },
      { role: 'Cinematographer', name: 'Faizan Abbasi' },
    ],
    frames: gumaanFrames,
    plates: gumaanPlates,
  },
  {
    id: 'mismatched',
    no: 2,
    title: 'Mismatched',
    tag: 'Short Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.mismatched, label: 'Teaser' },
    credits: [
      { role: 'Directed by', name: 'Nabiha Aamir' },
      { role: 'Associate Director', name: 'Usama Akbar', accent: true },
    ],
    frames: mismatchedFrames,
    plates: mismatchedPlates,
  },
  {
    id: 'khalal',
    no: 3,
    title: 'Khalal',
    tag: 'Short Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.khalal, label: 'Film', loop: false },
    frames: khalalFrames,
  },
  {
    id: 'akhri-kheyl',
    no: 4,
    title: 'Akhri Kheyl',
    tag: 'Short Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.akhri, label: 'Film', loop: false },
    frames: akhriFrames,
  },
]

export const immersiveFilms: Film[] = [
  {
    id: 'brand-film',
    no: 1,
    title: 'Brand Film',
    tag: 'Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.brand, label: 'Film' },
    frames: brandFrames,
  },
  {
    id: 'dawn-to-rise',
    no: 2,
    title: 'Dawn to Rise',
    tag: 'Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.dawn, label: 'Film' },
    frames: dawnFrames,
  },
  {
    id: 'kashmir',
    no: 3,
    title: 'Kashmir',
    tag: 'Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.kashmir, label: 'Film' },
    frames: kashmirFrames,
  },
  {
    id: 'fairy-meadows',
    no: 4,
    title: 'Fairy Meadows',
    tag: 'Film',
    body: 'Created by Usama Akbar.',
    video: { src: media.fairy, label: 'Film' },
    frames: fairyFrames,
  },
]

export const stills = [
  '/Images/bw/DSC05541.jpg',
  '/Images/Nature/UAF08026.jpg',
  '/Images/Product/DSC08861.jpg.jpeg',
  '/Images/UAF01309.jpg',
  '/Images/bw/UAF01301.jpg',
  '/Images/Nature/DSC03974.jpg',
  '/Images/Product/DSC08854.jpg.jpeg',
  '/Images/Picsart_25-12-26_07-28-23-968.jpg.jpeg',
  '/Images/bw/DSC05538.jpg',
  '/Images/Nature/UAF08148.jpg.jpeg',
  '/Images/Product/DSC08888.jpg.jpeg',
  '/Images/Picsart_25-12-26_07-31-11-613.jpg.jpeg',
  '/Images/bw/DSC00124-04.jpeg',
  '/Images/Nature/UAF08157.jpg.jpeg',
  '/Images/Product/DSC08878.jpg.jpeg',
  '/Images/Nature/lovely.png',
  '/Images/bw/1.jpg',
  '/Images/Nature/Picsart_24-08-16_06-42-29-036.jpg.jpeg',
  '/Images/Product/DSC00251-02.jpeg',
  '/Images/bw/IMG_6640.jpg.jpeg',
  '/Images/Nature/behance_project_1773347906399.jpg.jpeg',
  '/Images/Product/23.jpg',
  '/Images/Product/8.jpg',
]

export const ribbonPath =
  'M -820 260 C -560 140, -380 400, -140 330 C 100 262, 220 90, 460 200 C 700 310, 780 470, 1000 380 C 1220 290, 1300 120, 1560 210 C 1820 300, 1900 290, 1980 250'

export type PhotoSet = {
  id: string
  no: string
  title: string
  countLabel: string
  body: string
  images: string[]
}

export const photoSets: PhotoSet[] = [
  {
    id: 'product',
    no: 'Set 01',
    title: 'Product',
    countLabel: '16 Images',
    body: 'Commercial and still-life work, lit and shot in studio.',
    images: [
      '/Images/Product/DSC08888.jpg.jpeg',
      '/Images/Product/DSC08878.jpg.jpeg',
      '/Images/Product/behance_project_1744442379891.jpg.jpeg',
      '/Images/Product/behance_project_1744442346908.jpg.jpeg',
      '/Images/Product/behance_project_1744442346134.jpg.jpeg',
      '/Images/Product/8.jpg',
      '/Images/Product/behance_project_1744442414920.jpg.jpeg',
      '/Images/Product/behance_project_1744442415371.jpg.jpeg',
      '/Images/Product/behance_project_1744442414562.jpg.jpeg',
      '/Images/Product/DSC08854.jpg.jpeg',
      '/Images/Product/behance_project_1744442379074.jpg.jpeg',
      '/Images/Product/behance_project_1744442346561.jpg.jpeg',
      '/Images/Product/behance_project_1744442379466.jpg.jpeg',
      '/Images/Product/DSC08861.jpg.jpeg',
      '/Images/Product/23.jpg',
      '/Images/Product/DSC00251-02.jpeg',
    ],
  },
  {
    id: 'nature',
    no: 'Set 02',
    title: 'Nature',
    countLabel: '09 Images',
    body: 'Landscape and light, shot across Pakistan.',
    images: [
      '/Images/Nature/DSC03974.jpg',
      '/Images/Nature/UAF01291 (2)-01.jpeg',
      '/Images/Nature/UAF08157.jpg.jpeg',
      '/Images/Nature/UAF08148.jpg.jpeg',
      '/Images/Nature/lovely.png',
      '/Images/Nature/Picsart_24-08-16_06-42-29-036.jpg.jpeg',
      '/Images/Nature/behance_project_1773347906399.jpg.jpeg',
      '/Images/Nature/UAF08026.jpg',
      '/Images/Nature/IMG_20220218_092102.jpg',
    ],
  },
  {
    id: 'bw',
    no: 'Set 03',
    title: 'Black & White',
    countLabel: '06 Images',
    body: 'Portrait and street work, shot and finished in monochrome.',
    images: [
      '/Images/bw/IMG_6640.jpg.jpeg',
      '/Images/bw/DSC05538.jpg',
      '/Images/bw/DSC05541.jpg',
      '/Images/bw/DSC00124-04.jpeg',
      '/Images/bw/UAF01301.jpg',
      '/Images/bw/1.jpg',
    ],
  },
]

export type FilmStillGroup = { title: string; frames: FrameItem[] }

export const filmStillGroups: FilmStillGroup[] = [
  { title: 'Gumaan', frames: gumaanFrames },
  { title: 'Mismatched', frames: mismatchedFrames },
  { title: 'Brand Film', frames: brandFrames },
  { title: 'Akhri Kheyl', frames: akhriFrames },
  { title: 'Dawn to Rise', frames: dawnFrames },
  { title: 'Kashmir', frames: kashmirFrames },
  { title: 'Fairy Meadows', frames: fairyFrames },
  { title: 'Khalal', frames: khalalFrames },
]

export const ledger = [
  { key: 'Directed by', value: 'Usama Akbar', accent: true },
  { key: 'Cinematography', value: 'Usama Akbar Films' },
  {
    key: 'Produced for',
    value: 'Matthew Hunt',
    sub: 'San Antonio, Texas — United States',
  },
  {
    key: 'Format',
    value: 'Brand Film',
    sub: 'Commercial commission, shot and graded in-house.',
  },
]
