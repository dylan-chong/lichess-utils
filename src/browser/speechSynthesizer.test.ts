import { describe, it, expect, vi, beforeEach } from 'vitest'
import { speak, stopSpeaking, getRate, setRate } from './speechSynthesizer'

describe('speechSynthesizer', () => {
  beforeEach(() => {
    const mockSpeak = vi.fn()
    const mockCancel = vi.fn()

    vi.stubGlobal('speechSynthesis', {
      speak: mockSpeak,
      cancel: mockCancel,
    })

    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text = ''
      rate = 1
      constructor(text: string) {
        this.text = text
      }
    })
  })

  it('calls speechSynthesis.speak with correct text', () => {
    speak('test message', 1.0)

    expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'test message' })
    )
  })

  it('applies rate to utterance', () => {
    speak('test', 0.5)

    expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({ rate: 0.5 })
    )
  })

  it('stopSpeaking calls cancel', () => {
    stopSpeaking()
    expect(window.speechSynthesis.cancel).toHaveBeenCalled()
  })

  it('setRate stores the rate value', () => {
    setRate(1.5)
    expect(getRate()).toBe(1.5)
  })

  it('getRate returns the current rate', () => {
    setRate(2.0)
    expect(getRate()).toBe(2.0)
  })
})
