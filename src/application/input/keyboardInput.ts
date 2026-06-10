import { KEYBOARD_COMMAND_MAP, type KeyboardCommand } from '../../constants/commands'
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import type { Drawings3DState } from '../../presentation/3d/drawings3d'
import type { AnnotationsState } from '../../presentation/non-preact-components/annotations'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import { handleDrawCommand } from '../handlers/handleDrawCommand'
import { handleSpeechCommand } from '../handlers/handleSpeechCommand'
import type { SettingsStore } from '../settings/settingsStore'

interface InputElementWithCleanup extends HTMLInputElement {
  __keyboardCommandCleanup?: () => void
}

export function setupKeyboardCommands(
  settings: SettingsStore,
  annotationsState: AnnotationsState,
  customBoardState: CustomBoardState,
  drawings3DState: Drawings3DState
): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as InputElementWithCleanup | null
  if (!input) return

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    // Check for speech commands
    const command = KEYBOARD_COMMAND_MAP.get(value as KeyboardCommand)
    if (command) {
      handleSpeechCommand(command, settings)
      target.value = ''
      return
    }

    // Check for drawing commands
    if (value.startsWith('-')) {
      handleDrawCommand(value, annotationsState, customBoardState, drawings3DState)
      return
    }
  }

  input.addEventListener('input', handleInput)

  // Store cleanup function on the element for later removal
  input.__keyboardCommandCleanup = () => {
    input.removeEventListener('input', handleInput)
  }
}

export function teardownKeyboardCommands(): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as InputElementWithCleanup | null
  if (input?.__keyboardCommandCleanup) {
    input.__keyboardCommandCleanup()
    input.__keyboardCommandCleanup = undefined
  }
}
