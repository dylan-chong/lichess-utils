import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import { getRate, setRate, speak, stopSpeaking } from './speechSynthesizer'

const speechApi = mockModule(import('../platform/speechApi'))

describe('speechSynthesizer', () => {
  it('calls speechSynthesis.speak with correct text', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const mockUtterance = { text: '', rate: 1 } as SpeechSynthesisUtterance

    speechApi.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    speechApi.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    speechApi
      .expects('createUtterance')
      .withArgs(mockUtteranceClass, 'test message')
      .returns(mockUtterance)
    speechApi.expects('speak').withArgs(mockSynthesis, mockUtterance).returns(undefined)

    speak('test message', 1.0)
  })

  it('applies rate to utterance', () => {
    const mockSynthesis = {} as SpeechSynthesis
    const mockUtteranceClass = {} as typeof SpeechSynthesisUtterance
    const mockUtterance = { text: '', rate: 1 } as SpeechSynthesisUtterance

    speechApi.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    speechApi.expects('getSpeechSynthesisUtterance').withArgs().returns(mockUtteranceClass)
    speechApi.expects('createUtterance').withArgs(mockUtteranceClass, 'test').returns(mockUtterance)
    speechApi
      .expects('speak')
      .withArgs(mockSynthesis, { text: '', rate: 0.5 } as SpeechSynthesisUtterance)
      .returns(undefined)

    speak('test', 0.5)
  })

  it('stopSpeaking calls cancel', () => {
    const mockSynthesis = {} as SpeechSynthesis

    speechApi.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    speechApi.expects('cancel').withArgs(mockSynthesis).returns(undefined)

    stopSpeaking()
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
