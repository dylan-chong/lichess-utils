import { render } from 'preact'
import { signal } from '@preact/signals-core'
import { setupAutoSave, loadSettings } from './settings/settingsStore'
import { waitForElement } from './dom/boardReader'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './dom/boardObserver'
import { createFlashOverlay, destroyFlashOverlay } from './dom/overlays/flash'
import { createDividers, destroyDividers } from './dom/overlays/dividers'
import { setupDividersEffect } from './effects/onDividers'
import { setupKeyboardCommands, teardownKeyboardCommands } from './commands/keyboardInput'
import { ControlPanel } from './components/ControlPanel'

async function init() {
  // Wait for lichess to load the board
  await waitForElement('.keyboard-move')

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
  const mountPoint = document.createElement('div')
  const keyboardMove = document.querySelector('.keyboard-move')
  keyboardMove?.appendChild(mountPoint)
  render(<ControlPanel boardChanged={boardChanged} />, mountPoint)

  // Return cleanup function
  return () => {
    cleanupDividers()
    stopBoardObserver(boardObserverState)
    destroyFlashOverlay(flashState)
    destroyDividers(dividersState)
    teardownKeyboardCommands()
    render(null, mountPoint)
  }
}

// Start the application
init().catch(console.error)
