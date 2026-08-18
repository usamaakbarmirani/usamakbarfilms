export function ViewfinderCorners() {
  const base =
    'masonry__corner pointer-events-none absolute z-5 size-3 border border-white/45 opacity-0 transition-[opacity,border-color] duration-300 group-hover:border-accent group-hover:opacity-100'
  return (
    <>
      <span className={`${base} top-2.5 left-2.5 border-r-0 border-b-0`} />
      <span className={`${base} top-2.5 right-2.5 border-b-0 border-l-0`} />
      <span className={`${base} bottom-2.5 left-2.5 border-t-0 border-r-0`} />
      <span className={`${base} right-2.5 bottom-2.5 border-t-0 border-l-0`} />
    </>
  )
}
