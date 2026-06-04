export function shouldFlash(
  lastFlashTime: number,
  currentTime: number,
  intervalSeconds: number
): boolean {
  const elapsedMs = currentTime - lastFlashTime
  const intervalMs = intervalSeconds * 1000
  return elapsedMs >= intervalMs
}

export function getNextFlashTime(currentTime: number, intervalSeconds: number): number {
  return currentTime + intervalSeconds * 1000
}
