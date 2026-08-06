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
import type { handleSpeechCommand as HandleSpeechCommand } from './handleSpeechCommand'

const speechHandler = mockModule(import('./handleSpeechCommand'))
const speechCore = mockModule(import('../../platform/speech/core'))

describe('handleMeditation', () => {
  let settings: ReturnType<typeof createSettingsStore>
  let mockSynthesis: SpeechSynthesis
  let handleSpeechCommandSpy: ReturnType<typeof vi.fn>

  function expectStopSpeaking() {
    speechCore.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    speechCore.expects('cancel').withArgs(mockSynthesis).returns(undefined)
  }

  beforeEach(() => {
    settings = createSettingsStore()
    mockSynthesis = {} as SpeechSynthesis
    vi.useFakeTimers()

    // startMeditationLoop passes a fresh closure to handleSpeechCommand each call,
    // so we bypass simone's exact-args matching and spy on the export directly.
    handleSpeechCommandSpy = vi.fn()
    ;(
      speechHandler as unknown as { handleSpeechCommand: typeof HandleSpeechCommand }
    ).handleSpeechCommand = handleSpeechCommandSpy as unknown as typeof HandleSpeechCommand
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function finishLatestSpeech(): void {
    const calls = handleSpeechCommandSpy.mock.calls
    const onFinished = calls[calls.length - 1]?.[2]
    onFinished?.()
  }

  describe('createMeditationLoopState', () => {
    it('returns state with null timeout and zero elapsed', () => {
      const state = createMeditationLoopState()
      expect(state.timeoutId).toBe(null)
      expect(state.elapsedMs).toBe(0)
    })
  })

  describe('startMeditationLoop', () => {
    it('speaks immediately, then waits 1 minute after speech ends before speaking again', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      startMeditationLoop(loopState, settings)

      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(1)
      expect(handleSpeechCommandSpy).toHaveBeenCalledWith(
        SpeechCommand.ALL,
        settings,
        expect.any(Function)
      )

      // Advancing time without speech finishing should not trigger another speak.
      vi.advanceTimersByTime(MEDITATION_WAIT_MS * 10)
      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(1)

      finishLatestSpeech()

      // The next speak should not happen until the wait elapses after finishing.
      vi.advanceTimersByTime(MEDITATION_WAIT_MS - 1)
      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(1)
      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(2)
    })

    it('stops and disables setting after total duration elapses', () => {
      const loopState = createMeditationLoopState()
      settings.meditationEnabled.value = true

      expectStopSpeaking()
      startMeditationLoop(loopState, settings)

      const ticks = MEDITATION_TOTAL_MS / MEDITATION_WAIT_MS
      for (let i = 1; i < ticks; i++) {
        finishLatestSpeech()
        vi.advanceTimersByTime(MEDITATION_WAIT_MS)
      }

      expect(settings.meditationEnabled.value).toBe(true)
      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(ticks)

      finishLatestSpeech()
      expect(settings.meditationEnabled.value).toBe(false)

      // No further speech should be scheduled once meditation has stopped.
      vi.advanceTimersByTime(MEDITATION_WAIT_MS * 2)
      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(ticks)
    })

    it('stops existing loop before starting a new one', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      startMeditationLoop(loopState, settings)
      const firstTimeoutId = loopState.timeoutId

      expectStopSpeaking()
      startMeditationLoop(loopState, settings)

      expect(loopState.timeoutId !== firstTimeoutId || loopState.timeoutId === null).toBe(true)
    })
  })

  describe('stopMeditationLoop', () => {
    it('clears timeout and stops speaking', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      startMeditationLoop(loopState, settings)
      finishLatestSpeech()

      expectStopSpeaking()
      stopMeditationLoop(loopState)

      expect(loopState.timeoutId).toBe(null)

      // No further speech should happen once stopped.
      vi.advanceTimersByTime(MEDITATION_WAIT_MS * 2)
      expect(handleSpeechCommandSpy).toHaveBeenCalledTimes(1)
    })

    it('does nothing to timeout when already null', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      stopMeditationLoop(loopState)

      expect(loopState.timeoutId).toBe(null)
    })
  })
})
