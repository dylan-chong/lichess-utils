import { signal } from '@preact/signals-core'
import { setupBlurEffect } from './application/effects/onBlur'
import { setupDividersEffect } from './application/effects/onDividers'
import { setupFlashEffect } from './application/effects/onFlash'
import { createFlashLoopState } from './application/handlers/handleFlash'
import { setupKeyboardCommands, teardownKeyboardCommands } from './application/input/keyboardInput'
import {
  createBoardObserver,
  startBoardObserver,
  stopBoardObserver,
} from './application/observers/observerState'
import {
  createSettingsStore,
  loadSettings,
  setupAutoSave,
} from './application/settings/settingsStore'
import { DomSelector } from './constants/dom'
import { appendChild, createDiv, querySelector, waitForElement } from './platform/dom'
import { createRoot, destroyRoot } from './presentation/components/root'
import {
  createAnnotations,
  destroyAnnotations,
} from './presentation/non-preact-components/annotations'
import { createDividers, destroyDividers } from './presentation/non-preact-components/dividers'
import { createFlashOverlay, destroyFlashOverlay } from './presentation/non-preact-components/flash'

export async function init() {
  // Wait for lichess to load the board
  await waitForElement(DomSelector.KEYBOARD_MOVE)

  // Initialize settings
  const settings = createSettingsStore()
  loadSettings(settings)
  setupAutoSave(settings)

  // Create shared board change signal
  const boardChanged = signal(0)

  // Create DOM state
  const flashState = createFlashOverlay()
  const flashLoopState = createFlashLoopState()
  const dividersState = createDividers()
  const annotationsState = createAnnotations()
  const boardObserverState = createBoardObserver(boardChanged)

  // Start observer
  startBoardObserver(boardObserverState)

  // Set up effects
  const cleanupDividers = setupDividersEffect(dividersState, settings)
  const cleanupFlash = setupFlashEffect(flashState, flashLoopState, settings, boardChanged)
  const cleanupBlur = setupBlurEffect(settings)

  // Set up commands
  setupKeyboardCommands(settings, annotationsState)

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
    cleanupFlash()
    cleanupBlur()
    stopBoardObserver(boardObserverState)
    destroyFlashOverlay(flashState)
    destroyDividers(dividersState)
    destroyAnnotations(annotationsState)
    teardownKeyboardCommands()
    destroyRoot(mountPoint)
  }
}
