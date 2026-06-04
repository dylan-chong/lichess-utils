import { handleSpeechCommand } from '../handlers/handleSpeechCommand'

let inputListener: ((e: Event) => void) | null = null

const SPEECH_COMMANDS = new Map([
  ['pwk', 'wk'],
  ['pwq', 'wq'],
  ['pbk', 'bk'],
  ['pbq', 'bq'],
  ['pa', 'all'],
  ['pww', 'white'],
  ['pbb', 'black'],
  ['pss', 'stop'],
])

export function setupKeyboardCommands(): void {
  const input = document.querySelector('.keyboard-move input') as HTMLInputElement
  if (!input) return

  inputListener = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    // Check for speech commands
    if (SPEECH_COMMANDS.has(value)) {
      const command = SPEECH_COMMANDS.get(value)!
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

  input.addEventListener('input', inputListener)
}

export function teardownKeyboardCommands(): void {
  if (!inputListener) return

  const input = document.querySelector('.keyboard-move input') as HTMLInputElement
  if (input) {
    input.removeEventListener('input', inputListener)
  }
  inputListener = null
}
