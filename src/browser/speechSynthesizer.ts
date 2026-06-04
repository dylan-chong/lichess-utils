import * as speechApi from './speechApi'

let currentRate = 1.0

export function speak(text: string, rate: number): void {
  const synthesis = speechApi.getSpeechSynthesis()
  const UtteranceClass = speechApi.getSpeechSynthesisUtterance()
  const utterance = speechApi.createUtterance(UtteranceClass, text)
  utterance.rate = rate
  speechApi.speak(synthesis, utterance)
}

export function stopSpeaking(): void {
  const synthesis = speechApi.getSpeechSynthesis()
  speechApi.cancel(synthesis)
}

export function setRate(rate: number): void {
  currentRate = rate
}

export function getRate(): number {
  return currentRate
}
