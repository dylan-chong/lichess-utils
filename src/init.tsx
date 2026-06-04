import { signal } from '@preact/signals-core'
import { setupKeyboardCommands, teardownKeyboardCommands } from './commands/keyboardInput'
import { createRoot, destroyRoot } from './components/root'
import { DomSelector } from './constants'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './dom/boardObserver'
import { waitForElement } from './dom/boardReader'
import { appendChild, createDiv, querySelector } from './dom/dom'
import { createDividers, destroyDividers } from './dom/overlays/dividers'
import { createFlashOverlay, destroyFlashOverlay } from './dom/overlays/flash'
import { setupDividersEffect } from './effects/onDividers'
import { loadSettings, setupAutoSave } from './settings/settingsStore'

export async function init() {
  // Wait for lichess to load the board
  await waitForElement(DomSelector.KEYBOARD_MOVE)

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
  const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE)
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
