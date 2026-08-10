import { mockModule } from 'simone'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PlayerColor, Quadrant } from '../../constants/chess'
import { getQuadrantAtScreenPosition } from '../../domain/chess/quadrantLayout'
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
const boardReader = mockModule(import('../services/boardReader/reader'))
const wakeLock = mockModule(import('../../platform/wakeLock'))

describe('handleMeditation', () => {
  let settings: ReturnType<typeof createSettingsStore>
  let mockSynthesis: SpeechSynthesis
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callbacks: any[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { match } = require('simone') as any

  function expectStopSpeaking() {
    speechCore.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
    speechCore.expects('cancel').withArgs(mockSynthesis).returns(undefined)
  }

  beforeEach(() => {
    settings = createSettingsStore()
    mockSynthesis = {} as SpeechSynthesis
    vi.useFakeTimers()
    callbacks.length = 0
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createMeditationLoopState', () => {
    it('returns state with null timeout, zero elapsed, zero stepIndex, and null wakeLock', () => {
      const state = createMeditationLoopState()
      expect(state.timeoutId).toBe(null)
      expect(state.elapsedMs).toBe(0)
      expect(state.stepIndex).toBe(0)
      expect(state.wakeLock).toBe(null)
    })
  })

  describe('startMeditationLoop', () => {
    it('runs full meditation: intro quadrants → repeating board → duration cutoff', () => {
      const loopState = createMeditationLoopState()
      settings.meditationEnabled.value = true

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(false)

      const ticks = MEDITATION_TOTAL_MS / MEDITATION_WAIT_MS

      // Setup expectations for all ticks (8 intro + remaining board reads)
      for (let i = 0; i < ticks; i++) {
        if (i > 0) {
          boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
        }
        speechHandler
          .expects('handleSpeechCommand')
          .withArgs(expect.any(String), settings, match.fn())
          .calls((_command: any, _settings: any, callback: any): any => {
            callbacks.push(callback)
          })
      }

      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      startMeditationLoop(loopState, settings)

      // Run through all 20 ticks
      for (let i = 1; i < ticks; i++) {
        callbacks[i - 1]?.()
        vi.advanceTimersByTime(MEDITATION_WAIT_MS)
      }

      expect(settings.meditationEnabled.value).toBe(true)
      expect(loopState.stepIndex).toBe(ticks - 1)

      // Final tick disables meditation
      callbacks[ticks - 1]?.()
      expect(settings.meditationEnabled.value).toBe(false)
    })

    it('checks orientation live per step, not cached at start', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(false)

      // First step: white perspective
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      const firstQuadrant = getQuadrantAtScreenPosition('top-left', PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(firstQuadrant, settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      // Second step: black perspective (simulating board flip)
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.BLACK)
      const secondQuadrant = getQuadrantAtScreenPosition('top-left', PlayerColor.BLACK)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(secondQuadrant, settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)
      callbacks[0]?.()
      vi.advanceTimersByTime(MEDITATION_WAIT_MS)

      expect(firstQuadrant).toBe(Quadrant.BLACK_QUEEN)
      expect(secondQuadrant).toBe(Quadrant.WHITE_KING)
    })

    it('requests wake lock when supported', () => {
      const loopState = createMeditationLoopState()
      const mockSentinel = { release: vi.fn() } as unknown as WakeLockSentinel

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(true)
      wakeLock.expects('requestWakeLock').withArgs().resolves(mockSentinel)
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)
    })

    it('continues without wake lock when not supported', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(false)
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)

      expect(loopState.wakeLock).toBe(null)
    })

    it('continues meditation if wake lock request fails', async () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(true)
      wakeLock.expects('requestWakeLock').withArgs().rejects(new Error('not supported'))
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)
      await vi.runAllTimersAsync()

      expect(loopState.wakeLock).toBe(null)
    })

    it('stops existing loop before starting a new one', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(false)
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)
      const firstTimeoutId = loopState.timeoutId

      callbacks.length = 0
      expectStopSpeaking()
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      wakeLock.expects('isWakeLockSupported').withArgs().returns(false)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)

      expect(loopState.timeoutId !== firstTimeoutId || loopState.timeoutId === null).toBe(true)
    })
  })

  describe('stopMeditationLoop', () => {
    it('clears timeout and stops speaking', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(false)
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)
      callbacks[0]?.()
      vi.advanceTimersByTime(MEDITATION_WAIT_MS)

      expectStopSpeaking()
      stopMeditationLoop(loopState)

      expect(loopState.timeoutId).toBe(null)
    })

    it('releases wake lock when present', async () => {
      const loopState = createMeditationLoopState()
      const mockSentinel = { release: vi.fn() } as unknown as WakeLockSentinel

      expectStopSpeaking()
      wakeLock.expects('isWakeLockSupported').withArgs().returns(true)
      wakeLock.expects('requestWakeLock').withArgs().resolves(mockSentinel)
      boardReader.expects('getPlayerColor').withArgs().returns(PlayerColor.WHITE)
      speechHandler
        .expects('handleSpeechCommand')
        .withArgs(expect.any(String), settings, match.fn())
        .calls((_command: any, _settings: any, callback: any): any => {
          callbacks.push(callback)
        })

      startMeditationLoop(loopState, settings)
      await vi.runAllTimersAsync()

      speechCore.expects('getSpeechSynthesis').withArgs().returns(mockSynthesis)
      speechCore.expects('cancel').withArgs(mockSynthesis).returns(undefined)
      wakeLock.expects('releaseWakeLock').withArgs(mockSentinel).resolves()

      stopMeditationLoop(loopState)

      expect(loopState.wakeLock).toBe(null)
    })

    it('does nothing to timeout when already null', () => {
      const loopState = createMeditationLoopState()

      expectStopSpeaking()
      stopMeditationLoop(loopState)

      expect(loopState.timeoutId).toBe(null)
    })
  })
})
