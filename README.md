# usamakbarfilms

Vite + React + TypeScript + Tailwind v4. Reusable components pulled from the existing static site.

## Run

```bash
cd ~/Desktop/react-app
npm install
npm run dev
```

Images and video are served from `~/Desktop/web material`. Logo and footer `intro.mp4` come from `public/`. The Black & White folder on disk is named `b:w`; the app maps `/Images/bw/` to it automatically.

## Scripts

- `npm run dev` — local server
- `npm run build` — typecheck + production build
- `npm run preview` — preview the build (media middleware still runs)

## Layout

```
src/
  components/ui/        primitives (logo, type, plates, reel, player, masonry…)
  components/layout/    header, footer, page shell
  components/sections/  showreel, spotlight, services, trailer, ribbon…
  pages/                Home, Direction, Cinematography, Photography
  data/site.ts          all copy and media paths
```
