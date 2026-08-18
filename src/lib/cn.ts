import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Encode each path segment so filenames with spaces still resolve. */
export function asset(path: string) {
  return path
    .split('/')
    .map((part, i) => (i === 0 && part === '' ? '' : encodeURIComponent(part)))
    .join('/')
}
