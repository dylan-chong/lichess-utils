import { signal } from '@preact/signals-core'
import { createDividers, destroyDividers } from './adapters-overlays/dividers'
import { createFlashOverlay, destroyFlashOverlay } from './adapters-overlays/flash'
import { setupDividersEffect } from './application-effects/onDividers'
import { setupKeyboardCommands, teardownKeyboardCommands } from './application-input/keyboardInput'
import {
  createBoardObserver,
  startBoardObserver,
  stopBoardObserver,
} from './application-observers/observerState'
import { createSettingsStore } from './application-settings/settingsStore'
import { DomSelector } from './constants'
import { appendChild, createDiv, querySelector, waitForElement } from './platform/dom'
import { createRoot, destroyRoot } from './presentation/components/root'

export async function init() {
  // Wait for lichess to load the board
  await waitForElement(DomSelector.KEYBOARD_MOVE)

  // Initialize settings
  const settings = createSettingsStore()
  settings.loadSettings()
  settings.setupAutoSave()

  // Create shared board change signal
  const boardChanged = signal(0)

  // Create DOM state
  const flashState = createFlashOverlay()
  const dividersState = createDividers()
  const boardObserverState = createBoardObserver(boardChanged)

  // Start observer
  startBoardObserver(boardObserverState)

  // Set up effects
  const cleanupDividers = setupDividersEffect(dividersState, settings)

  // Set up commands
  setupKeyboardCommands(settings)

  // Mount Preact UI
  const mountPoint = createDiv()
  const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE)
  if (keyboardMove) {
    appendChild(keyboardMove, mountPoint)
  }
  createRoot(boardChanged, mountPoint, settings)

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
