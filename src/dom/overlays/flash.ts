export interface FlashOverlayState {
  overlay: HTMLElement
}

export function createFlashOverlay(): FlashOverlayState {
  const overlay = document.createElement('div')
  overlay.className = 'userscript-flash-overlay'
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 1000;
    display: none;
  `

  const container = document.querySelector('cg-container')
  container?.appendChild(overlay)

  return { overlay }
}

export function showFlash(state: FlashOverlayState): void {
  state.overlay.style.display = 'block'
}

export function hideFlash(state: FlashOverlayState): void {
  state.overlay.style.display = 'none'
}

export function destroyFlashOverlay(state: FlashOverlayState): void {
  state.overlay.remove()
}
