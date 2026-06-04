import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import { speakText, stopSpeaking } from './index'

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
