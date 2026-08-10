import { SpeechCommand } from '../../constants/commands'
import type { ScreenPosition } from '../../domain/chess/quadrantLayout'
import { getQuadrantAtScreenPosition } from '../../domain/chess/quadrantLayout'
import { stopSpeaking } from '../../platform/speech'
import { isWakeLockSupported, releaseWakeLock, requestWakeLock } from '../../platform/wakeLock'
import { getPlayerColor } from '../services/boardReader/reader'
import type { SettingsStore } from '../settings/settingsStore'
import { handleSpeechCommand } from './handleSpeechCommand'

export const MEDITATION_WAIT_MS = 60_000
export const MEDITATION_TOTAL_MS = 20 * 60_000

const INTRO_STEPS: ScreenPosition[] = [
  // TODO after the tests have been completed and passing - there are enums for these positions
  'top-left',
  'top-left',
  'top-right',
  'top-right',
  'bottom-left',
  'bottom-left',
  'bottom-right',
  'bottom-right',
]

export interface MeditationLoopState {
  timeoutId: ReturnType<typeof setTimeout> | null
  elapsedMs: number
  stepIndex: number
  wakeLock: WakeLockSentinel | null
}

export function createMeditationLoopState(): MeditationLoopState {
  return { timeoutId: null, elapsedMs: 0, stepIndex: 0, wakeLock: null }
}

export function startMeditationLoop(loopState: MeditationLoopState, settings: SettingsStore): void {
  stopMeditationLoop(loopState)

  loopState.elapsedMs = 0
  loopState.stepIndex = 0

  if (isWakeLockSupported()) {
    requestWakeLock()
      .then((lock) => {
        loopState.wakeLock = lock
      })
      .catch(() => {
        loopState.wakeLock = null
      })
  }

  const runStep = (): void => {
    const onFinished = (): void => {
      loopState.elapsedMs += MEDITATION_WAIT_MS

      if (loopState.elapsedMs >= MEDITATION_TOTAL_MS) {
        settings.meditationEnabled.value = false
        return
      }

      loopState.stepIndex += 1

      loopState.timeoutId = setTimeout(() => {
        runStep()
      }, MEDITATION_WAIT_MS)
    }

    if (loopState.stepIndex < INTRO_STEPS.length) {
      const position = INTRO_STEPS[loopState.stepIndex]
      const quadrant = getQuadrantAtScreenPosition(position, getPlayerColor())
      handleSpeechCommand(quadrant, settings, onFinished)
    } else {
      handleSpeechCommand(SpeechCommand.ALL, settings, onFinished)
    }
  }

  runStep()
}

export function stopMeditationLoop(loopState: MeditationLoopState): void {
  if (loopState.timeoutId !== null) {
    clearTimeout(loopState.timeoutId)
    loopState.timeoutId = null
  }
  stopSpeaking()
  if (loopState.wakeLock) {
    releaseWakeLock(loopState.wakeLock).catch(() => {
      // Ignore errors when releasing wake lock
    })
    loopState.wakeLock = null
  }
}
