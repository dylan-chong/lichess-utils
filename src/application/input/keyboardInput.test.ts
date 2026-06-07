import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { SpeechCommand } from '../../constants/commands'
import { createSettingsStore } from '../settings/settingsStore'
import { setupKeyboardCommands, teardownKeyboardCommands } from './keyboardInput'

const handleSpeechCommand = mockModule(import('../handlers/handleSpeechCommand'))
const handleDrawCommand = mockModule(import('../handlers/handleDrawCommand'))

describe('keyboardInput', () => {
  let input: HTMLInputElement
  let settings: ReturnType<typeof createSettingsStore>
  let mockAnnotationsState: { svg: SVGSVGElement }

  beforeEach(() => {
    settings = createSettingsStore()
    mockAnnotationsState = {
      svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    }
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
    setupKeyboardCommands(settings, mockAnnotationsState)

    handleSpeechCommand
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.WK, settings)
      .returns(undefined)

    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('')
  })

  it('executes stop command when pss is entered', () => {
    setupKeyboardCommands(settings, mockAnnotationsState)

    handleSpeechCommand
      .expects('handleSpeechCommand')
      .withArgs(SpeechCommand.STOP, settings)
      .returns(undefined)

    input.value = 'pss'
    input.dispatchEvent(new Event('input'))
  })

  it('ignores non-command input', () => {
    setupKeyboardCommands(settings, mockAnnotationsState)

    input.value = 'e4'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('e4')
  })

  it('draws annotations when input starts with hyphen', () => {
    setupKeyboardCommands(settings, mockAnnotationsState)

    handleDrawCommand
      .expects('handleDrawCommand')
      .withArgs('-e4', mockAnnotationsState)
      .returns(undefined)

    input.value = '-e4'
    input.dispatchEvent(new Event('input'))
  })

  it('stops listening after teardown', () => {
    setupKeyboardCommands(settings, mockAnnotationsState)
    teardownKeyboardCommands()

    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))

    expect(input.value).toBe('pwk')
  })

  it('teardown does nothing when setup was not called', () => {
    expect(() => teardownKeyboardCommands()).not.toThrow()
  })

  it('returns early without error when input element is missing', () => {
    document.body.innerHTML = '' // No input element
    expect(() => setupKeyboardCommands(settings, mockAnnotationsState)).not.toThrow()
  })
})
