import { CssClass, CssDisplay, DomSelector } from '../../constants'
import { appendChild, createDiv, querySelector } from '../../platform/dom'

export interface FlashOverlayState {
  overlay: HTMLElement
}

export function createFlashOverlay(): FlashOverlayState {
  const overlay = createDiv()
  overlay.className = CssClass.USERSCRIPT_FLASH
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

  const container = querySelector(DomSelector.CONTAINER)
  if (container) {
    appendChild(container, overlay)
  }

  return { overlay }
}

export function showFlash(state: FlashOverlayState): void {
  state.overlay.style.display = CssDisplay.BLOCK
}

export function hideFlash(state: FlashOverlayState): void {
  state.overlay.style.display = CssDisplay.NONE
}

export function destroyFlashOverlay(state: FlashOverlayState): void {
  state.overlay.remove()
}
