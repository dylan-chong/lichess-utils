export function requestAnimation(callback: FrameRequestCallback): number {
  return requestAnimationFrame(callback)
}

export function cancelAnimation(id: number): void {
  cancelAnimationFrame(id)
}
