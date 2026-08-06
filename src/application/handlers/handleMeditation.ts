import { SpeechCommand } from '../../constants/commands'
import { stopSpeaking } from '../../platform/speech'
import type { SettingsStore } from '../settings/settingsStore'
import { handleSpeechCommand } from './handleSpeechCommand'

export const MEDITATION_WAIT_MS = 60_000
export const MEDITATION_TOTAL_MS = 20 * 60_000

export interface MeditationLoopState {
  timeoutId: ReturnType<typeof setTimeout> | null
  elapsedMs: number
}

export function createMeditationLoopState(): MeditationLoopState {
  return { timeoutId: null, elapsedMs: 0 }
}

export function startMeditationLoop(loopState: MeditationLoopState, settings: SettingsStore): void {
  stopMeditationLoop(loopState)

  loopState.elapsedMs = 0

  const handleFinished = (): void => {
    loopState.elapsedMs += MEDITATION_WAIT_MS

    if (loopState.elapsedMs >= MEDITATION_TOTAL_MS) {
      settings.meditationEnabled.value = false
      return
    }

    loopState.timeoutId = setTimeout(() => {
      handleSpeechCommand(SpeechCommand.ALL, settings, handleFinished)
    }, MEDITATION_WAIT_MS)
  }

  handleSpeechCommand(SpeechCommand.ALL, settings, handleFinished)
}

export function stopMeditationLoop(loopState: MeditationLoopState): void {
  if (loopState.timeoutId !== null) {
    clearTimeout(loopState.timeoutId)
    loopState.timeoutId = null
  }
  stopSpeaking()
}
