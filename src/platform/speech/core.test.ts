import { beforeEach, describe, expect, it } from 'vitest'
import {
  cancel,
  createUtterance,
  getSpeechSynthesis,
  getSpeechSynthesisUtterance,
  speak,
} from './core'

describe('speech core', () => {
  beforeEach(() => {
    // Mock the global SpeechSynthesisUtterance for test environment
    global.SpeechSynthesisUtterance = class {
      text = ''
      constructor(text: string) {
        this.text = text
      }
    } as any
  })

  it('getSpeechSynthesis returns window.speechSynthesis', () => {
    const result = getSpeechSynthesis()
    expect(result).toBe(window.speechSynthesis)
  })

  it('getSpeechSynthesisUtterance returns a constructor function', () => {
    const result = getSpeechSynthesisUtterance()
    expect(typeof result).toBe('function')
  })

  it('createUtterance creates an instance using the provided constructor', () => {
    const MockUtterance = class {
      text = ''
      constructor(text: string) {
        this.text = text
      }
    } as any

    const utterance = createUtterance(MockUtterance, 'test')
    expect(utterance).toBeInstanceOf(MockUtterance)
    expect(utterance.text).toBe('test')
  })

  it('speak calls synthesis.speak with utterance', () => {
    const mockSpeak = { called: false, calledWith: null as any }
    const mockSynthesis = {
      speak: (utt: any) => {
        mockSpeak.called = true
        mockSpeak.calledWith = utt
      },
    } as any

    const mockUtterance = { text: 'test' } as any
    speak(mockSynthesis, mockUtterance)

    expect(mockSpeak.called).toBe(true)
    expect(mockSpeak.calledWith).toBe(mockUtterance)
  })

  it('cancel calls synthesis.cancel', () => {
    let cancelCalled = false
    const mockSynthesis = {
      cancel: () => {
        cancelCalled = true
      },
    } as any

    cancel(mockSynthesis)
    expect(cancelCalled).toBe(true)
  })
})
