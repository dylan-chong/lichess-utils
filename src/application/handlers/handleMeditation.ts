import { SpeechCommand } from '../../constants/commands'
import { stopSpeaking } from '../../platform/speech'
import type { SettingsStore } from '../settings/settingsStore'
import { handleSpeechCommand } from './handleSpeechCommand'

export const MEDITATION_WAIT_MS = 60_000
export const MEDITATION_TOTAL_MS = 20 * 60_000

export interface MeditationLoopState {
  intervalId: ReturnType<typeof setInterval> | null
  elapsedMs: number
}

export function createMeditationLoopState(): MeditationLoopState {
  return { intervalId: null, elapsedMs: 0 }
}

export function startMeditationLoop(loopState: MeditationLoopState, settings: SettingsStore): void {
  stopMeditationLoop(loopState)

  loopState.elapsedMs = 0
  handleSpeechCommand(SpeechCommand.ALL, settings)

  loopState.intervalId = setInterval(() => {
    loopState.elapsedMs += MEDITATION_WAIT_MS

    if (loopState.elapsedMs >= MEDITATION_TOTAL_MS) {
      settings.meditationEnabled.value = false
      return
    }

    handleSpeechCommand(SpeechCommand.ALL, settings)
  }, MEDITATION_WAIT_MS)
}

export function stopMeditationLoop(loopState: MeditationLoopState): void {
  if (loopState.intervalId !== null) {
    clearInterval(loopState.intervalId)
    loopState.intervalId = null
  }
  stopSpeaking()
}
