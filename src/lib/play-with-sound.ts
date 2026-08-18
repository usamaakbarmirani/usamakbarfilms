/** Try unmuted playback; fall back to muted if the browser blocks it. */
export function playWithSound(video: HTMLVideoElement | null | undefined) {
  if (!video) return
  video.muted = false
  const play = video.play()
  if (play && play.catch) {
    play.catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })
  }
}
