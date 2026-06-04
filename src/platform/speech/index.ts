import * as core from './core'

export function speakText(text: string, rate: number): void {
  const synthesis = core.getSpeechSynthesis()
  const UtteranceClass = core.getSpeechSynthesisUtterance()
  const utterance = core.createUtterance(UtteranceClass, text)
  utterance.rate = rate
  core.speak(synthesis, utterance)
}

export function stopSpeaking(): void {
  const synthesis = core.getSpeechSynthesis()
  core.cancel(synthesis)
}
