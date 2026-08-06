import type { ReadonlySignal } from '@preact/signals-core'
import * as core from './core'

let pendingTimeoutId: ReturnType<typeof setTimeout> | undefined
let sequenceCancelled = false

export function speakText(text: string, rate: number): void {
  const synthesis = core.getSpeechSynthesis()
  const UtteranceClass = core.getSpeechSynthesisUtterance()
  const utterance = core.createUtterance(UtteranceClass, text)
  utterance.rate = rate
  core.speak(synthesis, utterance)
}

export function speakSegments(
  segments: string[],
  rate: number,
  pauseSeconds: ReadonlySignal<number>,
  onFinished?: () => void
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
