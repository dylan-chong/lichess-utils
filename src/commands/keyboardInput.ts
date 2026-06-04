import { handleSpeechCommand } from '../handlers/handleSpeechCommand'
import { KEYBOARD_COMMAND_MAP, DOM_SELECTORS } from '../constants'

export function setupKeyboardCommands(): void {
  const input = document.querySelector(DOM_SELECTORS.KEYBOARD_INPUT) as HTMLInputElement
  if (!input) return

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    // Check for speech commands
    const command = KEYBOARD_COMMAND_MAP.get(value as any)
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
  ;(input as any).__keyboardCommandCleanup = () => {
    input.removeEventListener('input', handleInput)
  }
}

export function teardownKeyboardCommands(): void {
  const input = document.querySelector(DOM_SELECTORS.KEYBOARD_INPUT) as HTMLInputElement
  if (input && (input as any).__keyboardCommandCleanup) {
    ;(input as any).__keyboardCommandCleanup()
    delete (input as any).__keyboardCommandCleanup
  }
}
