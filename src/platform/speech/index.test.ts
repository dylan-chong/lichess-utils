import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, expect, it, vi } from 'vitest'
import {
  getAvailableVoiceNames,
  onVoicesChanged,
  speakSegments,
  speakText,
  stopSpeaking,
} from './index'

const core = mockModule(import('./core'))

describe('speech high-level functions', () => {
  it('getAvailableVoiceNames returns the name of each available voice', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockVoices = [{ name: 'Alice' }, { name: 'Bob' }] as SpeechSynthesisVoice[]

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getVoices').withArgs(mockSynthesis).returns(mockVoices)

    expect(getAvailableVoiceNames()).toEqual(['Alice', 'Bob'])
  })

  it('onVoicesChanged registers the callback via core.onVoicesChanged', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const callback = () => {}

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('onVoicesChanged').withArgs(mockSynthesis, callback).returns(undefined)

    onVoicesChanged(callback)
  })

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

  it('speakText assigns the matching voice when voiceName is provided', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const mockUtterance = { rate: 0 } as SpeechSynthesisUtterance
    const aliceVoice = { name: 'Alice' } as SpeechSynthesisVoice

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'hello').returns(mockUtterance)
    core.expects('getVoices').withArgs(mockSynthesis).returns([aliceVoice])
    core.expects('speak').withArgs(mockSynthesis, mockUtterance).returns(undefined)

    speakText('hello', 1, 'Alice')

    expect(mockUtterance.voice).toBe(aliceVoice)
  })

  it('speakText leaves the default voice when voiceName does not match any voice', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const mockUtterance = { rate: 0 } as SpeechSynthesisUtterance

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'hello').returns(mockUtterance)
    core
      .expects('getVoices')
      .withArgs(mockSynthesis)
      .returns([{ name: 'Alice' } as SpeechSynthesisVoice])
    core.expects('speak').withArgs(mockSynthesis, mockUtterance).returns(undefined)

    speakText('hello', 1, 'Unknown Voice')

    expect(mockUtterance.voice).toBeUndefined()
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

    speakSegments(['first', 'second'], 1, signal(0.5))

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

    speakSegments(['first', 'second'], 1, signal(0.5))
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

    speakSegments(['only'], 1, signal(0.5))
    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    vi.useRealTimers()
  })

  it('assigns the matching voice to each segment utterance when voiceName is provided', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance
    const aliceVoice = { name: 'Alice' } as SpeechSynthesisVoice

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'only').returns(utteranceA)
    core.expects('getVoices').withArgs(mockSynthesis).returns([aliceVoice])
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['only'], 1, signal(0.5), undefined, 'Alice')

    expect(utteranceA.voice).toBe(aliceVoice)

    vi.useRealTimers()
  })

  it('calls onFinished after the last segment finishes speaking', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance
    const onFinished = vi.fn()

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'only').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['only'], 1, signal(0.5), onFinished)
    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    expect(onFinished).toHaveBeenCalledOnce()

    vi.useRealTimers()
  })

  it('does not call onFinished if the sequence is cancelled before finishing', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance
    const onFinished = vi.fn()

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'first').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['first', 'second'], 1, signal(0.5), onFinished)

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('cancel').withArgs(mockSynthesis).returns(undefined)
    stopSpeaking()

    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    expect(onFinished).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('uses the current signal value for each pause, reflecting mid-sequence changes', () => {
    vi.useFakeTimers()

    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const utteranceA = { rate: 0 } as SpeechSynthesisUtterance
    const utteranceB = { rate: 0 } as SpeechSynthesisUtterance
    const pauseLength = signal(0.5)

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'first').returns(utteranceA)
    core.expects('speak').withArgs(mockSynthesis, utteranceA).returns(undefined)

    speakSegments(['first', 'second'], 1, pauseLength)

    // Simulate the user changing the pause-length setting while the first segment is speaking.
    pauseLength.value = 2

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    core.expects('createUtterance').withArgs(mockUtteranceClass, 'second').returns(utteranceB)
    core.expects('speak').withArgs(mockSynthesis, utteranceB).returns(undefined)

    utteranceA.onend?.({} as SpeechSynthesisEvent)

    // The old 0.5s pause should not be enough now that the setting changed to 2s.
    vi.advanceTimersByTime(500)
    expect(utteranceB.rate).toBe(0)

    vi.advanceTimersByTime(1500)
    expect(utteranceB.rate).toBe(1)

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

    speakSegments(['first', 'second'], 1, signal(0.5))

    core.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    core.expects('cancel').withArgs(mockSynthesis).returns(undefined)
    stopSpeaking()

    utteranceA.onend?.({} as SpeechSynthesisEvent)
    vi.advanceTimersByTime(500)

    vi.useRealTimers()
  })
})
