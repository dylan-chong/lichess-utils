import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { SpeechCommand } from '../constants'

const handleSpeechCommand = mockModule(import('../handlers/handleSpeechCommand'))
const { setupKeyboardCommands, teardownKeyboardCommands } = await import('./keyboardInput')

describe('keyboardInput', () => {
  let input: HTMLInputElement

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="keyboard-move">
        <input type="text" />
      </div>
    `
    const elem = document.querySelector('.keyboard-move input')
    if (!elem) throw new Error('Input element not found')
    input = elem as HTMLInputElement
  })

  it('executes speech command and clears input when command is entered', () => {
    setupKeyboardCommands()

    handleSpeechCommand.expects('handleSpeechCommand').withArgs(SpeechCommand.WK).returns(undefined)

    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('')
  })

  it('executes stop command when pss is entered', () => {
    setupKeyboardCommands()

    handleSpeechCommand
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.STOP)
      .returns(undefined)

    input.value = 'pss'
    input.dispatchEvent(new Event('input'))
  })

  it('ignores non-command input', () => {
    setupKeyboardCommands()

    input.value = 'e4'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('e4')
  })

  it('ignores drawing commands (starting with -)', () => {
    setupKeyboardCommands()

    input.value = '-e4'
    input.dispatchEvent(new Event('input'))

    // Drawing commands are left untouched (will be handled elsewhere)
    expect(input.value).toBe('-e4')
  })

  it('stops listening after teardown', () => {
    setupKeyboardCommands()
    teardownKeyboardCommands()

    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('pwk')
  })

  it('returns early without error when input element is missing', () => {
    document.body.innerHTML = '' // No input element
    expect(() => setupKeyboardCommands()).not.toThrow()
  })
})
