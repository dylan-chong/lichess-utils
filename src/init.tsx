import { signal } from '@preact/signals-core'
import { setupAutoSave, loadSettings } from './settings/settingsStore'
import { waitForElement } from './dom/boardReader'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './dom/boardObserver'
import { createFlashOverlay, destroyFlashOverlay } from './dom/overlays/flash'
import { createDividers, destroyDividers } from './dom/overlays/dividers'
import { setupDividersEffect } from './effects/onDividers'
import { setupKeyboardCommands, teardownKeyboardCommands } from './commands/keyboardInput'
import { createRoot, destroyRoot } from './components/root'
import { DOM_SELECTORS } from './constants'
import { createDiv, querySelector, appendChild } from './dom/dom'

export async function init() {
  // Wait for lichess to load the board
  await waitForElement(DOM_SELECTORS.KEYBOARD_MOVE)

  // Initialize settings
  loadSettings()
  setupAutoSave()

  // Create shared board change signal
  const boardChanged = signal(0)

  // Create DOM state
  const flashState = createFlashOverlay()
  const dividersState = createDividers()
  const boardObserverState = createBoardObserver(boardChanged)

  // Start observer
  startBoardObserver(boardObserverState)

  // Set up effects
  const cleanupDividers = setupDividersEffect(dividersState)

  // Set up commands
  setupKeyboardCommands()

  // Mount Preact UI
  const mountPoint = createDiv()
  const keyboardMove = querySelector(DOM_SELECTORS.KEYBOARD_MOVE)
  if (keyboardMove) {
    appendChild(keyboardMove, mountPoint)
  }
  createRoot(boardChanged, mountPoint)

  // Return cleanup function
  return () => {
    cleanupDividers()
    stopBoardObserver(boardObserverState)
    destroyFlashOverlay(flashState)
    destroyDividers(dividersState)
    teardownKeyboardCommands()
    destroyRoot(mountPoint)
  }
}
