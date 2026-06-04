import { SpeechCommand } from '../constants'
import { describe, it, expect, beforeEach } from 'vitest'
import { mockModule } from 'simone'

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
    input = document.querySelector('.keyboard-move input')!
  })

  it('handles speech command starting with p', () => {
    setupKeyboardCommands()

    handleSpeechCommand.expects('handleSpeechCommand').withArgs(SpeechCommand.WK).returns(undefined)

    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('')
  })

  it('handles stop command', () => {
    setupKeyboardCommands()

    handleSpeechCommand.expects('handleSpeechCommand').withArgs(SpeechCommand.STOP).returns(undefined)

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
})
