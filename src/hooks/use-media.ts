export function useReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useIsTouch() {
  return window.matchMedia('(hover: none)').matches
}
