import type { ReadonlySignal } from '@preact/signals-core'
import * as core from './core'

let pendingTimeoutId: ReturnType<typeof setTimeout> | undefined
let sequenceCancelled = false

function findVoiceByName(
  synthesis: SpeechSynthesis,
  voiceName: string
): SpeechSynthesisVoice | undefined {
  if (!voiceName) return undefined
  return core.getVoices(synthesis).find((voice) => voice.name === voiceName)
}

export function getAvailableVoiceNames(): string[] {
  const synthesis = core.getSpeechSynthesis()
  return core.getVoices(synthesis).map((voice) => voice.name)
}

export function onVoicesChanged(callback: () => void): void {
  const synthesis = core.getSpeechSynthesis()
  core.onVoicesChanged(synthesis, callback)
}

export function speakText(text: string, rate: number, voiceName = ''): void {
  const synthesis = core.getSpeechSynthesis()
  const UtteranceClass = core.getSpeechSynthesisUtterance()
  const utterance = core.createUtterance(UtteranceClass, text)
  utterance.rate = rate
  const voice = findVoiceByName(synthesis, voiceName)
  if (voice) utterance.voice = voice
  core.speak(synthesis, utterance)
}

export function speakSegments(
  segments: string[],
  rate: number,
  pauseSeconds: ReadonlySignal<number>,
  onFinished?: () => void,
  voiceName = ''
): void {
  sequenceCancelled = false

  const speakNext = (index: number): void => {
    /* v8 ignore next */
    if (sequenceCancelled) return

    if (index >= segments.length) {
      onFinished?.()
      return
    }

    const synthesis = core.getSpeechSynthesis()
    const UtteranceClass = core.getSpeechSynthesisUtterance()
    const utterance = core.createUtterance(UtteranceClass, segments[index])
    utterance.rate = rate
    const voice = findVoiceByName(synthesis, voiceName)
    if (voice) utterance.voice = voice
    utterance.onend = () => {
      if (sequenceCancelled) return
      pendingTimeoutId = setTimeout(() => speakNext(index + 1), pauseSeconds.value * 1000)
    }
    core.speak(synthesis, utterance)
  }

  speakNext(0)
}

export function stopSpeaking(): void {
  sequenceCancelled = true
  if (pendingTimeoutId !== undefined) {
    clearTimeout(pendingTimeoutId)
    pendingTimeoutId = undefined
  }
  const synthesis = core.getSpeechSynthesis()
  core.cancel(synthesis)
}
