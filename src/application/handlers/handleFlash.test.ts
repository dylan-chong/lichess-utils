import { mockModule } from 'simone'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { FlashOverlayState } from '../../presentation/non-preact-components/flash'
import { createSettingsStore } from '../settings/settingsStore'
import { createFlashLoopState, startFlashLoop, stopFlashLoop, triggerFlash } from './handleFlash'

const flash = mockModule(import('../../presentation/non-preact-components/flash'))

describe('handleFlash', () => {
  let mockState: FlashOverlayState
  let settings: ReturnType<typeof createSettingsStore>

  beforeEach(() => {
    mockState = {
      overlay: document.createElement('div'),
    }
    settings = createSettingsStore()
    settings.flashDuration.value = 500
    settings.flashInterval.value = 1
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createFlashLoopState', () => {
    it('returns state with null intervals and timeouts', () => {
      const state = createFlashLoopState()
      expect(state.intervalId).toBe(null)
      expect(state.timeoutId).toBe(null)
    })
  })

  describe('triggerFlash', () => {
    it('calls hideFlash immediately then showFlash after duration', () => {
      const loopState = createFlashLoopState()

      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      triggerFlash(mockState, loopState, settings)

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      vi.advanceTimersByTime(500)
      expect(loopState.timeoutId).toBe(null)
    })

    it('uses flash duration from settings', () => {
      const loopState = createFlashLoopState()
      settings.flashDuration.value = 300

      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      triggerFlash(mockState, loopState, settings)

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      vi.advanceTimersByTime(300)
    })

    it('clears existing timeout before setting new one', () => {
      const loopState = createFlashLoopState()

      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      triggerFlash(mockState, loopState, settings)

      const firstTimeoutId = loopState.timeoutId

      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      triggerFlash(mockState, loopState, settings)

      expect(loopState.timeoutId !== firstTimeoutId).toBe(true)

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      vi.advanceTimersByTime(500)
    })
  })

  describe('startFlashLoop', () => {
    it('calls showFlash initially and hideFlash for first trigger', () => {
      const loopState = createFlashLoopState()

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      startFlashLoop(mockState, loopState, settings)

      expect(loopState.intervalId).toBeTypeOf('object')
    })

    it('sets up interval with correct timing', () => {
      const loopState = createFlashLoopState()
      settings.flashInterval.value = 2

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      startFlashLoop(mockState, loopState, settings)

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      vi.advanceTimersByTime(500)

      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      vi.advanceTimersByTime(1500)

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      vi.advanceTimersByTime(500)
    })

    it('stops existing flash loop before starting new one', () => {
      const loopState = createFlashLoopState()

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      startFlashLoop(mockState, loopState, settings)

      const firstIntervalId = loopState.intervalId

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      startFlashLoop(mockState, loopState, settings)

      expect(loopState.intervalId !== firstIntervalId).toBe(true)
    })
  })

  describe('stopFlashLoop', () => {
    it('clears interval and timeout and sets to null', () => {
      const loopState = createFlashLoopState()

      flash.expects('showFlash').withArgs(mockState).returns(undefined)
      flash.expects('hideFlash').withArgs(mockState).returns(undefined)
      startFlashLoop(mockState, loopState, settings)

      expect(loopState.intervalId).toBeTypeOf('object')
      expect(loopState.timeoutId).toBeTypeOf('object')

      stopFlashLoop(loopState)

      expect(loopState.intervalId).toBe(null)
      expect(loopState.timeoutId).toBe(null)
    })

    it('does nothing when both are already null', () => {
      const loopState = createFlashLoopState()

      stopFlashLoop(loopState)

      expect(loopState.intervalId).toBe(null)
      expect(loopState.timeoutId).toBe(null)
    })
  })
})
