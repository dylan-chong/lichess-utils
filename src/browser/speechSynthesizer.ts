let currentRate = 1.0

export function speak(text: string, rate: number): void {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  window.speechSynthesis.cancel()
}

export function setRate(rate: number): void {
  currentRate = rate
}

export function getRate(): number {
  return currentRate
}
