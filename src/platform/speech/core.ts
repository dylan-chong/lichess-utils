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

export function getVoices(synthesis: SpeechSynthesis): SpeechSynthesisVoice[] {
  return synthesis.getVoices()
}

export function onVoicesChanged(synthesis: SpeechSynthesis, callback: () => void): void {
  synthesis.addEventListener('voiceschanged', callback)
}

export function createUtterance(
  UtteranceClass: typeof SpeechSynthesisUtterance,
  text: string
): SpeechSynthesisUtterance {
  return new UtteranceClass(text)
}
