import { mockModule } from 'simone'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SpeechCommand } from '../../constants/commands'
import { createSettingsStore } from '../settings/settingsStore'
import {
  MEDITATION_TOTAL_MS,
  MEDITATION_WAIT_MS,
  createMeditationLoopState,
  startMeditationLoop,
  stopMeditationLoop,
} from './handleMeditation'

const speechHandler = mockModule(import('./handleSpeechCommand'))
const speechCore = mockModule(import('../../platform/speech/core'))

describe('handleMeditation', () => {
  let settings: ReturnType<typeof createSettingsStore>
  let mockSynthesis: SpeechSynthesis

  function expectStopSpeaking() {
    speechCore.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    speechCore.expects('cancel').withArgs(mockSynthesis).returns(undefined)
  }

  beforeEach(() => {
    settings = createSettingsStore()
    mockSynthesis = {} as SpeechSynthesis
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createMeditationLoopState', () => {
    it('returns state with null interval and zero elapsed', () => {
      const state = createMeditationLoopState()
      expect(state.intervalId).toBe(null)
      expect(state.elapsedMs).toBe(0)
    })
  })

  describe('startMeditationLoop', () => {
    it('speaks immediately and repeats every wait interval', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(SpeechCommand.ALL, settings)
        .returns(undefined)
      startMeditationLoop(loopState, settings)

      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(SpeechCommand.ALL, settings)
        .returns(undefined)
      vi.advanceTimersByTime(MEDITATION_WAIT_MS)
    })

    it('stops and disables setting after total duration elapses', () => {
      const loopState = createMeditationLoopState()
      settings.meditationEnabled.value = true

      expectStopSpeaking()
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(SpeechCommand.ALL, settings)
        .returns(undefined)
      startMeditationLoop(loopState, settings)

      const ticks = MEDITATION_TOTAL_MS / MEDITATION_WAIT_MS
      for (let i = 1; i < ticks; i++) {
        speechHandler
          .expects('handleSpeechCommand')
          .withArgs(SpeechCommand.ALL, settings)
          .returns(undefined)
        vi.advanceTimersByTime(MEDITATION_WAIT_MS)
      }

      expect(settings.meditationEnabled.value).toBe(true)

      vi.advanceTimersByTime(MEDITATION_WAIT_MS)
      expect(settings.meditationEnabled.value).toBe(false)
    })

    it('stops existing loop before starting a new one', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(SpeechCommand.ALL, settings)
        .returns(undefined)
      startMeditationLoop(loopState, settings)
      const firstIntervalId = loopState.intervalId

      expectStopSpeaking()
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(SpeechCommand.ALL, settings)
        .returns(undefined)
      startMeditationLoop(loopState, settings)

      expect(loopState.intervalId !== firstIntervalId).toBe(true)
    })
  })

  describe('stopMeditationLoop', () => {
    it('clears interval and stops speaking', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(SpeechCommand.ALL, settings)
        .returns(undefined)
      startMeditationLoop(loopState, settings)

      expectStopSpeaking()
      stopMeditationLoop(loopState)

      expect(loopState.intervalId).toBe(null)
    })

    it('does nothing to interval when already null', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      stopMeditationLoop(loopState)

      expect(loopState.intervalId).toBe(null)
    })
  })
})
