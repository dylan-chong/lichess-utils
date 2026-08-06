import { mockModule } from 'simone'
import { describe, expect, it, vi } from 'vitest'
import { speakSegments, speakText, stopSpeaking } from './index'

const core = mockModule(import('./core'))

describe('speech high-level functions', () => {
  it('speakText creates utterance with correct text and rate', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const mockUtterance = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core
      .expects('createUtterance')
      .withArgs(mockUtteranceClass, 'hello world')
      .returns(mockUtterance)
    core.expects('speak').withArgs(mockSynthesis, mockUtterance).returns(undefined)

    speakText('hello world', 1.5)

    expect(mockUtterance.rate).toBe(1.5)
  })

  it('speakText applies different rates', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const mockUtterance = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'test').returns(mockUtterance)
    core.expects('speak').withArgs(mockSynthesis, mockUtterance).returns(undefined)

    speakText('test', 2.0)

    expect(mockUtterance.rate).toBe(2.0)
  })

  it('stopSpeaking calls cancel on speech synthesis', () => {
    const mockSynthesis = {} as SpeechSynthesis

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('cancel').withArgs(mockSynthesis).returns(undefined)

    stopSpeaking()
  })
})

describe('speakSegments', () => {
  it('speaks each segment as its own utterance with a delay between them', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance
    const utteranceB = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'first').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['first', 'second'], 1, 0.5)

    expect(utteranceA.rate).toBe(1)

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'second').returns(utteranceB)
    core.expects('speak').withArgs(mockSynthesis, utteranceB).returns(undefined)

    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    expect(utteranceB.rate).toBe(1)

    vi.useRealTimers()
  })

  it('stopSpeaking cancels a pending segment sequence', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'first').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['first', 'second'], 1, 0.5)
    utteranceA.onend?.({} as SpeechSynthesisEvent)

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('cancel').withArgs(mockSynthesis).returns(undefined)

    stopSpeaking()
    vi.advanceTimersByTime(500)

    vi.useRealTimers()
  })

  it('stops after the last segment without scheduling another timeout', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'only').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['only'], 1, 0.5)
    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    vi.useRealTimers()
  })

  it('ignores a stale onend firing after cancellation', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'first').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['first', 'second'], 1, 0.5)

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('cancel').withArgs(mockSynthesis).returns(undefined)
    stopSpeaking()

    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    vi.useRealTimers()
  })
})
