export function getSpeechSynthesis(): SpeechSynthesis {
  return window.speechSynthesis
}

export function getSpeechSynthesisUtterance(): typeof SpeechSynthesisUtterance {
  return SpeechSynthesisUtterance
}

export function speak(synthesis: SpeechSynthesis, utterance: SpeechSynthesisUtterance): void {
  synthesis.speak(utterance)
}

export function cancel(synthesis: SpeechSynthesis): void {
  synthesis.cancel()
}

export function createUtterance(
  UtteranceClass: typeof SpeechSynthesisUtterance,
  text: string
): SpeechSynthesisUtterance {
  return new UtteranceClass(text)
}

// Higher-level speech functions (merged from adapters-speech/speechSynthesizer)
export function speakText(text: string, rate: number): void {
  const synthesis = getSpeechSynthesis()
  const UtteranceClass = getSpeechSynthesisUtterance()
  const utterance = createUtterance(UtteranceClass, text)
  utterance.rate = rate
  speak(synthesis, utterance)
}

export function stopSpeaking(): void {
  const synthesis = getSpeechSynthesis()
  cancel(synthesis)
}
