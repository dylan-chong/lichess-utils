import { DomSelector, KEYBOARD_COMMAND_MAP, type KeyboardCommand } from '../constants'
import { querySelector } from '../dom/dom'
import { handleSpeechCommand } from '../handlers/handleSpeechCommand'

interface InputElementWithCleanup extends HTMLInputElement {
  __keyboardCommandCleanup?: () => void
}

export function setupKeyboardCommands(): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as InputElementWithCleanup | null
  if (!input) return

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    // Check for speech commands
    const command = KEYBOARD_COMMAND_MAP.get(value as KeyboardCommand)
    if (command) {
      handleSpeechCommand(command)
      target.value = ''
      return
    }

    // Check for drawing commands (handled elsewhere)
    if (value.startsWith('-')) {
      // Will be handled by drawing handler
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
